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
  produits: Produit[];
  produitForm: FormGroup;
  operation = 'add';
  produit: Produit;
  constructor(private produitService: ProduitServiceService,           private fb: FormBuilder
  ) {
    this.loadProduits();
    this.initProduit();


  }

  ngOnInit(): void {
    this.loadProduits();
    this.initProduit();
    this.initproduitForm();
  }

  loadProduits() {
  this.produitService.getProduits().subscribe(data => {
       this.produits = data;
     }, err => {
       console.log('Error') ;
     }) ;
  }

  AddProduit() {
    console.log('add');
    this.produitService.addProduit(this.produit).subscribe(res => {
    this.loadProduits();
    this.reset();

    }, error1 => {
      console.log('error');
    });
  }

  EditerProduit() {
    console.log('editer');
    this.produitService.updateProduit(this.produit).subscribe(res => {
      this.loadProduits();
      this.reset();
    }, error1 => {
      console.log('error');
    });
  }

initProduit() {
  this.produit = new Produit();

}
  initproduitForm() {
    this.produitForm = this.fb.group({

      ref: ['', Validators.required],
      quantite: '',
      prixunitaire : ''

    });
  }
  remove(ref: string) {
    if ( confirm('Vous êtes sur de la suppression') ) {
      console.log(ref);
      this.produitService.deleteProduit(ref).subscribe(res => {
        this.loadProduits();
      }, error1 => {
        console.log('error');
      });
    }
  }


  reset() {
    this.operation = 'add';
    this.initProduit();
    this.initproduitForm();
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
