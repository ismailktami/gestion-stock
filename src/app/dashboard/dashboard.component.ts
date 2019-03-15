import { Component, OnInit } from '@angular/core';
import {ProduitServiceService} from '../services/produit-service.service';
import {Produit} from '../shared/produit';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {ProduitMockServiceService} from '../services/produit-mock-service.service';
import {FormGroup, FormBuilder, Validators, Form, FormControl} from '@angular/forms';
import {pipe} from 'rxjs';
import {map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  imageBlobUrl: any = null;
  pages: any;
  produit: Produit;
  page = 0;
  pageContacts: any;
  srcData: SafeResourceUrl;
  image: any ;
  mc = '' ;
  fixt = 'data:image/jpg;base64, ';
  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedBlob: Blob;
  closeResult: string;
  constructor(private produitService: ProduitServiceService , public sanitizer: DomSanitizer ,
              private modalService: NgbModal
              ) {}

  ngOnInit() {
    this.getPrduitsByMc();
    this.produit = new Produit();
  }


  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageBlobUrl = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }
  getPrduitsByMc() {
    this.produitService.getPrduitsByMc2(this.mc, this.page).subscribe((data: any) => {
      this.pageContacts = data;
      this.pages = new Array<number>(data.totalPages);
      this.mc = '';
    }, err => {
      console.log('error data');
    });
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

  open(content, pro: Produit) {
    this.produit = pro;
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
