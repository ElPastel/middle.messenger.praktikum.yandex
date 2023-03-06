import Block, { T } from "./block/block";
import renderElement from "../utils/renderElement";
import LoginPage from "../pages/loginPage/loginPage";
import RegPage from "../pages/registrationPage/registrationPage";
import ErrorPage404 from "../pages/errorPage404/errorPage404";
import ErrorPage500 from "../pages/errorPage500/errorPage500";

type ConstractAble = { new(...args: any[]): any };
export type BlockTypes = typeof LoginPage | typeof RegPage | typeof ErrorPage404 | typeof ErrorPage500 | ConstractAble
type RouteProps = {
    rootQuery: string
}

function isEqual(lhs: string, rhs: string): boolean {
    return lhs === rhs;
}

export default class Route {
    private _pathname: string;
    private _blockClass: BlockTypes | ConstractAble;
    private _block: Block<T> | null;
    private _props: RouteProps;
    public blockProps: T;

    constructor(pathname: string, view: BlockTypes, blockProps: T, props: RouteProps) {
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
            this._block = new this._blockClass(this._props);
            console.log(this._props.rootQuery);            
            if (this._block) renderElement(this._props.rootQuery, this._block);
            return;
        }
        this._block.show();
    }
}
