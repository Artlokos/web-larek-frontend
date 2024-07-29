import { MainComponent } from './MainComponent'
import { ensureElement } from '../../utils/utils'
import { IEvents } from '../base/events'
import { IPopupView } from '../../types'

interface IModalData {
  content: HTMLElement
}

export class Popup extends MainComponent<IPopupView> {
  protected _closeButton: HTMLButtonElement
  protected _content: HTMLElement

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container)

    this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container)
    this._content = ensureElement<HTMLElement>('.modal__content', container)
    this._closeButton.addEventListener('click', this.close.bind(this))
    this.container.addEventListener('click', this.close.bind(this))
    this._content.addEventListener('click', (event) => event.stopPropagation())
  }

  set content(value: HTMLElement) {
    this._content.replaceChildren(value)
  }

  open() {
    this.container.classList.add('modal_active')
    this.events.emit('popup:open')
  }

  close() {
    this.container.classList.remove('modal_active')
    this.content = null
    this.events.emit('popup:close')
  }

  render(data: IModalData): HTMLElement {
    super.render(data)
    this.open()
    return this.container
  }
}
