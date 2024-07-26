import { IApi, IProductItem } from "../types";

export class AppApi {
    private _baseApi: IApi

    constructor (baseApi: IApi) {
        this._baseApi = baseApi
    }

    getProductItemList(): Promise<IProductItem[]> {
        return this._baseApi.get<IProductItem[]>('/product').then((productItemList: IProductItem[]) => productItemList)
    }
}