import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URLS} from '../app.url.config';
import {Produit} from '../shared/produit';
import {Observable, pipe} from 'rxjs';
import {map} from 'rxjs/operators';
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

    deleteProduit(id: number): Observable<any> {
    return this.http.delete(API_URLS.PRODUITS_URL + '/' + id );
    }
    getProduitsByPage(page: number) {
    return this.http.get('http://localhost:9999/api/produit/chercherProduits?size+=5&page=' + page ) ;
    }

    getPrduitsByMc(mc: string, page: number ) {
    return this.http.get('http://localhost:9999/api/produit/chercherByMc?mc=' + mc + '&size=5&page=' + page ) ;
    }

    getImage(ref: number ): Observable<any> {
      return this.http.get('http://localhost:9999/api/produit/image?ref=' + ref, {responseType: 'text'});
    }

}
