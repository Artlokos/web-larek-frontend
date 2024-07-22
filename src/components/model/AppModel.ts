export interface IAppState {
    // Корзина с товарами
    basket: Product[];
    // Массив карточек товара
    store: Product[];
    // Информация о заказе при покупке товара
    order: IOrder;
    // Ошибки при заполнении форм
    formErrors: FormErrors;
    // Метод для добавления товара в корзину
    addToBasket(value: Product): void;
    // Метод для удаления товара из корзины
    deleteFromBasket(id: string): void;
    // Метод для полной очистки корзины
    clearBasket(): void;
    // Метод для получения количества товаров в корзине
    getBasketAmount(): number;
    // Метод для получения суммы цены всех товаров в корзине
    getTotalBasketPrice(): number;
    // Метод для добавления ID товаров в корзине в поле items для order
    setItems(): void;
    // Метод для заполнения полей email, phone, address, payment в order
    setOrderField(field: keyof IOrderForm, value: string): void;
    // Валидация форм для окошка "контакты"
    validateContacts(): boolean;
    // Валидация форм для окошка "заказ"
    validateOrder(): boolean;
    // Очистить order после покупки товаров
    refreshOrder(): boolean;
    // Метод для превращения данных, полученых с сервера в тип данных приложения
    setStore(items: IProduct[]): void;
    // Метод для обновления поля selected во всех товарах после совершения покупки
    resetSelected(): void;
  }
  