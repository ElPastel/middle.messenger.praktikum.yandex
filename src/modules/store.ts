import EventBus from "./event-bus";
import { isEqual, set } from "../utils/helpers";
import { T } from "./block";

export enum StoreEvents {
  Updated = 'updated'
}

export class Store extends EventBus {
  private state: any = {};

  public set(keypath: string, value: unknown) {
    set(this.state, keypath, value);
    this.emit(StoreEvents.Updated);
  }

  public clear() {
    Object.keys(this.state).forEach((key) => {
      this.set(key, null);
    });
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

export type ConstractAble = { new(...args: any[]): any };

export function withStore(mapStateToProps: (state: Record<string, any>) => Record<string, any>) {

  return function wrap(Component: ConstractAble) {

    return class WithStore extends Component {

      constructor(props: T) {

        const previousState = mapStateToProps(store.getState());

        super({ ...props, ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());

          if (isEqual(previousState, stateProps)) return;

          this.setProps({ ...stateProps });
        });
      }
    }

  }

}
export default store;
