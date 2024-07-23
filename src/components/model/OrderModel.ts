import { ICustomer, IOrder, IProductItem } from "../../types";

export class Order implements IOrder {
    id: string;
    customer: ICustomer;
    totalPrice: number;
    items: IProductItem[];

    constructor () {
        
    }
}