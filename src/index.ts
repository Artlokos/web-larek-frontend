import { AppApi } from './components/AppApi'
import { Api } from './components/base/api'
import { EventEmitter } from './components/base/events'
import { AppModel,ProductItem } from './components/model/AppModel'
import { Customer } from './components/model/CustomerData'
import { OrderModel } from './components/model/OrderData'
import { ProductItemList } from './components/model/ProductItemsData'
import { MainPage } from './components/view/MainPageView'
import { ListItem, ListItemOpened } from './components/view/ProductItemView'
import './scss/styles.scss'
import { IApi, IProductItem,ICustomer, OrderResponse } from './types'
import { API_URL } from './utils/constants'
import { testCardList } from './utils/tempForTest'
import { ensureElement, cloneTemplate } from './utils/utils'
import { Popup } from './components/view/PopupView'
import { Basket, StoreItemBasket } from './components/view/BasketView'
import { Order} from './components/view/OrderView'
import { Contacts } from './components/view/ContactsView'
import { Success } from './components/view/DoneOrder'

const events = new EventEmitter();
const baseApi: IApi = new Api(API_URL)
const appModel = new AppModel({},events)

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

const basket = new Basket('basket', cloneTemplate(basketTemplate), events);
const order = new Order('order', cloneTemplate(orderTemplate), events)
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);
const success = new Success('order-success', cloneTemplate(successTemplate), {
  onClick: () => {
    events.emit('modal:close')
    popup.close()
  }
})

events.on('items:changed', () => {
    mainPage.productItemList = appModel.productItemList.map((item) => {
      const product = new ListItem(cloneTemplate(cardCatalogTemplate), {
        onClick: () => events.emit('card:select', item),
      })
      return product.render({
        id: item.id,
        title: item.title,
        image: item.image,
        category: item.category,
        price: item.price
      })
    })
  })

events.on('card:select', (item: ProductItem) => {
    // mainPage.locked = true;
    const product = new ListItemOpened(cloneTemplate(cardPreviewTemplate), {
      onClick: () => {events.emit('card:toBasket', item)}})
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
    item.chosen = true;
    appModel.toBasket(item);
    mainPage.counter = appModel.getItemsInOrderList();
    popup.close();
  })

events.on('basket:delete', (item: ProductItem) => {
    appModel.outOfBasket(item.id);
    item.chosen = false;
    basket.price = appModel.getTotalBasketPrice();
    mainPage.counter = appModel.getItemsInOrderList();
    basket.refreshCountInBasket();
    if (!appModel.basketItem.length) {
      basket.disableButton();
    }
  })

events.on('basket:open', () => {
    // mainPage.locked = true
    const basketItems = appModel.basketItem.map((item, index) => {
      const ListItem = new StoreItemBasket(
        'card',
        cloneTemplate(cardBasketTemplate),
        {
          onClick: () => events.emit('basket:delete', item)
        }
      )
      return ListItem.render({
        title: item.title,
        price: item.price,
        index: index + 1,
      })
    })
    popup.render({
      content: basket.render({
        list: basketItems,
        price: appModel.getTotalBasketPrice(),
      }),
    })
  })

events.on('basket:order', () => {popup.render({content: order.render({address: '',valid: false,errors: []})})})
  
events.on('orderFormErrors:change', (errors: Partial<ICustomer>) => {
    const { payment, address } = errors
    order.valid = !payment && !address
    order.errors = Object.values({ payment, address }).filter(i => !!i).join('; ')})
  
events.on('contactsFormErrors:change', (errors: Partial<ICustomer>) => {
    const { email, telephone } = errors
    contacts.valid = !email && !telephone
    contacts.errors = Object.values({ telephone, email }).filter(i => !!i).join('; ')})
  
events.on('orderInput:change', (data: { field: keyof ICustomer, value: string }) => {
    appModel.setOrderField(data.field, data.value)})
  

events.on('order:submit', () => {
    appModel.order.total = appModel.getTotalBasketPrice()
    appModel.setItems()
    popup.render({content: contacts.render({valid: false,errors: []})})})
  
events.on('contacts:submit', () => {
    api.post('/order', appModel.order)
      .then((res) => {
        events.emit('order:success', res);
        appModel.clearBasket();
        appModel.refreshOrder();
        order.disableButtons();
        mainPage.counter = 0;
        appModel.resetChosen();
      })
      .catch((err) => {
        console.log(err)
      })
  })
  
events.on('order:success', (res: OrderResponse<string>) => {popup.render({content: success.render({
    description: res.total})})})
  
  events.on('modal:close', () => {
    // mainPage.locked = false;
    appModel.refreshOrder();
  });
  