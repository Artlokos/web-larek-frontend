import { ApiPostMethods } from './../components/base/api';

//Интерфейс списка товаров
export interface IProductItemsData {
    productItems: IProductItem[];
}

// Карточка товара
export interface IProductItem {
    // Свойства
    title: string; // - Название товара
    description: string // - Описание товара
    image: string; // - Ссылка на изображение товара
    category: string // - Категория товара
    price: number //- Цена товара
}

// Заказ, корзина
export interface IOrder {
    customer: ICustomer  // - данные пользователя
    orderItems: IProductItem[] // - список выбранных товаров
}

// Интерфейс для модели карточек 
export interface IOrderData {
    orderItems: IProductItem[]
    customer: ICustomer

    addProductItem(productItem:IProductItem): void
    removeProductItem(productItemId:string, payload: null): void
    // getOrder():IOrder
    // setCustomerData(customer:ICustomer):void
}

// Данные о покупателе
export interface ICustomer {
    email: string; // - электронная почта покупателя
    telephone: string; // - телефон покупателя
    address: string; // - адрес доставки покупателя
    payment:string; // - способ  оплаты

    checkValidation(data: Record<keyof TOrderCustomer, string>): boolean // - проверяет объект с данными покупателя на валидность
}

// Данные для создания новой карточки товара
export type TProductItemInfo = Pick<IProductItem,'title' | 'description' | 'image' | 'category' | 'price'>;

// Данные для создания заказа из корзины
export type TOrderMain = Pick<IOrder, 'items'>;

// Данные электронной почты, телефона покупателя, способа оплаты и адреса доставки
export type TOrderCustomer = Pick<ICustomer, 'email' | 'telephone' | 'payment' | 'address'>;

//Тип объекта для запроса к серверу 
export interface IApi {
    baseUrl: string
    get<T>(uri:string): Promise<T>
    post<T>(uri:string, data:object, method?: ApiPostMethods): Promise<T>
}