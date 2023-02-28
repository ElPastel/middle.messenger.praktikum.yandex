import Block, { T } from "./block";
import Layout from "../pages/layout/layout";
import renderElement from "../utils/renderElement";

function isEqual(lhs: string, rhs: string): boolean {
    return lhs === rhs;
}

type RouteProps = {
    rootQuery: string
}

export default class Route {
    private _pathname: string;
    private _blockClass: typeof Layout;
    private _block: Block<T> | null;
    private _props: RouteProps;
    public blockProps: T;

    constructor(pathname: string, view: typeof Layout, blockProps: T, props: RouteProps) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
        this.blockProps = blockProps;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass({...this.blockProps});
            if (this._block) renderElement(this._props.rootQuery, this._block);
            return;
        }
        this._block.show();
    }
}
