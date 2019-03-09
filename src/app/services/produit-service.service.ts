import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URLS} from '../app.url.config';
@Injectable({
  providedIn: 'root'
})
export class ProduitServiceService {

  constructor(private http: HttpClient) {


  }
  getProduits() {
    return this.http.get(API_URLS.PRODUITS_URL);
  }
}
