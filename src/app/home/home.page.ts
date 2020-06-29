import { Component, ViewChild } from '@angular/core';
import { Repository } from '../service/repository'
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IonInfiniteScroll } from '@ionic/angular';

interface Item {
  id: number,
  name: string,
  price: number,
  amount: number
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  private products: any[]
  private cart : Item = {
    id: undefined,
    name: undefined,
    price: undefined,
    amount: undefined
  }

  constructor(private repository: Repository, private router: Router, private http: HttpClient) {}

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      if (this.products.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  public logoff(): void {
    this.repository.logoff()
    this.router.navigate(['login'])
  }

  public saveCart(product: any): void {
    this.cart.id = product.id
    this.cart.name = product.name
    this.cart.price = product.price
    this.cart.amount = product.prince + 1 
    this.repository.addToCart(this.cart)
    // console.log(this.cart)
  }

  public goCart(): void {
    this.router.navigate(['cart'])
  }

  async ngOnInit() {
    await this.repository.getToken() ? console.log(this.repository.getToken()) : this.router.navigate(['login'])

    this.http.get('https://example-ecommerce.herokuapp.com/product/list').subscribe((products: any) =>{
      this.products = products
    })
  }
}
