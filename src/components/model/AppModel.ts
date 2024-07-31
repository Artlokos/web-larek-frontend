import { IProductItem,IOrder,FormErrors, ICustomer } from "../../types"
import { MainModel } from "./MainModel"
import { IAppModel } from "../../types"
export class ProductItem extends MainModel<IProductItem> {
  id: string
  description: string
  image: string
  title: string
  category: string
  price: number | null
  chosen: boolean
}
export class AppModel extends MainModel<IAppModel>{
  orderListItem: ProductItem[] = []
  productItemList: ProductItem[]
  order: IOrder = {
    items: [],
    email: '',
    phone: '',
    address: '',
    payment: '',
    total:null
  }
  formErrors: FormErrors = {}

  toOrderList(value: ProductItem) {this.orderListItem.push(value)}
  outOfOrderList(id: string) {this.orderListItem = this.orderListItem.filter(item => item.id !== id)}
  clearOrderList() {this.orderListItem.length = 0}
  getItemsInOrderList() {return this.orderListItem.length}
  getTotalPrice() {return this.orderListItem.reduce((sum:number, next) => sum + next.price, 0)}
  setItems() {this.order.items = this.orderListItem.map(item => item.id)}
  setOrderField(field: keyof ICustomer, value: string) {
    this.order[field] = value
    if (this.validateContacts()) {
      this.events.emit('contacts:ready', this.order)
    }
    if (this.validateOrder()) {
      this.events.emit('order:ready', this.order)
    }
  }
  validateContacts() {
    const errors: typeof this.formErrors = {}
    if (!this.order.email) {errors.email = 'Пропущен email'}
    if (!this.order.phone) {errors.phone = 'Пропущен телефон'}
    this.formErrors = errors
    this.events.emit('contactsFormErrors:change', this.formErrors)
    return Object.keys(errors).length === 0
  }
  validateOrder() {
    const errors: typeof this.formErrors = {}
    if (!this.order.address) {errors.address = 'Пропущен адрес'}
    if (!this.order.payment) {errors.payment = 'Пропущен способ оплаты'}
    this.formErrors = errors
    this.events.emit('orderFormErrors:change', this.formErrors)
    return Object.keys(errors).length === 0
  }
  refreshOrder() {
    this.order = {
      items: [],
      address: '',
      email: '',
      phone: '',
      payment: '',
      total:null
    }
  }
    setProductItemsList(items: IProductItem[]) {
    this.productItemList = items.map((item) => new ProductItem({ ...item, chosen: false }, this.events))
    this.emitChanges('items:changed', { productItemList: this.productItemList })
  }
    resetChosen() {this.productItemList.forEach(item => item.chosen = false)}
}
