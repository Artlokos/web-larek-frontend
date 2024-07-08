# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
Компоненты:

Главная страница:
    Список карточек товаров;
    Корзина;

Карточка товара:
    Кнопка закрытия;
    Изображение;
    Категория;
    Название;
    Описание;
    Кнопка "Добавить в корзину
____________________________________________________________________________________
Процессы в проекте:

Главная страница
    -Загрузить список товаров
    -Выбрать товар из списка
    -Открыть карточку товара (модальное окно)
    -Открыть корзину (модальное окно)

Карточка товара
    -Добавить товар в корзину
    -Закрыть модальное окно

Корзина
    -Отобразить список заказанных товаров
    -Удалить товар
    -Закрыть корзину (модальное окно)
    -Посчитать сумму заказа
    -Сформировать заказ

Способ оплаты
    -Выбрать способ оплаты, по умолчанию Онлайн
    -Указать адрес доставки
    -Проверить правильность ввода адреса

Покупатель
    -Указать e-mail
    -Указать телефон
    -Проверить правильность ввода данных в поля ввода
____________________________________________________________________________________
Типы данных из API:

interface IProductList {
    total: number;
    items:IProductItem[];
}

interface IProductItem {
    name: string = "Product Item";
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

____________________________________________________________________________________
Интерфейс API клиента

interface IProductListAPI {
    getProductItemList: ()=>Promise<IProductItem[]>;
    orderFromBasket: (order: Order) => Promise<Order[]>;
}
____________________________________________________________________________________
Базовый код

1. Интерфейс productList
    Описывает отображение списка товаров на главной странице
    Свойства:
        logo: string - логотип в виде ссылки на изображение
        title: string - Название сервиса
        basket: string - Логотип корзины, ссылка на изображение
        length: number - Количество товаров в списке
    Методы:
        getList(): Promise<void> - получить список товаров с сервера
    

2. Класс productItem<T>
    Класс описывает отдельную карточку товара, является дженериком и в переменной T принимает тип данных из полей карточки
    Конструктор принимает следующие аргументы:
        1. title: string - Название товара
        2. description: string - Описание товара
        3. image: string - Ссылка на изображение товара
        4. category: string - Категория товара
        5. price: number - Цена товара
    Методы класса:
        1. openModal (modal: AppStateModals): void - открыть модальное окно
        2. getProductItemInfo(productItem: ProductItem): Promise<void> - получить данные о товаре запросом к серверу
 
    Интерфейс IBasketModel
    Описывает данные приходящие в корзину

 3. Класс BasketModel
    Класс описывает данные товаров, находящихся в корзине. Реализует интерфейс IBasketModel и дополнительно добавляет событие changed.
    Конструктор принимает названия событий, назначенных кнопке "Корзина"
    Свойства класса:
        Массив карточек товаров   items: IProductItem[];
    Методы класса:
     1. add(id:string):void
     2. remove(id: string): void

4. 
