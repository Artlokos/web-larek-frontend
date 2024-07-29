// import { Api } from './components/base/api';
import { AppApi } from './components/AppApi';
import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { AppModel } from './components/model/AppModel';
import { Customer } from './components/model/CustomerData';
import { OrderModel } from './components/model/OrderData';
import { ProductItemList } from './components/model/ProductItemsData';
import { MainPage } from './components/view/MainPageView';
import { ListItem, ProductItemView } from './components/view/ProductItemView';
import './scss/styles.scss';
import { IApi, IProductItem } from './types';
import { API_URL } from './utils/constants';
import { testCardList } from './utils/tempForTest';
import { ensureElement, cloneTemplate } from './utils/utils';

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
// const popup = new Popup(ensureElement<HTMLElement>('#modal-container'), events)

// const basket = new Basket('basket', cloneTemplate(basketTemplate), events);
// const order = new Order('order', cloneTemplate(orderTemplate), events)
// const contacts = new Contacts(cloneTemplate(contactsTemplate), events);
// const success = new Success('order-success', cloneTemplate(successTemplate), {
//   onClick: () => {
//     events.emit('modal:close')
//     modal.close()
//   }
// })

events.on('items:changed', () => {
    mainPage.productItemList = appModel.productItemList.map((item) => {
      const product = new ListItem(cloneTemplate(cardCatalogTemplate), {
        onClick: () => events.emit('card:select', item),
      });
      return product.render({
        id: item.id,
        title: item.title,
        image: item.image,
        category: item.category,
        price: item.price,
      });
    });
  });


















const testproductItemList = new ProductItemList(events)
const gallery = document.querySelector('.gallery')

 


