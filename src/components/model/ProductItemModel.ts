import { IProductItem } from "../../types";
import { IEvents } from "../base/events";
export class ProductItemModel implements IProductItem{
    _title: string;
    _description: string;
    _image: string;
    _category: string;
    _price: number;
    _inOrder: boolean

    constructor (protected events:IEvents){}
 
    get productItem():IProductItem {return this.productItem}

    get title():string {return this._title}
    
    get description():string  {return this._description}

    get image():string {return this._image}
    
    get category():string {return this._category}

    get price():number {return this._price}

    get inOrder():boolean {return this._inOrder}

    set titleData(a: string) {
        this._title = a
        this.events.emit('cards:changed')
    }

    set descriptionData(a:string){
        this._description = a
        this.events.emit('cards:changed')
    }

    set imageData(a:string){
        this._image = a
        this.events.emit('cards:changed')
    }

    set categoryData(a:string){
        this._category = a
        this.events.emit('cards:changed')
    }

    set priceData(a:number){
        this._price = a
        this.events.emit('cards:changed')
    }
}