import { IProductItem } from "../../types"
import { ensureElement, handlePrice } from "../../utils/utils"
import { MainComponent } from "./MainComponent"
import { CDN_URL, categoryMapping } from "../../utils/constants"
import { CategoryType } from "../../types"

export class ProductItemView extends MainComponent<IProductItem> {
    // protected element: HTMLElement
    // protected events: IEvents
    // protected idView: string
    // protected categoryView: HTMLElement
    // protected titleView: HTMLElement
    // protected descriptionView: HTMLElement
    // protected imageView: HTMLElement
    // protected priceView: HTMLElement
    // protected inOrderButton: HTMLButtonElement
    // protected outOrderButton:HTMLButtonElement

    // constructor(nameElement: string, template:HTMLTemplateElement, actions?: IEvents) {
    //     super(container)
    //     this.events = events
    //     this.element = cloneTemplate(template)

    //     this.categoryView = this.element.querySelector('.card__category')
    //     this.titleView = this.element.querySelector('.card__title')
    //     this.descriptionView = this.element.querySelector('.card__text')
    //     this.imageView = this.element.querySelector('.card__image')
    //     this.priceView = this.element.querySelector('.card__price')
    //     this.inOrderButton = this.element.querySelector('.card__button')
    //     this.outOrderButton = this.element.querySelector('.basket__item-delete')
        
    //     this.element.addEventListener('click', ()=>{this.events.emit('productItem:open', {productItem: this})})

    //     this.inOrderButton.addEventListener('click', ()=>{this.events.emit('productItem:toOrder',{productItem: this})})

    //     // this.outOrderButton.addEventListener('click', ()=>{this.events.emit('productItem:outOfOrder',{productItem:this})})

    // }

    // get id() {
    //     return this.idView
    // }

    // outOrder(productItemId:string) {
    //     this.element.remove()
    //     this.element = null
    // }

    protected _title: HTMLElement
    protected _image: HTMLImageElement
    protected _category: HTMLElement
    protected _price: HTMLElement
    protected _button: HTMLButtonElement

    constructor(protected nameElement:string, container:HTMLElement, actions?: ICardActions) {
        super(container)

        this._title = ensureElement<HTMLElement>(`.${nameElement}__title`, container);
        this._image = ensureElement<HTMLImageElement>(
          `.${nameElement}__image`,
          container
        );
        this._button = container.querySelector(`.${nameElement}__button`);
        this._category = container.querySelector(`.${nameElement}__category`);
        this._price = container.querySelector(`.${nameElement}__price`);
    
        if (actions?.onClick) {
          if (this._button) {
            this._button.addEventListener('click', actions.onClick);
          } else {
            container.addEventListener('click', actions.onClick);
          }
        }
    }
    set id(value: string) {
    this.container.dataset.id = value;
  }
      get id(): string {
      return this.container.dataset.id || '';
  }
  
  set title(value: string) {
    this._title.textContent = value;
  }
  get title(): string {
    return this._title.textContent || '';
  }

  set image(value: string) {
    this._image.src = CDN_URL + value;
  }

  set selected(value: boolean) {
    if (!this._button.disabled) {
      this._button.disabled = value;
    }
  }

  set price(value: number | null) {
    this._price.textContent = value
      ? handlePrice(value) + ' синапсов'
      : 'Бесценно';
    if (this._button && !value) {
      this._button.disabled = true;
    }
  }
 
  set category(value: CategoryType) {
    this._category.textContent = value;
    this._category.classList.add(categoryMapping[value]);
  }

}
interface ICardActions {
    onClick: (event: MouseEvent) => void;
  }

export class ListItem extends ProductItemView{
    constructor(container:HTMLTemplateElement, actions?:ICardActions){
        super('card', container, actions)
    }
}

export class ListItemOpened extends ProductItemView {
    protected _description: HTMLElement;
  
    constructor(container: HTMLElement, actions?:ICardActions) {
      super('card', container, actions);
  
      this._description = container.querySelector(`.${this.nameElement}__text`);
    }
  
    set description(value: string) {
      this._description.textContent = value;
    }
  }