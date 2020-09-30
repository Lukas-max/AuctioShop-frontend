import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Product } from '../../model/product';
import { map } from 'rxjs/operators';
import { ProductCategoryService } from '../../services/product-category.service';
import { ProductCategory } from '../../model/productCategory';
import { ProductService } from '../../services/product.service';
import { MessageToastrService } from '../../../../core/services/toastr/message-toastr.service';


@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product;
  categories: ProductCategory[];
  category: number;
  base64data: string;

  constructor(private activatedRoute: ActivatedRoute,
              private productCategoryService: ProductCategoryService,
              private productService: ProductService,
              private messageToastrService: MessageToastrService,
              private route: Router) { }

  ngOnInit(): void {
    this.base64data = undefined;
    this.getCategories();
    this.activatedRoute
      .paramMap
      .pipe(map(() => window.history.state.product))
      .subscribe(data => {
        this.product = data;
      });
  }

  private getCategories() {
    this.productCategoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  public updateProduct() {
    this.productService.updateProduct({
      productId: this.product.productId,
      sku: this.product.sku,
      name: this.product.name,
      description: this.product.description,
      unitPrice: this.product.unitPrice,
      productImage: this.base64data,
      active: this.checkActive(),
      unitsInStock: this.product.unitsInStock,
      dateTimeCreated: this.product.dateTimeCreated,
      dateTimeUpdated: new Date(),
      productCategoryId: this.category
    }).subscribe(() => {
      this.route.navigate(['products']);
      this.messageToastrService.success('Zmieniono');
    });
  }

  public onFileChange(event) {
    const reader = new FileReader();
    this.base64data = null;

    if (event.target.files[0]){
    reader.onload = () => {
      this.base64data = String(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
    }
  }

  private checkActive(): boolean{
    return this.product.unitsInStock > 0;
  }

}
