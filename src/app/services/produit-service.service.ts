import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URLS} from '../app.url.config';
import {Produit} from '../shared/produit';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitServiceService {

  constructor(private http: HttpClient) {


  }
  getProduits(): Observable<any> {
    return this.http.get(API_URLS.PRODUITS_URL);
  }

  addProduit(p: Produit ): Observable<any> {
    return this.http.post(API_URLS.PRODUITS_URL, p );
    }

    updateProduit(p: Produit ): Observable<any> {
    return this.http.put(API_URLS.PRODUITS_URL, p );
    }

    deleteProduit(ref: string): Observable<any> {
    return this.http.delete(API_URLS.PRODUITS_URL + '/${ref}');
    }
}
