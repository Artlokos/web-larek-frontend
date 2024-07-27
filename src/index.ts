// import { Api } from './components/base/api';
import { AppApi } from './components/AppApi';
import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { Customer } from './components/model/CustomerData';
import { OrderModel } from './components/model/OrderModelData';
import { ProductItemList } from './components/model/ProductItemsData';
import './scss/styles.scss';
import { IApi } from './types';
import { API_URL } from './utils/constants';

const events = new EventEmitter();

const testproductItemList = new ProductItemList(events)

const testCardList = [
    {
        "id": "1",
        "title": "table",
        "description": "wooden table",
        "image": "https://links-stroy.ru/wp-content/uploads/2018/12/derevyannyj-kuhonnyj-stol-13.jpg",
        "category": "furniture",
        "price": 20000

    },
    
    {
        "id": "2",
        "title": "chair",
        "description": "soft chair",
        "image": "https://links-stroy.ru/wp-content/uploads/2018/12/derevyannyj-kuhonnyj-stol-13.jpg",
        "category": "furniture",
        "price": 10000
    }
]

// testproductItemList.productItemList = testCardList

// console.log(testproductItemList.getProductItem("1"))



// const testCustomer = new Customer("1@1.1","+7","Street","cash")
// console.log(testCustomer)

const baseApi: IApi = new Api(API_URL)
const api = new AppApi(baseApi)

Promise.all([api.getProductItemList()])
    .then(([items]) => {
        testproductItemList.productItemList = items
        console.log(testproductItemList)
        console.log(testproductItemList.productItemList)
        // console.log(testproductItemList.getProductItem("854cef69-976d-4c2a-a18c-2aa45046c390"))
    })
    .catch((err) =>{
        console.log(err)
    })

// console.log(testproductItemList.getProductItem("854cef69-976d-4c2a-a18c-2aa45046c390"))

























































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