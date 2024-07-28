import { IApi, IProductItem } from "../types";

export class AppApi {
    private _baseApi: IApi

    constructor (baseApi: IApi) {
        this._baseApi = baseApi
    }

    getProductItemList() {
        return this._baseApi.get<{total: number, items: IProductItem[]}>('/product').then((res: {total: number, items: IProductItem[]}) => res.items)
    }
}
