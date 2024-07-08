export interface IProductItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
    responseName: string;
    error: string;
}

export interface Order {
    id: string;
    payment:string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: IProductItem[];
    responseName: string;
    error: string;
}

export interface Customer {
    email: string;
    phone: string;
}

export interface OrderResult extends Customer{
    id:string;
}

export interface IProductListAPI {
    getProductItemList: ()=>Promise<IProductItem[]>;
    orderFromBasket: (order: Order) => Promise<OrderResult[]>;
}