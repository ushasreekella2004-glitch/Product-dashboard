import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnChanges {
  @Input() product: Product | null = null;
  @Output() save = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<void>();

  // Template-driven bindable model for quick edit (subset)
  quickEditModel: Partial<Product> = {};

  // Reactive form for full editing / creation
  productForm: FormGroup;

  categories = [
    'Electronics',
    'Wearables',
    'Home & Kitchen',
    'Furniture',
    'Accessories',
    'Other'
  ];

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      description: [''],
      inStock: [true],
      onSale: [false]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
      this.patchFromInput();
    }
  }

  private patchFromInput(): void {
    if (this.product) {
      this.quickEditModel = {
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        onSale: this.product.onSale
      };

      this.productForm.patchValue({
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        category: this.product.category,
        description: this.product.description,
        inStock: this.product.inStock,
        onSale: this.product.onSale
      });
    } else {
      this.quickEditModel = {};
      this.productForm.reset({
        id: null,
        name: '',
        price: 0,
        category: '',
        description: '',
        inStock: true,
        onSale: false
      });
    }
  }

  // TEMPLATE-DRIVEN: basic edit (name, price, onSale)
  onQuickEditSubmit(form: any): void {
    if (!form.valid || !this.product) {
      return;
    }

    const merged: Product = {
      ...this.product,
      name: this.quickEditModel.name ?? this.product.name,
      price: Number(this.quickEditModel.price ?? this.product.price),
      onSale: !!this.quickEditModel.onSale
    };

    this.save.emit(merged);
  }

  // REACTIVE: full create/update with validations
  onReactiveSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const value = this.productForm.value;
    const result: Product = {
      id: value.id ?? 0,
      name: value.name,
      price: Number(value.price),
      category: value.category,
      description: value.description ?? '',
      inStock: !!value.inStock,
      onSale: !!value.onSale
    };

    this.save.emit(result);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  hasError(controlName: string, error: string): boolean {
    const control = this.productForm.get(controlName);
    return !!control && control.touched && control.hasError(error);
  }
}
