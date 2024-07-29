import { IProductItem,IOrder,IOrderForm,FormErrors } from "../../types";
import { MainModel } from "./MainModel";
import { IAppModel } from "../../types";

export class ProductItem extends MainModel<IProductItem> {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
  chosen: boolean;
}

export class AppModel extends MainModel<IAppModel>{

  basketItem: ProductItem[] = [];

  productItemList: ProductItem[];

  order: IOrder = {
    items: [],
    email: '',
    telephone: '',
    address: '',
    payment: '',
  };

  formErrors: FormErrors = {};

  toBasket(value: ProductItem) {
    this.basketItem.push(value);
  }

  fromBasket(id: string) {
    this.basketItem = this.basketItem.filter(item => item.id !== id)
  }

  clearBasket() {
    this.basketItem.length = 0;
  }

  getItemsInOrderList() {
    return this.basketItem.length;
  }
  
  getTotalBasketPrice() {
    return this.basketItem.reduce((sum:number, next) => sum + next.price, 0);
  }

  setItems() {
    this.order.items = this.basketItem.map(item => item.id)
  }

  setOrderField(field: keyof IOrderForm, value: string) {
    this.order[field] = value;

    if (this.validateContacts()) {
      this.events.emit('contacts:ready', this.order)
    }
    if (this.validateOrder()) {
      this.events.emit('order:ready', this.order);
    }
  }

  validateContacts() {
    const errors: typeof this.formErrors = {};
    if (!this.order.email) {
      errors.email = 'Необходимо указать email';
    }
    if (!this.order.telephone) {
      errors.telephone = 'Необходимо указать телефон';
    }
    this.formErrors = errors;
    this.events.emit('contactsFormErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }

  validateOrder() {
    const errors: typeof this.formErrors = {};
    if (!this.order.address) {
      errors.address = 'Необходимо указать адрес';
    }
    if (!this.order.payment) {
      errors.payment = 'Необходимо указать способ оплаты';
    }
    this.formErrors = errors;
    this.events.emit('orderFormErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }

  refreshOrder() {
    this.order = {
      items: [],
      address: '',
      email: '',
      telephone: '',
      payment: ''
    };
  }

    setProductItemsList(items: IProductItem[]) {
    this.productItemList = items.map((item) => new ProductItem({ ...item, chosen: false }, this.events));
    this.emitChanges('items:changed', { productItemList: this.productItemList });
  }

  resetChosen() {
    this.productItemList.forEach(item => item.chosen = false)
  }
}
