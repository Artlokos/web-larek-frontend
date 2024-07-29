
// Общий компонент

export abstract class MainComponent<T> {
    protected constructor(protected readonly container: HTMLElement) { }
  
    toggleClass(element: HTMLElement, className: string, force?: boolean): void {
      element.classList.toggle(className, force);
    }
  
    protected setText(element: HTMLElement, value: string): void {
      element.textContent = String(value);
    }
  
    setDisabled(element: HTMLElement, state: boolean): void {
      if (state) element.setAttribute('disabled', 'disabled');
      else element.removeAttribute('disabled');
    }
  
    protected setHidden(element: HTMLElement): void {
      element.style.display = 'none';
    }
  
    protected setVisible(element: HTMLElement): void {
      element.style.removeProperty('display');
    }
  
    protected setImage(element: HTMLImageElement, src: string, alt?: string): void {
      element.src = src;
      if (alt) {
        element.alt = alt;
      }
    }

    render(data?: Partial<T>): HTMLElement {
      Object.assign(this as object, data ?? {});
      return this.container;
    }
  }
  