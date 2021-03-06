import { Component, OnInit } from '@angular/core';
import {ProductCategoryService} from '../../services/product-category.service';
import {ProductCategory} from '../../model/productCategory';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  categories: ProductCategory[];
  constructor(private productCategoryService: ProductCategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories(){
    this.productCategoryService.fetchCategories().subscribe(categoryData => {
      this.categories = categoryData;
    });
  }

}
