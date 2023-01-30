import { v4 as makeUUID } from 'uuid';
import EventBus from './event-bus';
import Templator from 'pug';


export default abstract class Block<Props extends object> {
	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render',
	};

	private _element: HTMLElement;
	private _meta: { tagName: string, props: Record<string, any> };
	private _id: string = makeUUID();
	protected class: string;
	protected eventBus: () => EventBus;
	protected props: Record<string, any>;
	protected children: Record<string, Block<Props>>;

	constructor(tagName = 'div', propsAndChildren: Props) {
		const eventBus: any = new EventBus();
		const { children, props } = this._getChildren(propsAndChildren);
		if (props.class) this.class = props.class;

		this.props = this._makePropsProxy({
			...props,
			_id: this._id,
			class: this.class,
		});
		this.children = children;

		this._meta = {
			tagName,
			props,
		};

		this.eventBus = () => eventBus;

		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	private _registerEvents(eventBus: EventBus): void {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	private _createResources(): void {
		const { tagName } = this._meta;
		this._element = this._createDocumentElement(tagName);
	}

	protected init(): void {
		this._createResources();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	private _componentDidMount(): void {
		this.componentDidMount();

		Object.values(this.children).forEach(child => {
			child.dispatchComponentDidMount();
		});
	}

	protected componentDidMount(oldProps?: object): void {
		// Will be updated later
	}

	protected dispatchComponentDidMount(): void {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	private _componentDidUpdate(oldProps: Props, newProps: Props): void {
		const response = this.componentDidUpdate(oldProps, newProps);
		if (!response) {
			return;
		}
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	protected componentDidUpdate(oldProps: Props, newProps: Props): boolean {
		return true;
	}

	public setProps = (nextProps: Props): void => {
		if (!nextProps) {
			return;
		}

		const { children, props } = this._getChildren(nextProps);

		if (Object.values(children).length) {
			Object.assign(this.children, children);
		}

		if (Object.values(props).length) {
			Object.assign(this.props, props);
		}
	};

	public get element(): HTMLElement {
		return this._element;
	}

	private _render(): void {
		const block = this.render();
		if (block) {
			const child = block.firstElementChild as HTMLElement;
			if (child) {
				this._removeEvents();
				this._element.innerHTML = '';
				this._element.appendChild(block)
			} 
		}
		this._addEvents();
	}

	abstract render(): DocumentFragment; 

	public getContent(): HTMLElement {
		return this.element;
	}

	private _makePropsProxy<Props extends object>(props: Props): Props {
		return new Proxy(props, {
			get(target: any, prop: string) {
				const value = target[prop];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set(target: any, prop: string, value: any) {
				target[prop] = value;
				this.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
				return true;
			},
			deleteProperty() {
				throw new Error('Нет доступа');
			},
		});
	}

	private _createDocumentElement(tagName: string): HTMLElement {
		const element = document.createElement(tagName);
		// Add class
		if (Array.isArray(this.class)) {
			this.class.forEach((cl) => element.classList.add(cl));
		} else {
			element.classList.add(this.class);
		}
		// Add id
		element.setAttribute('data-id', this._id);
		// Add attributes
		Object.entries(this.props)
			.filter(([key]) => key.includes('Attr'))
			.forEach(([key, value]) => {
				const attr = key.slice(0, -4);
				element.setAttribute(attr, value as string)
			})
		return element;
	}

	private _getChildren(propsAndChildren: Props): { props: Record<string, any>, children: Record<string, Block<Props>> } {
		const children: { [key: string]: Block<Props> } = {};
		const props: Record<string, any> = {};

		Object.entries(propsAndChildren).forEach(([key, value]) => {
			if (value instanceof Block) {
				children[key] = value;
			} else {
				props[key] = value;
			}
		});

		return { children, props };
	}

	private _addEvents(): void {
		const events: { [event: string]: () => void } = (this.props as any).events;
		if (!events) {
			return;
		}

		Object.entries(events).forEach(([event, listener]) => {
			this._element.addEventListener(event, listener);
		});
	}

	private _removeEvents(): void {
		const events: { [event: string]: () => void } = (this.props as any).events;
		if (!events || !this._element) {
			return;
		}

		Object.entries(events).forEach(([event, listener]) => {
			this._element.removeEventListener(event, listener);
		});
	}

	public compile(template: string, props: Record<string, any>): DocumentFragment {
		const propsAndStubs = { ...props };

		Object.entries(this.children).forEach(([key, child]) => {
			propsAndStubs[key] = `<div data-id="${child._id}"></div>`
		});

		const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
		fragment.innerHTML = Templator.render(template, propsAndStubs);	

		Object.values(this.children).forEach(child => {
			const stub = fragment.content.querySelector(`[data-id="${child._id}"]`) as HTMLElement;
			if (stub) {
				stub.replaceWith(child.getContent());
			}
		});
		return fragment.content;
	}

	public show(): void {
		this.getContent().style.display = 'block';
	}

	public hide(): void {
		this.getContent().style.display = 'none';
	}
}
