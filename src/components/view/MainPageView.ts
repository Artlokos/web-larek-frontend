import { MainComponent } from "./MainComponent";
import { IEvents } from "../base/events";
import { ensureElement} from "../../utils/utils";
import { IPage } from "../../types";


export class MainPage extends MainComponent<IPage> {
    protected _counter: HTMLElement
    protected _productItemList: HTMLElement
    protected _wrapper: HTMLElement
    protected _basket: HTMLElement

    constructor(container: HTMLElement, protected events:IEvents) {
        super(container)
        this._counter = ensureElement<HTMLElement>('.header__basket-counter')
        this._productItemList = ensureElement<HTMLElement>('.gallery')
        this._wrapper = ensureElement<HTMLElement>('.page__wrapper')
        this._basket = ensureElement<HTMLElement>('.header__basket')

        this._basket.addEventListener('click', () => this.events.emit('basket:open'))
    }

    set productItemList(items: HTMLElement[]){
        this._productItemList.replaceChildren(...items)
    }
    
    set counter(value:number){
        this.setText(this._counter, String(value))
    }

}

