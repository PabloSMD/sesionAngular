import { Component } from '@angular/core';
import { IProduct } from './product';

import { ProductService } from './product/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


// Alumno = PABLO SAN MARTÍN DOMÍNGUEZ



export class AppComponent {

  ngOnInit () : void {
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
  }

title: string = 'Empresa ACME';
_listFilter: string = '';
  filteredProducts: IProduct[] = [];

  constructor (private productService: ProductService) {}

performFilter (filterBy: string) : IProduct [] {
  filterBy = filterBy.toLocaleLowerCase(); //convertir filterBy a minúsculas
  return this.products.filter((product: IProduct) =>
  product.productName.toLocaleLowerCase().indexOf(filterBy)!== -1);

//retorna el nuevo arreglo filtrado 
}
get listFilter() : string {
return this._listFilter;
}
set listFilter ( value : string) {
  this._listFilter = value;
  this.filteredProducts = this.listFilter ? this.performFilter (this.listFilter) : this.products;
} 

products: IProduct [] = [];
}
