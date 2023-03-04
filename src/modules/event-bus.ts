// class EventBus {
//   listeners: { [key: string]: Array<() => void> };

//   constructor() {
//     this.listeners = {};
//   }

//   on(event: string, callback: () => void): void {
//     if (!this.listeners[event]) {
//       this.listeners[event] = [];
//     }
//     this.listeners[event]?.push(callback);
//   }

//   off(event: string, callback: () => void): void {
//     if (!this.listeners[event]) {
//       throw new Error(`Нет события: ${event}`);
//     }
//     this.listeners[event] = this.listeners[event].filter(
//       (listener) => listener !== callback,
//     );
//   }

//   emit(event: string, ...args: Record<string, any[]>[]): void {       
//     if (!this.listeners[event]) {
//       return;
//     }
//     this.listeners[event]!.forEach((listener): void => {
//       listener(...args);
//     });
//   }
// }

type Handler<A extends any[] = unknown[]> = (...args: A) => void;
type MapInterface<P> = P[keyof P]

class EventBus<
  E extends Record<string, string> = Record<string, string>,
  Args extends Record<MapInterface<E>, any[]> = Record<string, any[]>
> {
  private readonly listeners: {
    [K in MapInterface<E>]?: Handler<Args[K]>[]
  } = {};

  on<Event extends MapInterface<E>>(event: Event, callback: Handler<Args[Event]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }


    this.listeners[event]?.push(callback);
  }

  off<Event extends MapInterface<E>>(event: Event, callback: Handler<Args[Event]>) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event]!.filter(
      listener => listener !== callback
    );
  }

  emit<Event extends MapInterface<E>>(event: Event, ...args: Args[Event]) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event]!.forEach(listener => {
      listener(...args);
    });
  }
}

export default EventBus;
