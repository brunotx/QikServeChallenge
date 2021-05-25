import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/_models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  @Input() addCarts: Array<Product> = [];
  @Input() totalPayment: number;
  @Input() totalPaymentWithoutSavings: number;
  @Input() totalSavings: number;
  @Input() totalPaymentWithSavings: number;

  constructor() { }

  ngOnInit() {
  }
}
