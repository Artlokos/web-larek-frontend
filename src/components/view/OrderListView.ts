import { IEvents } from "../base/events"
import { IProductItem } from "../../types"
import { handlePrice } from "../../utils/utils"
import { MainComponent } from "./MainComponent"
import { IOrderList, ICardActions } from "../../types"

export class OrderList extends MainComponent<IOrderList> {

  protected _list: HTMLElement
  protected _price: HTMLElement
  protected _button: HTMLButtonElement


  constructor(
    protected blockName: string,
    container: HTMLElement,
    protected events: IEvents
  ) {
    super(container)

    this._button = container.querySelector(`.${blockName}__button`)
    this._price = container.querySelector(`.${blockName}__price`)
    this._list = container.querySelector(`.${blockName}__list`)

    if (this._button) {
      this._button.addEventListener('click', () => this.events.emit('orderList:order'))
    }
  }

  set price(price: number) {
    this._price.textContent = handlePrice(price) + ' синапсов'
  }

  set list(items: HTMLElement[]) {
    this._list.replaceChildren(...items)
    this._button.disabled = items.length ? false : true
  }

  disableButton() {
    this._button.disabled = true
  }

  refreshCountInOrderList() {
    Array.from(this._list.children).forEach(
      (item, index) =>
      (item.querySelector('.basket__item-index')!.textContent = (
        index + 1
      ).toString())
    )
  }
}

export interface IProductOrderList extends IProductItem {
  id: string
  index: number
}

export class OrderListItem extends MainComponent<IProductOrderList> {
  protected _index: HTMLElement
  protected _title: HTMLElement
  protected _price: HTMLElement
  protected _button: HTMLButtonElement

  constructor(
    protected blockName: string,
    container: HTMLElement,
    actions?: ICardActions
  ) {
    super(container)

    this._title = container.querySelector(`.${blockName}__title`)
    this._price = container.querySelector(`.${blockName}__price`)
    this._button = container.querySelector(`.${blockName}__button`)
    this._index = container.querySelector(`.basket__item-index`)

    if (this._button) {
      this._button.addEventListener('click', (evt) => {
        this.container.remove()
        actions?.onClick(evt)
      })
    }
  }

  set title(value: string) {
    this._title.textContent = value
  }

  set index(value: number) {
    this._index.textContent = value.toString()
  }

  set price(value: number) {
    this._price.textContent = handlePrice(value) + ' синапсов'
  }
}
