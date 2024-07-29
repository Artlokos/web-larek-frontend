// import { productItemList } from './../components/model/ProductItemsData';
import { ApiPostMethods } from './../components/base/api';
import { ProductItem } from '../components/model/AppModel';

//Интерфейс списка товаров
export interface IProductItemListData {
    productItemList: IProductItem[]; // - список карточек с сервера
    getProductItem(id:string):IProductItem // - получение данных карточки товара по id
}
// Карточка товара
export interface IProductItem {
    // Свойства
    id:string // - идентефикатор товара
    title: string; // - Название товара
    description: string // - Описание товара
    image: string; // - Ссылка на изображение товара
    category: string // - Категория товара
    price: number // - Цена товара
    // items: IProductItem[]
    chosen:boolean // - статус товара (в заказе или нет)
}

// Заказ, корзина
export interface IOrder {
    items: string[]; // - массив выбранных товаров
    email: string; // - электронная почта покупателя
    telephone: string; // - телефон покупателя
    address: string; // - адрес доставки покупателя
    payment:string; // - способ  оплаты
}

// Интерфейс для модели карточек 
export interface IOrderData {
    orderItems: IProductItem[]
    customer: ICustomer

    addProductItem(productItem:IProductItem): void
    removeProductItem(productItemId:string, payload: null): void
}

export interface IOrderForm {
    payment: string;
    address: string;
    email: string;
    telephone: string;
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

// Данные для проверки полей формы
export type FormErrors = Partial<Record<keyof IOrderForm, string>>;

// Тип для отправки заказа на сервер
export type OrderResponse<Type> = {
    total: number;
    items: Type[];
  };
//Тип объекта для запроса к серверу 
export interface IApi {
    baseUrl: string
    get<T>(uri:string): Promise<T>
    post<T>(uri:string, data:object, method?: ApiPostMethods): Promise<T>
}

export interface IAppModel {
    // Свойства
    productItemList: ProductItem[]; // // Массив карточек товара
    order: IOrder; // Информация о заказе при покупке товара
    basket: ProductItem[]; // Корзина с товарами
    formErrors: FormErrors; // Ошибки при заполнении форм
    
    // Методы
    toBasket(value: ProductItem): void; // Метод для добавления товара в корзину
    fromBasket(id: string): void; // Метод для удаления товара из корзины
    clearBasket(): void; // Метод для полной очистки корзины
    getItemsInOrderList(): number; // Метод для получения количества товаров в корзине
    getTotalBasketPrice(): number; // Метод для получения суммы цены всех товаров в корзине
    setItems(): void; // Метод для добавления ID товаров в корзине в поле items для order
    setOrderField(field: keyof IOrderForm, value: string): void; // Метод для заполнения полей email, phone, address, payment в order
    validateContacts(): boolean; // Валидация форм для окошка "контакты"
    validateOrder(): boolean; // Валидация форм для окошка "заказ"
    refreshOrder(): boolean; // Очистить order после покупки товаров
    setProductItemsList(items: IProductItem[]): void; // Метод для превращения данных, полученых с сервера в тип данных приложения
    resetChosen(): void; // Метод для обновления поля selected во всех товарах после совершения покупки
  }

export interface IPage {
    productItemList: HTMLElement[] // - ul для вывода карточек товаров 
    counter:number // - счетчик товаров в заказе
}

export type CategoryType =
  | 'другое'
  | 'софт-скил'
  | 'дополнительное'
  | 'кнопка'
  | 'хард-скил';

export type CategoryMapping = {
  [Key in CategoryType]: string;
}

export interface IBasket {
    list: HTMLElement[];  
    price: number;
  }

export interface IPopupView{
    content: HTMLElement
  }
export interface IForm {
    valid: boolean;
    errors: string[];
  }