import { Component, OnInit } from '@angular/core';
import { Repository } from '../service/repository';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  private products: any

  constructor(private repository: Repository, private router: Router) { }

  public async delete(product: any) {
    this.products = await this.repository.delete(product.id)
  } 

  ngOnInit() {  
    this.repository.list().then(products => {
      this.products = products
    })
  }

}
