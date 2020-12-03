import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }
  logout(): void {
    window.location.href = `${location.protocol}//${location.hostname}/api/auth/logout`
  }

}
