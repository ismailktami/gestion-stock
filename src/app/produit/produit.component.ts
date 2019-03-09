import { Component, OnInit } from '@angular/core';
import {Produit} from '../shared/produit';
import {ProduitMockServiceService} from '../services/produit-mock-service.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ProduitServiceService} from '../services/produit-service.service';
import {pipe} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  produits: any;
  produitForm: FormGroup;

  constructor(private produitService: ProduitServiceService,           private fb: FormBuilder
  ) {
    this.loadProduits();
    this.produitForm = this.fb.group({
      ref: ['', Validators.required],
      quantite: '',
      prixunitaire : ''

    });
  }

  ngOnInit(): void {
    this.loadProduits();

  }

  loadProduits() {
  this.produitService.getProduits().subscribe(data => {
       this.produits = data;
     }, err => {
       console.log('Error') ;
     }) ;
  }


  /*
  constructor(private produitservice: ProduitMockServiceService
  ,           private fb: FormBuilder
  ) {

    this.produitForm = this.fb.group({
      ref: ['', Validators.required],
      quantite: '',
      prixunitaire : ''

    });
  }

  ngOnInit() {
    this.produits = this.produitservice.getProduits();

  }

  */

}
