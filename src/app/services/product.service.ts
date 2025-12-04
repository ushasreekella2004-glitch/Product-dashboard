import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Wireless Noise-Cancelling Headphones',
      price: 129.99,
      category: 'Electronics',
      onSale: true,
      description: 'Over-ear Bluetooth headphones with active noise cancellation, 30-hour battery life, and quick-charge support.',
      inStock: true
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      price: 89.5,
      category: 'Wearables',
      onSale: false,
      description: 'Water-resistant fitness tracker with heart-rate monitoring, sleep tracking, and notifications.',
      inStock: true
    },
    {
      id: 3,
      name: 'Ceramic Coffee Mug Set (4 pcs)',
      price: 24.99,
      category: 'Home & Kitchen',
      onSale: true,
      description: 'Minimal, stackable ceramic mugs with matte finish and comfortable grip handle.',
      inStock: false
    },
    {
      id: 4,
      name: 'Ergonomic Office Chair',
      price: 199,
      category: 'Furniture',
      onSale: false,
      description: 'Adjustable chair with lumbar support, breathable mesh back, and 3D armrests.',
      inStock: true
    },
    {
      id: 5,
      name: 'USB-C Fast Charging Cable (2m)',
      price: 12.99,
      category: 'Accessories',
      onSale: true,
      description: 'Durable braided USB-C charging cable compatible with most Android phones and laptops.',
      inStock: true
    }
  ];

  getProducts(): Product[] {
    // Return a shallow copy so components do not mutate internal state directly
    return [...this.products];
  }

  addProduct(product: Product): Product {
    const newProduct: Product = {
      ...product,
      id: this.generateId()
    };
    this.products.push(newProduct);
    return newProduct;
  }

  updateProduct(updated: Product): void {
    const index = this.products.findIndex(p => p.id === updated.id);
    if (index !== -1) {
      this.products[index] = { ...updated };
    }
  }

  private generateId(): number {
    if (this.products.length === 0) {
      return 1;
    }
    return Math.max(...this.products.map(p => p.id)) + 1;
  }
}
