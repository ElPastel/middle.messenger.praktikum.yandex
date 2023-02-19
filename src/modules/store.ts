import Block, { T } from "./block";
import EventBus from "./event-bus";
import { isEqual, set } from "../utils/helpers";

export enum StoreEvents {
  Updated = 'updated'
}

export class Store extends EventBus {
  private state: any = {};

  public set(keypath: string, value: unknown) {
    set(this.state, keypath, value); 
    this.emit(StoreEvents.Updated);
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

export function withStore(mapStateToProps: (state: any) => any) {

  return function wrap(Component: typeof Block) {

    return class WithStore extends Component<T> {

      constructor(props: any) {
        let previousState = mapStateToProps(store.getState());
        
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
