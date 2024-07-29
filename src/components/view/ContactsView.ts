import { IEvents } from '../base/events'; 
import { Form } from './FormView';  

export interface IContacts {
    telephone: string
    email: string
}

/*
  * Класс, описывающий окошко контакты
  * */
export class Contacts extends Form<IContacts> {
  // Конструктор принимает родительский элемент и обработчик событий
  constructor(
    container: HTMLFormElement,
    events: IEvents
  ) {
    super(container, events);
  }
}
