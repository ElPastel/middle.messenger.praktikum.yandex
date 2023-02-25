import { v4 as makeUUID } from 'uuid';
import EventBus from './event-bus';
import { isEqual } from '../utils/helpers';

type V = string | number | Record<string, (e: Event) => void> | Block<T>;
export type T = Record<string, V>;
type Children = Record<string, Block<T>>;

export default abstract class Block<Props extends T> {
	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render',
	} as const;

	private _element: HTMLElement;
	private _meta: { tagName: string, props: Props };


	private _id: string = makeUUID();
	protected eventBus: () => EventBus;
	protected props: Props;
	protected children: Children;

	constructor(propsAndChildren: Props, tagName = 'div') {
		const eventBus = new EventBus();
		// debugger
		const { children, props } = this._getChildren(propsAndChildren);
		this.props = this._makePropsProxy({
			...props,
			_id: this._id
		}) as Props;

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
		eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	private _createResources(): void {
		const { tagName } = this._meta;
		this._element = this._createDocumentElement(tagName);
	}

	private _init(): void {
		this.init();
		this._createResources();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
		this.dispatchComponentDidMount();
	}

	protected init(): void { }

	private _componentDidMount(): void {
		this.componentDidMount();

		// Object.values(this.children).forEach(child => {
		// 	if (Array.isArray(child)) {
		// 		child.forEach(ch => ch.dispatchComponentDidMount());
		// 	} else {
		// 		child.dispatchComponentDidMount();
		// }
		// });
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
		// return isEqual(oldProps, newProps);
		// debugger
		return true;
	}

	public setProps = (nextProps: Props): void => {
		// debugger
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

		const element = this.element;
		// Add attributes
		Object.entries(this.props)
			.filter(([key]) => key.includes('Attr'))
			.forEach(([key, value]) => {
				const attr = key.slice(0, -4);
				element.setAttribute(attr, value as string)
			})
	};

	public get element(): HTMLElement {
		return this._element;
	}

	private _render(): void {
		const block = this.render();
		if (block) {
			if (typeof block === 'string') return;
			const child = block.firstElementChild as HTMLElement;
			if (child) {
				this._removeEvents();
				// debugger
				this._element.innerHTML = '';
				this._element.appendChild(block);
			}
		}
		this._addEvents();
	}

	abstract render(): DocumentFragment | string;

	public getContent(): HTMLElement {
		return this.element;
	}

	public getUser(): V {
		return this.props.user;
	}

	private _makePropsProxy<Props extends T>(props: Props): Props {
		return new Proxy(props, {
			get(target: any, prop: string) {
				const value = target[prop];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set: (target: T, prop: string, value: any) => {
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

	private _getChildren(propsAndChildren: Props): { props: Props, children: Children } {
		const children: Children = {};
		const props = {} as T;

		Object.entries(propsAndChildren).forEach(([key, value]) => {
			if (value instanceof Block) {
				children[key] = value;
			} else {
				props[key] = value;
			}
		});

		return { children, props: (props as Props) };
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

	public compile(template: (props: any) => string, props: Record<string, any>): DocumentFragment {
		// debugger
		const propsAndStubs = { ...props };

		Object.entries(this.children).forEach(([key, child]) => {
			if (Array.isArray(child)) {
				// debugger
				propsAndStubs[key] = child.map((item) => `<div data-id="${item._id}"></div>`);
			} else {
				propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
			}
		});

		const html = template(propsAndStubs);
		const fragment = document.createElement('template');
		fragment.innerHTML = html;

		const replaceStub = (child: Block<T>) => {
			// debugger
			const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
			if (!stub) {
				return;
			}

			child.getContent()?.append(...Array.from(stub.childNodes));
			stub.replaceWith(child.getContent());
		}

		Object.values(this.children).forEach((child) => {
			if (Array.isArray(child)) {
				child.forEach(replaceStub);
			} else {
				replaceStub(child)
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
