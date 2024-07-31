import { ensureElement, handlePrice } from "../../utils/utils"
import { MainComponent } from "./MainComponent"
import { CDN_URL } from "../../utils/constants"
import { TProductItemInfo,CategoryType,category,ICardActions } from "../../types"

export class ProductItemView extends MainComponent<TProductItemInfo> {
    protected _title: HTMLElement
    protected _image: HTMLImageElement
    protected _category: HTMLElement
    protected _price: HTMLElement
    protected _button: HTMLButtonElement

    constructor(protected nameElement:string, container:HTMLElement, actions?: ICardActions) {
        super(container)

        this._category = container.querySelector(`.${nameElement}__category`)
        this._title = ensureElement<HTMLElement>(`.${nameElement}__title`, container)
        this._image = ensureElement<HTMLImageElement>(`.${nameElement}__image`,container)
        this._button = container.querySelector(`.${nameElement}__button`)
        this._price = container.querySelector(`.${nameElement}__price`)
    
        if (actions?.onClick) {
          if (this._button) {
            this._button.innerHTML="Добавить в заказ"
            this._button.addEventListener('click', actions.onClick);
          } else {
            container.addEventListener('click', actions.onClick);
          }
        }
    }

  set id(value: string) {this.container.dataset.id = value}

  get id(): string {return this.container.dataset.id || ''}
  
  set title(value: string) {this._title.textContent = value}

  get title(): string {return this._title.textContent || ''}

  set image(value: string) {this._image.src = CDN_URL + value}

  set chosen(value: boolean) {if (!this._button.disabled) {this._button.disabled = value}}

  disableButton() {this._button.disabled = true}

  set price(value: number | null) {
    this._price.textContent = value ? handlePrice(value) + ' синапсов' : 'Бесценно'
    if (this._button && !value) {this._button.disabled = true}
  }
 
  set category(value: CategoryType) {
    this._category.textContent = value
    this._category.classList.add(category[value])
  }
}
export class ListItem extends ProductItemView {
    protected _description: HTMLElement
  
    constructor(container: HTMLElement, actions?:ICardActions) {
      super('card', container, actions)
      this._description = container.querySelector(`.${this.nameElement}__text`)
    }
  
    set description(value: string) {this._description.textContent = value}
  }