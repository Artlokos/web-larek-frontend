// import { IProductItem, IProductItemListData } from "../../types";
// import { IEvents } from "../base/events";

// export class ProductItemList implements IProductItemListData{
//     protected _productItems: IProductItem[]
//     protected events: IEvents

//     constructor(events:IEvents) {
//         this.events = events
//     }

//     getProductItem(productItemId: string): IProductItem {
//         return this._productItems.find((item) => item.id == productItemId)
//     }

//     set productItemList(productItems:IProductItem[]) {
//         this._productItems = productItems
//         this.events.emit('cards:changed')
//     }

//     // get productItemList() {
//     //     return this._productItems
//     // }

// }





















































// import { IProductItemList } from "../../types";
// import { IProductItem } from "../../types";
// import { IEvents } from "../base/events";
// export class ProductItemModel implements IProductItem{
//     _id: string;
//     _title: string;
//     _description: string;
//     _image: string;
//     _category: string;
//     _price: number;
//     _inOrder: boolean

//     constructor (protected events:IEvents){}
 
//     get productItem():IProductItem {return this.productItem}

//     get id():string {return this._id}

//     get title():string {return this._title}
    
//     get description():string  {return this._description}

//     get image():string {return this._image}
    
//     get category():string {return this._category}

//     get price():number {return this._price}

//     get inOrder():boolean {return this._inOrder}

//     set titleData(a: string) {
//         this._title = a
//         this.events.emit('cards:changed')
//     }

//     set descriptionData(a:string){
//         this._description = a
//         this.events.emit('cards:changed')
//     }

//     set imageData(a:string){
//         this._image = a
//         this.events.emit('cards:changed')
//     }

//     set categoryData(a:string){
//         this._category = a
//         this.events.emit('cards:changed')
//     }

//     set priceData(a:number){
//         this._price = a
//         this.events.emit('cards:changed')
//     }

//     // set productItemList(productItemList: IProductItem[]) {

//     // }
// }

// export class productItemList implements IProductItemList {
//     protected _productItems: IProductItem[];

//     constructor (protected events:IEvents){}

//     set productItems(productItems: IProductItem[]){
//         this._productItems = productItems;
//     }
// }