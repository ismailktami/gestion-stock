import { Injectable } from '@angular/core';
import {Produit} from '../shared/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitMockServiceService {
   PRODUITS: Produit[] = [];

  constructor() {

    const p1: Produit = new Produit(1,'Livre', 120, 60);
    const p2: Produit = new Produit(2,'Cahier', 50, 20);
    const p3: Produit = new Produit(3,'Phone', 70, 1110);
    this.PRODUITS.push(p1);
    this.PRODUITS.push(p2);
    this.PRODUITS.push(p3);

  }

  public getProduits() {
    return this.PRODUITS;
  }
}
