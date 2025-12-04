import { Component, OnInit } from '@angular/core';
import { Product } from './models/product.model';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ShopVerse Product Dashboard';

  products: Product[] = [];
  selectedProduct: Product | null = null;
  editingProduct: Product | null = null;

  // 'list' = show all products
  // 'detail' = show details + form for one product (or new product)
  viewMode: 'list' | 'detail' = 'list';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.products = this.productService.getProducts();
  }

  private showListView(): void {
    this.viewMode = 'list';
    this.selectedProduct = null;
    this.editingProduct = null;
  }

  private showDetailViewFor(product: Product | null): void {
    this.viewMode = 'detail';
    this.selectedProduct = product;   // null = create new
    this.editingProduct = product;
  }

  // ====== EVENTS FROM CHILD COMPONENTS ======

  // When user clicks a row in the product list
  handleProductSelected(product: Product): void {
    this.showDetailViewFor(product);
  }

  // When user clicks "+ Add New Product" in header
  handleCreateNew(): void {
    this.showDetailViewFor(null);
  }

  // When user saves from form (create or update)
  handleProductSaved(product: Product): void {
    if (product.id) {
      this.productService.updateProduct(product);
    } else {
      this.productService.addProduct(product);
    }
    this.loadProducts();
    this.showListView(); // go back to list after saving
  }

  // When user cancels from form
  handleFormCancelled(): void {
    this.showListView();
  }

  // When user clicks the Back button in detail view
  goBackToList(): void {
    this.showListView();
  }
}
