import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input ('datos') public products:IProduct [] = [];
  title = 'Empresa ACME';
  imageWidth: number = 100;
  imageMargin: number = 10;
  showImage:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

}
