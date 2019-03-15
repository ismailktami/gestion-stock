import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {isNullOrUndefined} from 'util';
import {ProduitServiceService} from '../services/produit-service.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-up-image',
  templateUrl: './up-image.component.html',
  styleUrls: ['./up-image.component.css']
})
export class UpImageComponent implements OnInit {
  productFormGroup: FormGroup;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedBlob: Blob;
  closeResult: string;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private modalService: NgbModal ,
              private ps: ProduitServiceService) {
    this.productFormGroup = new FormGroup({
      name: new FormControl('')
    });
  }



  ngOnInit() {
  }
  onSelectFile(event) {


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
    this.croppedBlob = event.file;
  }




}
