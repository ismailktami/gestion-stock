import { Injectable } from '@angular/core';
import {Produit} from '../shared/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitMockServiceService {
   PRODUITS: Produit[] = [];

  constructor() {

    const p1: Produit = new Produit('Livre', 120, 60);
    const p2: Produit = new Produit('Cahier', 50, 20);
    const p3: Produit = new Produit('Phone', 70, 1110);
    this.PRODUITS.push(p1);
    this.PRODUITS.push(p2);
    this.PRODUITS.push(p3);

  }

  public getProduits() {
    return this.PRODUITS;
  }
}
