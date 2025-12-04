import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  @Input() product: Product | null = null;
  @Output() clearSelection = new EventEmitter<void>();

  onBack(): void {
    this.clearSelection.emit();
  }
}
