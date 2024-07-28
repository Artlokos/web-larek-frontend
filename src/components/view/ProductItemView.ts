import { cloneTemplate } from "../../utils/utils"
import { IEvents } from "../base/events"

export class ProductItemView {
    protected element: HTMLElement
    protected events: IEvents
    protected idView: string
    protected categoryView: HTMLElement
    protected titleView: HTMLElement
    protected descriptionView: HTMLElement
    protected imageView: HTMLElement
    protected priceView: HTMLElement
    protected inOrderButton: HTMLButtonElement
    protected outOrderButton:HTMLButtonElement


    constructor(template:HTMLTemplateElement, events: IEvents) {
        this.events = events
        this.element = cloneTemplate(template)

        this.categoryView = this.element.querySelector('.card__category')
        this.titleView = this.element.querySelector('.card__title')
        this.descriptionView = this.element.querySelector('.card__text')
        this.imageView = this.element.querySelector('.card__image')
        this.priceView = this.element.querySelector('.card__price')
        this.inOrderButton = this.element.querySelector('.card__button')
        this.outOrderButton = this.element.querySelector('.basket__item-delete')
        
        this.element.addEventListener('click', ()=>{this.events.emit('productItem:open', {productItem: this})})

        this.inOrderButton.addEventListener('click', ()=>{this.events.emit('productItem:toOrder',{productItem: this})})

        this.outOrderButton.addEventListener('click', ()=>{this.events.emit('productItem:outOfOrder',{productItem:this})})

    }

    get id() {
        return this.idView
    }

    outOrder(productItemId:string) {
        this.element.remove()
        this.element = null
    }
    render() {
        return this.element
    }

}