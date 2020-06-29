import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Repository } from '../service/repository';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private error: String = ""

  public login: string
  public password: string

  constructor(private router: Router, private http: HttpClient, private repository: Repository) { }

  public goRegister(): void {
    this.router.navigate(['register'])
  }

  private logon(): any {
    const body = {
      login: this.login,
      password: this.password
    }

    this.http.post('https://example-ecommerce.herokuapp.com/user/login', body, {responseType: 'text'}).subscribe(response => {
      this.repository.saveToken(response)
      this.router.navigate(['home'])
    }, error => {
      if (!this.login || !this.password) {
        this.error = "Preencha todos os campos"
      } else if (error.status === 401) {
        this.error = "Usuario ou senha invalido"
      }
    })
  }

  ngOnInit() {
  }

}
