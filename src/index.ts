import './scss/styles.scss'
import { API_URL } from './utils/constants'
import { ensureElement, cloneTemplate } from './utils/utils'
import { EventEmitter } from './components/base/events'
import { Api } from './components/base/api'

import { IApi, IProductItem,ICustomer, IOrder, IOrderResponse } from './types'

import { AppApi } from './components/AppApi'
import { AppModel, ProductItem } from './components/model/AppModel'
import { MainPage } from './components/view/MainPageView'
import { ListItem } from './components/view/ProductItemView'
import { testCardList } from './utils/tempForTest'
import { Popup } from './components/view/PopupView'
import { OrderList, OrderListItem } from './components/view/OrderListView'
import { Order, Contacts, Success } from './components/view/FormView'

const events = new EventEmitter()
const appModel = new AppModel({},events)

const baseApi: IApi = new Api(API_URL)
const api = new AppApi(baseApi)
api.getProductItemList()
    .then((res)=>{
        // console.log(res)
        const a = res.find((item)=> item.price = 750)
        // console.log(a)
        appModel.setProductItemsList(res as IProductItem[])
        console.log(appModel)}
        )
    .catch ((err) => console.dir(err))

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog')
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview')
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket')
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket')
const orderTemplate = ensureElement<HTMLTemplateElement>('#order')
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts')
const successTemplate = ensureElement<HTMLTemplateElement>('#success')

const mainPage = new MainPage(document.body, events)
const popup = new Popup(ensureElement<HTMLElement>('#modal-container'), events)

const orderList = new OrderList('basket', cloneTemplate(basketTemplate), events);
const order = new Order('order', cloneTemplate(orderTemplate), events)
const contacts = new Contacts(cloneTemplate(contactsTemplate), events)

const success = new Success('order-success', cloneTemplate(successTemplate), {
    onClick: () => {
    events.emit('popup:close')
    popup.close()}})

events.on('items:changed', () => {
    mainPage.productItemList = appModel.productItemList.map((item) => {
      const product = new ListItem(cloneTemplate(cardCatalogTemplate), {
        onClick: () => events.emit('card:select', item)})
      return product.render({
        id: item.id,
        title: item.title,
        image: item.image,
        category: item.category,
        price: item.price})})})

events.on('card:select', (item: ProductItem) => {
    mainPage.locked = true
    const product = new ListItem(cloneTemplate(cardPreviewTemplate), {onClick: () => {events.emit('card:toBasket', item)}})
    popup.render({
        content: product.render({
        id: item.id,
        title: item.title,
        image: item.image,
        category: item.category,
        description: item.description,
        price: item.price,
        chosen: item.chosen})})})

events.on('card:toBasket', (item: ProductItem) => {
    item.chosen = true
    appModel.toOrderList(item)
    mainPage.counter = appModel.getItemsInOrderList()
    popup.close()})

events.on('orderList:delete', (item: ProductItem) => {
    appModel.outOfOrderList(item.id)
    item.chosen = false
    orderList.price = appModel.getTotalPrice()
    mainPage.counter = appModel.getItemsInOrderList()
    orderList.refreshCountInBasket()
    if (!appModel.orderListItem.length) orderList.disableButton()})

events.on('orderList:open', () => {
    mainPage.locked = true
    const orderItemList = appModel.orderListItem.map((item, index) => {
      const ListItem = new OrderListItem('card',cloneTemplate(cardBasketTemplate),{onClick: () => events.emit('orderList:delete', item)})
        return ListItem.render({
            title: item.title,
            price: item.price,
            index: index + 1})})
    popup.render({
      content: orderList.render({
        list: orderItemList,
        price: appModel.getTotalPrice()})})})

events.on('orderList:order', () => {popup.render({content: order.render({address: '',valid: false,errors: []})})})
  
events.on('orderFormErrors:change', (errors: Partial<ICustomer>) => {
    const { payment, address } = errors
    order.valid = !payment && !address
    order.errors = Object.values({ payment, address }).filter(i => !!i).join('; ')})
  
events.on('contactsFormErrors:change', (errors: Partial<IOrder>) => {
    const { email, phone } = errors
    contacts.valid = !email && !phone
    contacts.errors = Object.values({ phone, email }).filter(error => !!error).join('; ')})
  
events.on('orderInput:change', (data: {field: keyof ICustomer, value: string}) => {appModel.setOrderField(data.field, data.value)})

events.on('order:submit', () => {
    appModel.order.total = appModel.getTotalPrice()
    appModel.setItems()
    popup.render({content: contacts.render({valid: false,errors:[]})})})
  
events.on('contacts:submit', () => {
    api.postOrderToServer(appModel.order)
      .then((res) => {
        events.emit('order:success', res)
        appModel.clearOrderList()
        appModel.refreshOrder()
        order.disableButtons()
        mainPage.counter = 0
        appModel.resetChosen()})
      .catch((err) => {console.log(err)})})
  
events.on('order:success', (res: IOrderResponse) => {popup.render({content:success.render({
    totalPrice: res.total})})})
  
events.on('popup:close', () => {
    mainPage.locked = false
    appModel.refreshOrder()})
  