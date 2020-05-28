import { Component, ViewChild } from '@angular/core';
import { Repository } from '../service/repository'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  private products = [];

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

  async ngOnInit() {
    await this.repository.getToken() ? console.log(this.repository.getToken() + 'passei aqui') : this.router.navigate(['login'])

    this.http.get('https://example-ecommerce.herokuapp.com/product/list').subscribe((product: any) =>{
      this.products = product
    })
  }
}
