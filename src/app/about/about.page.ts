import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  url: string;
  constructor() { }

  ngOnInit() {
    this.url = 'https://cache.desktopnexus.com/thumbseg/2479/2479748-bigthumbnail.jpg';
  }

}
