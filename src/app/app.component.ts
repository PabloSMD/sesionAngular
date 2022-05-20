import { Component } from '@angular/core';
import { IProduct } from './product';

import { ProductService } from './product/product.service';
import { ModalAddService } from './services/modal-add.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


// Alumno = PABLO SAN MARTÍN DOMÍNGUEZ



export class AppComponent {

  ngOnInit () : void {
    this.productService.getProducts().subscribe((res : any[]) => {
      this.products = res;
      this.filteredProducts = res;
      console.log(this.products);
    },
    err => console.log(err)
    )
  }

title: string = 'Empresa ACME';
_listFilter: string = '';
  filteredProducts: IProduct[] = [];

  constructor (private productService: ProductService, public modalAddService: ModalAddService) {}

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


crearProducto () {
  let datos: any = {
    name: 'Producto' + Math.round (Math.random()*(100 -1) +1),
    code: this.productService.generarCodigo(),
    date: '2019-03-07',
    price: Math.round(Math.random() * (130-20) +20),
    description: 'Producto de prueba',
    rating: Math.round(Math.random()* (200-1)+1),
    image: ''
  };
  this.guardarProducto(datos);
}

guardarProducto (producto: IProduct) {
  this.productService.saveProduct(producto).subscribe(()=> {
    return this.productService.getProducts().subscribe((res: any[]) => {
      this.products = res;
      this.filteredProducts = res;
    },
    err => console.log(err));
  })

}

abrirModal () {
  this.modalAddService.mostrarModal (); 
}

}
