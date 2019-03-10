import {Component, OnInit} from '@angular/core';
import {AppService} from './app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'gestion-tock';

  constructor(public appService: AppService, private router: Router) {

  }

  ngOnInit(): void {
    if (this.appService.authenticated) {
    this.router.navigateByUrl('/content');

    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
