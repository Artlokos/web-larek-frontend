export interface AppState {
    productList?: IProductItems[]; // список товаров
    selectedProductItem?: IProductItem; // выбранный по умолчанию товар
    openedModal: AppStateModals | null; // открытое модальное окно
    basket: IProductItems[]; // корзина одного покупателя
    basketTotalPrice: number; // общая сумма заказа 
    customer: Customer; // данные покупателя
    
    isOrderReady: boolean;
    validationError: string|null;
    badRequest: string|null;


    loadProductList(): Promise<void>; // - загрузить список товаров
    selectProductItem(id:string):void;  // - выбрать один товар из списка
    openModal (modal: AppStateModals): void; // - открыть карточку товара (модальное окно)
    openModalBasket (modal: AppStateModals): void; // - открыть корзину модальное окно

    getProductItemInfo(productItem: IProductItem): Promise<void>; // - получить данные о товаре запросом к серверу
    fillCustomerInfo(customer: Customer):void;
}

interface IProductItems {
    logo: string; // логотип в виде ссылки на изображение
    title: string; // Название сервиса
    basketLogo: string; // Логотип корзины, ссылка на изображение
    length: number; // Количество товаров в списке
}

interface AppStateModals{

}

interface IProductItem {
    // Свойства
    id: string; // = уникальный идентефикатор товара 
    title: string; // - Название товара
    description: string // - Описание товара
    image: string; // - Ссылка на изображение товара
    category: string // - Категория товара
    price: number //- Цена товара
    
    // Методы
    
}

interface IProductItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
    responseName: string;
    error: string;
}

interface Order {
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

interface Customer {
    email: string;
    phone: string;
}
interface OrderResult extends Customer{
    id:string;
}

interface IProductListAPI {
    getProductItemList: ()=>Promise<IProductItem[]>;
    orderFromBasket: (order: Order) => Promise<OrderResult[]>;
}