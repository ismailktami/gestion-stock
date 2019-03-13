import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-up-image',
  templateUrl: './up-image.component.html',
  styleUrls: ['./up-image.component.css']
})
export class UpImageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onSelectFile(event) {
    console.log(event);
  }


}
