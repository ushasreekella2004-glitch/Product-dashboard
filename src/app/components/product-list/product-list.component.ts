import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  @Output() selectProduct = new EventEmitter<Product>();

  searchTerm = '';
  onlyInStock = false;
  onlyOnSale = false;

  get filteredProducts(): Product[] {
    return this.products.filter(p => {
      const term = this.searchTerm.trim().toLowerCase();
      const matchesTerm =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term);

      const matchesStock = !this.onlyInStock || p.inStock;
      const matchesSale = !this.onlyOnSale || p.onSale;

      return matchesTerm && matchesStock && matchesSale;
    });
  }

  onSelect(product: Product): void {
    this.selectProduct.emit(product);
  }
}
