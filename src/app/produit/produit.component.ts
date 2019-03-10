import { Component, OnInit } from '@angular/core';
import {Produit} from '../shared/produit';
import {ProduitMockServiceService} from '../services/produit-mock-service.service';
import {FormGroup, FormBuilder, Validators, Form} from '@angular/forms';
import {ProduitServiceService} from '../services/produit-service.service';
import {pipe} from 'rxjs';
import {map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  produits: Produit[];
  produitForm: FormGroup;
  searchForm: FormGroup ;
  operation = 'add';
  pages: any;
  produit: Produit;
  page =  0;
  pageContacts: any;
  mc = '' ;
  constructor(private produitService: ProduitServiceService,
              private fb: FormBuilder , private route: ActivatedRoute
  ) {


  }

  ngOnInit(): void {
  //  this.produits = this.route.snapshot.data.produits;
    this.getPrduitsByMc();
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
    this.getProduitsByPage();
    this.reset();

    }, error1 => {
      console.log('error');
    });
  }

  EditerProduit() {
    console.log('editer');
    this.produitService.updateProduit(this.produit).subscribe(res => {
      this.getProduitsByPage();
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
    this.searchForm = this.fb.group({
      mc : ''
    });
  }
  remove(ref: number) {
      this.produitService.deleteProduit(ref).subscribe(res => {
        this.getProduitsByPage();
        this.reset();
      }, error1 => {
        console.log('error');
      });

  }


  reset() {
    this.operation = 'add';
    this.initProduit();
    this.initproduitForm();
  }

 getProduitsByPage() {
   this.produitService.getProduitsByPage(this.page).subscribe(data => {
     this.pageContacts = data;
     this.pages = new Array<number>(data.totalPages);
   }, err => {
     console.log('error data');
   });
 }


  goToPage(i: number) {
      this.page = i ;
      this.getPrduitsByMc();
    }

  getPrduitsByMc() {
       this.produitService.getPrduitsByMc(this.mc, this.page).subscribe(data => {
       this.pageContacts = data;
       this.pages = new Array<number>(data.totalPages);
       this.mc = '';
    }, err => {
      console.log('error data');
    });
  }

  searchByMc() {
      this.page = 0;
      this.produitService.getPrduitsByMc(this.mc, this.page).subscribe(data => {
      this.pageContacts = data;
      this.pages = new Array<number>(data.totalPages);
      this.mc = '';
    }, err => {
      console.log('error data');
    });
  }


  resetSearch(){
  this.getPrduitsByMc();
  }



}
