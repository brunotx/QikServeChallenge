import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public _opened: boolean = true;

  public addCarts: Array<Product> = [];

  public totalPayment: number = 0;

  public totalPaymentWithoutSavings: number = 0;

  public totalPaymentWithSavings: number = 0;

  public totalSavings: number = 0;

  constructor() { }

  ngOnInit() {
  }

  addCart(product: Product) {
    this.checkExistingProduct(product);
  }

  checkExistingProduct(product: Product) {

    const existingItem = this.addCarts.find(x => x.id === product.id);

    if (existingItem) {
      this.addCarts.forEach(element => {
        if (element.id === product.id) {
          element.quantity++;
          this.checkPromotions(element);
        }
      });
    } else {
      const newProduct = { ...product, quantity: 1 };
      this.addCarts.push(newProduct)
      this.checkPromotions(newProduct);
    }
  }

  calculateTotal() {
    this.totalPaymentWithoutSavings = 0;

    this.addCarts.forEach(element => {
      this.totalPaymentWithoutSavings += element.price * element.quantity;
      this.totalPayment = this.totalPaymentWithoutSavings - this.totalSavings;
    });

  }

  checkPromotions(product: Product) {

    product.promotions.forEach(element => {
      switch (element.type) {
        case "QTY_BASED_PRICE_OVERRIDE": {
          if ((product.quantity % element.required_qty) === 0) {
            this.totalPaymentWithSavings += element.price - product.price;
            this.totalSavings += (product.price * element.required_qty) - element.price;
          } else {
            this.totalPaymentWithSavings += product.price;
          }
          break;
        }
        case "BUY_X_GET_Y_FREE": {
          if ((product.quantity + 1) % 3 === 0) {
            this.totalPaymentWithSavings += product.price;
            product.quantity++;
            this.totalSavings += ((product.price * (product.quantity - 1)) / (product.quantity));
          } else {
            this.totalPaymentWithSavings += product.price;
          }
          break;
        }
        case "FLAT_PERCENT": {
          this.totalPaymentWithSavings += product.price - (product.price * 0.1);
          this.totalSavings += (product.price * 0.1)
          break;
        }
        default: {
          break;
        }
      }
    });
    this.calculateTotal()
  }
}
