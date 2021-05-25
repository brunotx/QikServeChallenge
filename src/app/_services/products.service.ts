import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../_models/product';


const API = environment.API_URL;

@Injectable()
export class ProductsService {

    public entity_url: string = API;

    constructor(private httpClient: HttpClient) { }

    public getAll(): Observable<Product[]> {
        return this.httpClient.get<Product[]>(`${this.entity_url}/products`);
    }

    public getOne(id: string): Observable<Product> {
        return this.httpClient.get<Product>(`${this.entity_url}/products/` + id);
    }

}
