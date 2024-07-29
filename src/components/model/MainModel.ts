//- Общая модель для всех классов

import { IEvents } from "../base/events";

export abstract class MainModel<T> {
  constructor(data: Partial<T>, protected events: IEvents) {
    Object.assign(this, data);
  }

  emitChanges(event: string, payload?: object) {
    this.events.emit(event, payload ?? {});
  }
}
