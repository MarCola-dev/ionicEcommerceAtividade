import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { User } from '../../models/user'
import { Router, NavigationExtras } from '@angular/router';
import { Repository } from '../service/repository';
import { error } from '@angular/compiler/src/util';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private user = { address: null, age: null, email: null, name: null, userPassword: null } as User

  private confirmPassword: any 
  private error: string

  constructor(private router: Router, private http: HttpClient, private repository: Repository) { }

  private registerUser(): void {
    const body = {
      address: this.user.address,
      age: this.user.age,
      email: this.user.email,
      name: this.user.name,
      userPassword: this.user.userPassword
    }

    this.http.post('https://example-ecommerce.herokuapp.com/user/customer/add', body, {responseType: "text"}).subscribe(token => {
      this.repository.saveToken(token)
      this.router.navigate(['home'])
    }, error => {
      if (!this.user.address || !this.user.age || !this.user.email || !this.user.name || !this.user.userPassword) {
        this.error = "Preencha todos os campos para continuar"
      } else if (this.user.userPassword !== this.confirmPassword) {
        this.error = "Senhas nao conferem"
      } else if (this.user.userPassword.length < 4) {
        this.error = "A senha deve conter no minimo 4 carácter"
      } else if (this.user.age < 18) {
        this.error = "Ops! Menor de 18 anos"
      } else if (error.status === 400) {
        this.error = "Ops! Houve um problema, tente mais tarde!"
      }
    })
  }

  ngOnInit() {
  }

}
