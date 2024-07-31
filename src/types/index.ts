import { ApiPostMethods } from './../components/base/api';
import { ProductItem } from '../components/model/AppModel';

// Интерфейс списка товаров
export interface IProductItemListData {
    productItemList: IProductItem[] // - список карточек с сервера
    getProductItem(id:string):IProductItem // - получение данных карточки товара по id
}
// Карточка товара
export interface IProductItem {
    // Свойства
    id:string // - идентефикатор товара
    title: string // - Название товара
    description: string // - Описание товара
    image: string // - Ссылка на изображение товара
    category: string // - Категория товара
    price: number // - Цена товара
    chosen:boolean // - статус товара (в заказе или нет)
}

// Заказ, корзина
export interface IOrder {
    items: string[] // - массив id выбранных товаров
    email: string // - электронная почта покупателя
    phone: string // - телефон покупателя
    address: string // - адрес доставки покупателя
    payment:string // - способ  оплаты
    total: number // - сумма заказа
}
  // Тип данных о покупателе
export interface ICustomer {
    email: string // - электронная почта покупателя
    phone: string // - телефон покупателя
    address: string // - адрес доставки покупателя
    payment:string // - способ  оплаты
}

// Данные для создания новой карточки товара
export type TProductItemInfo = Pick<IProductItem,'id'|'title' | 'description' | 'image' | 'category' | 'price' | 'chosen'>

// Данные для создания заказа из корзины
export type TOrder = Pick<IOrder, 'address'|'payment'>

// Данные электронной почты, телефона покупателя, способа оплаты и адреса доставки
export type TOrderContacts = Pick<ICustomer, 'email' | 'phone' | 'payment' | 'address'>

// Данные для проверки полей формы
export type FormErrors = Partial<Record<keyof ICustomer, string>>

// Тип для отправки заказа на сервер
export interface IOrderResponse {
  id:string
  total:number
}

// Тип для представления попапа при успешном совершении заказа
export interface ISuccess {
  totalPrice: number
}

//Тип объекта для запроса к серверу 
export interface IApi {
    baseUrl: string
    get<T>(uri:string): Promise<T>
    post<T>(uri:string, data:object, method?: ApiPostMethods): Promise<T>
}

//Тип для модели приложения
export interface IAppModel {
    // Свойства
    productItemList: ProductItem[] // // Массив карточек товара
    order: IOrder // Информация о заказе при покупке товара
    basket: ProductItem[] // Корзина с товарами
    formErrors: FormErrors // Ошибки при заполнении форм
    
    // Методы
    toOrderList(value: ProductItem): void // Метод для добавления товара в корзину
    outOfOrderList(id: string): void // Метод для удаления товара из корзины
    clearOrderList(): void // Метод для полной очистки корзины
    getItemsInOrderList(): number // Метод для получения количества товаров в корзине
    getTotalPrice(): number // Метод для получения суммы цены всех товаров в корзине
    setItems(): void // Метод для добавления ID товаров в корзине в поле items для order
    setOrderField(field: keyof ICustomer, value: string): void // Метод для заполнения полей email, phone, address, payment в order
    validateContacts(): boolean; // Валидация форм для окошка "контакты"
    validateOrder(): boolean // Валидация форм для окошка "заказ"
    refreshOrder(): boolean // Очистить order после покупки товаров
    setProductItemsList(items: IProductItem[]): void // Метод для превращения данных, полученых с сервера в тип данных приложения
    resetChosen(): void // Метод для обновления поля chosen во всех товарах после совершения покупки
  }

  //Тип для элемента представления главной страницы
export interface IPage {
    productItemList: HTMLElement[] // - ul для вывода карточек товаров 
    counter:number // - счетчик товаров в заказе
}

// Типы для выбора категорий товаров
export type CategoryType =
  | 'другое'
  | 'софт-скил'
  | 'дополнительное'
  | 'кнопка'
  | 'хард-скил'

export type CategoryArray = {
  [Key in CategoryType]: string
}

export const category: CategoryArray = {
	'другое': 'card__category_other',
	'софт-скил': 'card__category_soft',
	'дополнительное': 'card__category_additional',
	'кнопка': 'card__category_button',
	'хард-скил': 'card__category_hard',
  }

// Тип для представления окна заказа
export interface IOrderList {
    list: HTMLElement[]  
    price: number
  }

// Тип для представления модального окна
export interface IPopupView{content: HTMLElement}

// Тип для представления формы внутри модальных окон 
export interface IForm {valid: boolean, errors: string[]}

// Тип для установки кастомных событий
export interface ICardActions {onClick: (event: MouseEvent) => void}

// Тип для представления событий при завершении заказа
export interface ISuccessActions {onClick: (event: MouseEvent) => void}