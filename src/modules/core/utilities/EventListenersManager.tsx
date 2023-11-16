type Listeners<T> = {
  [P in keyof T]?: ((...params: T[P] extends [] ? T[P] : any[]) => void)[];
};

type Listener<E> = (...param: E extends [] ? E : any[]) => void;

class EventListenersManager<ListEvents extends { [key: string]: any[] }> {
  private listeners: Listeners<ListEvents>;

  constructor() {
    this.listeners = {} as Listeners<ListEvents>;
  }

  trigger<K extends keyof ListEvents>(event: K, ...params: ListEvents[K]) {
    this.listeners[event]?.map((listener) => listener(...params));
  }

  on<K extends keyof ListEvents>(event: K, listener: Listener<ListEvents[K]>) {
    if (this.listeners[event]) {
      this.listeners[event]?.push(listener);
    } else {
      this.listeners[event] = [listener];
    }

    return () => {
      this.off(event, listener);
    };
  }

  off<K extends keyof ListEvents>(event: K, listener: Listener<ListEvents[K]>) {
    if (this.listeners[event]) {
      const index = this.listeners[event]?.findIndex((ltn) => ltn === listener);
      if (index && index > -1) {
        this.listeners[event]?.splice(index, 1);
      }
    } else {
      throw new Error(`${this} is doesn't have event "${String(event)}"`);
    }
  }
}

export default EventListenersManager;
