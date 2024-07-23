import { Customer } from "./Customer"
import { IProductItem } from "../../types"

export class ProductItem implements IProductItem {
    id: string
    title: string
    description: string
    image:string
    category: string
    price: number
    customer: Customer
    inOrder: boolean

    constructor() {
        
    }

    get (){
        return true
    }
}