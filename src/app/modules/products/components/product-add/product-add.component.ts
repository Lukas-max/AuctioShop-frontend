import {Component, OnInit} from '@angular/core';
import {ProductCategoryService} from '../../services/product-category.service';
import {ProductCategory} from '../../model/productCategory';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {ProductService} from '../../services/product.service';
import {MessageToastrService} from '../../../../core/services/toastr/message-toastr.service';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  categories: ProductCategory[];

  sku: string;
  name: string;
  description: string;
  unitPrice: number;
  unitsInStock: number;
  base64data: string;
  category: number;


  constructor(private productCategoryService: ProductCategoryService,
              private productService: ProductService,
              private messageToastrService: MessageToastrService,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartService.getCartFromStorage();
    this.getCategories();
  }

  private getCategories() {
    this.productCategoryService.fetchCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  public createProduct(form: NgForm) {
    this.productService.addProduct({
      sku: this.sku,
      name: this.name,
      description: this.description,
      unitPrice: this.unitPrice,
      productImage: this.base64data,
      active: this.setActive(),
      unitsInStock: this.unitsInStock,
      dateTimeCreated: new Date(),
      dateTimeUpdated: null,
      productCategoryId: this.category
    }).subscribe(() => {
      this.messageToastrService.success('Dodano produkt do bazy.');
      form.control.reset();
    });
  }

  public onFileChange(event) {
    const reader = new FileReader();
    this.base64data = null;

    if (event.target.files[0]) {
      reader.onload = () => {
        this.base64data = String(reader.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  private setActive(): boolean{
    return this.unitsInStock > 0;
  }
}
