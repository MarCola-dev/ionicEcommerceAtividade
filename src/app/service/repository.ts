import { Storage } from '@ionic/storage'
import { Injectable } from '@angular/core';


interface Item {
    id: number,
    name: string,
    price: number,
    amount: number
}

@Injectable({ providedIn: 'root' })
export class Repository {
    private static readonly KEY: string = "token"

    cartItem: Item[]

    constructor(private storage: Storage) {
        this.storage.get('productCart').then((value) => {
            
            if(value === null) {
                this.cartItem = []
            } else {
                this.cartItem = value
            }
        })
    }

    public saveToken(userToken: any): void {
        this.storage.set(Repository.KEY, userToken)
    }

    public getToken(): any {
        return this.storage.get(Repository.KEY)
    }

    public logoff(): void {
        this.storage.clear()
    }

    public async addToCart(item:Item): Promise<any> {
        this.cartItem.push(item);
        await this.storage.set('productCart', this.cartItem);
    }

    public async delete(id: any): Promise<any[]> {
        let products = await this.list()
        products = products.filter(p => p.id !== id)
        await this.storage.set("productCart", products)
        return products
    }

    public async list(): Promise<any[]> {
        return await this.storage.get('productCart')
    }
}