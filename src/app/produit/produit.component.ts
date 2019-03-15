import { Component, OnInit } from '@angular/core';
import {Produit} from '../shared/produit';
import {ProduitMockServiceService} from '../services/produit-mock-service.service';
import {FormGroup, FormBuilder, Validators, Form, FormControl} from '@angular/forms';
import {ProduitServiceService} from '../services/produit-service.service';
import {pipe} from 'rxjs';
import {map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ImageCroppedEvent} from 'ngx-image-cropper';


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
  image: any ;
  srcData: SafeResourceUrl;
  profuitFile: any = File;
  productFormGroup: FormGroup;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedBlob: Blob;
  closeResult: string;
  constructor(private produitService: ProduitServiceService,
              private fb: FormBuilder , private route: ActivatedRoute , private sanitizer: DomSanitizer ,  private modalService: NgbModal
  ) {

    this.productFormGroup = new FormGroup({
      name: new FormControl('')
    });
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
      prixUnitaire : ''

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
   this.produitService.getProduitsByPage(this.page).subscribe((data: any) => {
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
       this.produitService.getPrduitsByMc(this.mc, this.page).subscribe((data: any) => {
       this.pageContacts = data;
       this.pages = new Array<number>(data.totalPages);
       this.mc = '';
    }, err => {
      console.log('error data');
    });
  }

  searchByMc() {
      this.page = 0;
      this.produitService.getPrduitsByMc(this.mc, this.page).subscribe((data: any) => {
      this.pageContacts = data;
      this.pages = new Array<number>(data.totalPages);
      this.mc = '';
    }, err => {
      console.log('error data');
    });
  }


  resetSearch() {
  this.getPrduitsByMc();
  }

  getImageProduct(ref: number) {
    this.produitService.getImage(ref).subscribe((response: any ) => {
  this.image = response;
  this.srcData = this.sanitizer.bypassSecurityTrustResourceUrl(this.image);
  return this.srcData;
}, error1 => {
      console.log(error1);
    });
  }



  AddProduit() {
    const formdata: FormData = new FormData();
    const produit = this.produitForm.value;
    formdata.append('produit', JSON.stringify(produit) );
    formdata.append('file', this.profuitFile);

   /* this.produitService.addProduit(this.produit).subscribe(res => {
      this.getProduitsByPage();
      this.reset();

    }, error1 => {
      console.log('error');
    });
    */
    this.produitService.addProduitWithFile(formdata).subscribe(
      (response) => {
        console.log(response);
        this.getProduitsByPage();
        this.reset();
      }
    );

  }


  onSelectFile(event) {
  const file = event.target.files[0];
  this.profuitFile = file;
  }

  open(content) {
    this.modalService.open(content, {size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  uploadFile(event) {
    this.imageChangedEvent = event;
    // Going away soon.. Bye bye..
    // this.fileToUpload = event.target.files[0];
  }

  imageCropped(event: ImageCroppedEvent) {
    // Preview
    this.croppedImage = event.base64;
    console.log( this.croppedImage ) ;
    this.croppedBlob = event.file;
    console.log( this.croppedBlob ) ;

  }
}
