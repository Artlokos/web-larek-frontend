import { IApi, IProductItem, IProductItemListData } from "../types";

export class AppApi {
    private _baseApi: IApi

    constructor (baseApi: IApi) {
        this._baseApi = baseApi
    }

    getProductItemList() {
        return this._baseApi.get<IProductItem>('/product').then((productItemList: IProductItem) => productItemList.items)
    }
}
