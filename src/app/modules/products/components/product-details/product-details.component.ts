import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../model/product';
import { MessageToastrService } from '../../../../core/services/message-toastr.service';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../model/cartItem';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  active: string;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private messageService: MessageToastrService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getProduct();
    });
  }

  private getProduct(){
    const productId: number = +this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(productId).subscribe(data => {
      this.product = data;
      if (this.product.active){
        this.active = 'Produkt dostępny';
      }else {
        this.active = 'Produkt niedostępny';
      }
    });
  }

  public addToCart(product: Product){
    const cartItem = new CartItem(product);
    this.cartService.addToCart2(cartItem);
    // this.messageService.success('Dodano do koszyka');
  }
}
