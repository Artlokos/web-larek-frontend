import { ICustomer, TOrderCustomer } from "../../types"


export class Customer implements ICustomer{
    email: string
    telephone: string
    address: string
    payment: string

    constructor(email:string, telephone: string, address: string, payment: string){
        this.email = email
        this.telephone = telephone
        this.address = address
        this.payment = payment
    }

    set CustomerData(id: string) {

    }

    get CustomerData():Customer {
        return Customer;
    }
    checkValidation(data: Record<keyof TOrderCustomer, string>): boolean {
        return true
    }
};