import { Component, OnInit } from '@angular/core';
import {ProductCategoryService} from '../../services/product-category.service';
import {ProductCategory} from '../../model/productCategory';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';

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
  productCategory: ProductCategory;
  image: File;

  constructor(private productCategoryService: ProductCategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories(){
    this.productCategoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  public createProduct(form: NgForm){
    const formData = new FormData();
    formData.append('image', this.image, this.image.name);
  }

  public onFileChange(event) {
    this.image = event.target.files[0];
  }
}
