import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
 
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = 'https://fakestoreapi.com/products';

  private readonly httpClient = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    console.log('ProductService: Fetching products...');
    return this.httpClient.get<Product[]>(this.apiUrl);
  }
}