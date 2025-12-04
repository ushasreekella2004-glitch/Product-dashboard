import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appOnSaleHighlight]'
})
export class OnSaleHighlightDirective {

  @Input('appOnSaleHighlight')
  isOnSale = false;

  @HostBinding('class.on-sale-highlight')
  get applyHighlight(): boolean {
    return this.isOnSale;
  }
}
