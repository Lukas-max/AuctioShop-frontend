import { Component, OnInit } from '@angular/core';
import {ProductCategoryService} from '../../modules/products/services/product-category.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
