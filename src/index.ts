import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { ProductItemModel } from './components/model/ProductItemModel';
import './scss/styles.scss';

const events = new EventEmitter();

const productItemList = new ProductItemModel(events)

const testCardList = [
    
]
















































// interface IEventEmitter {
//     emit:( event: string, data: unknown) => void;
// }

// const events = new EventEmitter();
// const basket = new BasketModel(events);

// events.on('basket:change', (data: {items:string[]}) => {
// });

// interface IProductItem {
//     id: string;
//     title: string;
// }

// interface IProductItemListModel {
//     items:IProductItem[];
//     setItems(items:IProductItem[]): void;
//     getProduct(id:string):IProductItem;
// }

// interface IViewConstructor {
//     new (container: HTMLElement, events?: IEventEmitter) : IViewConstructor;
// }

// interface IView{
//     render(data?: object):HTMLElement;
// }

// class BasketItemView implements IView {
//     protected title: HTMLSpanElement;
//     protected addButton: HTMLButtonElement;
//     protected removeButton: HTMLButtonElement;

//     protected id: string|null = null;

//     constructor(protected container: HTMLElement, protected events: IEventEmitter){
//         this.title = container.querySelector('.basket-item__title') as HTMLSpanElement;
//         this.addButton = container.querySelector('.basket-item__add') as HTMLButtonElement;
//         this.removeButton = container.querySelector('.basket-item__remove') as HTMLButtonElement;

//         this.addButton.addEventListener('click', () =>{
//             this.events.emit('ui:basket-add', {id:this.id});
//         });

//         this.removeButton.addEventListener('click',() => {
//             this.events.emit('ui:basket-remove',{id:this.id});
//         });
//     }

//     render(data: {id:string, title:string} ) {
//         if (data) {
//             this.id = data.id;
//             this.title.textContent = data.title;
//         }
//         return this.container;
//     }
// }

// class BasketView implements IView {
//     constructor(protected container: HTMLElement) {}
//     render(data: {items:HTMLElement[]}) {
//         if (data) {
//             this.container.replaceChildren(...data.items);
//         }
//         return this.container;
//     }
// }

// const api = new Api();
// const basketView = new BasketView(document.querySelector('.basket'));
// const basketModel = new BasketModel(events);


// events.on('ui:basket-add', (event:{id:string}) => {
//     basketModel.add(event.id);
// });

// events.on('ui:basket-remove',(event:{id:string}) => {
//     basketModel.remove(event.id);
// });