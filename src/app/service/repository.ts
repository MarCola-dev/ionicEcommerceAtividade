import { Storage } from '@ionic/storage'
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Repository {
    private static readonly KEY: string = "token"

    constructor(private storage: Storage) {}

    public saveToken(userToken: any): void {
        this.storage.set(Repository.KEY, userToken)
    }

    public getToken(): any {
        return this.storage.get(Repository.KEY)
    }

    public logoff(): void {
        this.storage.clear()
    }
}