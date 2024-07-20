// Карточка товара
export interface IProductItem {
    // Свойства
    _id: string; // = уникальный идентефикатор товара 
    title: string; // - Название товара
    description: string // - Описание товара
    image: string; // - Ссылка на изображение товара
    category: string // - Категория товара
    price: number //- Цена товара
    _inOrder:boolean // - Состояние добавлен/исключен из корзины
    // Методы   
}

// Заказ, корзина
export interface IOrder extends ICustomer {
    // Свойства
    _id: string; // - уникальный идентефикатор заказа
    customer: ICustomer;  // - данные пользователя
    totalPrice: number; // - общая сумма заказа
    items: IProductItem[]; // - массив выбранных товаров
    //Методы

}

// Данные о покупателе
export interface ICustomer {
    email: string; // - электронная почта покупателя
    phone: string; // - телефон покупателя
    address: string; // - адрес доставки покупателя
    payment:string; // - способ  оплаты

    checkValidation(data: Record<keyof TOrderCustomer, string>): boolean // - проверяет объект с данными покупателя на валидность
}

// Интерфейс для модели карточек 

export interface IProductItemsData {
    productItem: IProductItem[];

}

export interface IOrderData {
    orderItems: IProductItem[]
    customer: ICustomer

    addProductItem(productItem:IProductItem): void
    removeProductItem(productItemId:string, payload: Function | null): void
    countTotalPrice(chosenProductItems:IProductItem[]) : number
    orderToDone():void
    setCustomerData(customer:ICustomer):void
}

// Данные для создания новой карточки товара
export type TProductItemInfo = Pick<IProductItem,'title' | 'description' | 'image' | 'category' | 'price'>;

// Данные для создания заказа из корзины
export type TOrderMain = Pick<IOrder, 'items'>;

// Данные электронной почты, телефона покупателя, способа оплаты и адреса доставки
export type TOrderCustomer = Pick<ICustomer, 'email' | 'phone' | 'payment' | 'address'>;