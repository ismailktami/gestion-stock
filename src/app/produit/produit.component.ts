import { Component, OnInit } from '@angular/core';
import {Produit} from '../shared/produit';
import {ProduitMockServiceService} from '../services/produit-mock-service.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  produits: Produit[];
  constructor(private produitservice: ProduitMockServiceService) {}

  ngOnInit() {
    this.produits = this.produitservice.getProduits();

  }

}
