// import { Api } from './components/base/api';
import { AppApi } from './components/AppApi';
import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { Customer } from './components/model/CustomerData';
import { OrderModel } from './components/model/OrderModelData';
import { ProductItemList } from './components/model/ProductItemsData';
import { ProductItemView } from './components/view/ProductItemView';
import './scss/styles.scss';
import { IApi } from './types';
import { API_URL } from './utils/constants';
import { testCardList } from './utils/tempForTest';

const events = new EventEmitter();

const testproductItemList = new ProductItemList(events)





const baseApi: IApi = new Api(API_URL)
const api = new AppApi(baseApi)

api.getProductItemList().then((res)=>{
    console.log(res)
    const a = res.find((item)=> item.price = 750)
    console.log(a)

})

const cardTemplate: HTMLTemplateElement = document.querySelector('#card-preview')
const gallery = document.querySelector('.gallery')