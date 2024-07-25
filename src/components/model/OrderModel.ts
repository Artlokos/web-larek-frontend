import { IEvents } from "../base/events";
import { ICustomer, IOrder, IProductItem} from "../../types";
import { IOrderData } from "../../types";

class OrderModel implements IOrderData {

    constructor(protected events: IEvents) {}

    orderItems: IProductItem []
    customer: ICustomer

    getProductItem(id:string):IProductItem
        
    addProductItem(productItem:IProductItem):void { 
        if(!this.orderItems.find((item) => {
            const title = item.title
        })) 
        
        this._changed();
    }
    removeProductItem(id: string): void {
        if (!this.items.has(id)) return;
        if(this.items.get(id)!>0) {
            this.items.set(id,this.items.get(id)!-1);
            if(this.items.get(id) === 0) this.items.delete(id);
        }
        this._changed();
    }
    protected _changed(){
        this.events.emit('order:changed');
    }

    set payment(a:string) {
        this.customer.payment = a
        this.events.emit('order:changed')
    }

    set address(a:string) {
        this.customer.address = a
        this.events.emit('order:changed')
    }
    
    set email(a:string) {
        this.customer.email = a
        this.events.emit('order:changed')
    }

    set telephone(a:string) {
        this.customer.telephone=a
        this.events.emit('order:changed')
    }

    get customerInfo() {
        return this.customer
    }
    // getOrder(): IOrder {
    //     return {this.customer, this.orderItems}
    // }

}