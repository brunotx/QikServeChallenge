import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { ProductsService } from 'src/app/_services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products: Array<Product>
  @Output() onAddCart: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getAll().toPromise().then(
      (products) => {
        this.products = products
      }
    );
  }

  addCart(productId: string) {
    this.productsService.getOne(productId).toPromise().then(
      (product) => {
        this.onAddCart.emit(product);
      }
    );
  }
}
