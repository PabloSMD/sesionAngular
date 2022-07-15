import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/product';
import { ModalAddService } from 'src/app/services/modal-add.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

 /*  @Input ('datos') public products:IProduct [] = []; */
  title = 'Empresa ACME';
  imageWidth: number = 100;
  imageMargin: number = 10;
  showImage:boolean = false;

  itle: string = 'Empresa ACME';
_listFilter: string = '';
  filteredProducts: IProduct[] = [];

  constructor (public productService: ProductService, public modalAddService: ModalAddService) {}

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


  toggleImage(): void {
    this.showImage = !this.showImage;
  }

viewProduct () {
  console.log("a");
}

  deleteProduct (id:number) {
    this.productService.deleteProduct(id).subscribe(() => {
      return this.productService.getProducts().subscribe((res:any []) => {
       this.productService.products = res;
      },
        (      err: any) => console.log(err));
      }) 
    }

    // Actualizar un producto 
    updateProduct(id: number, producto: IProduct) {
      let datos: any = {
        productName: 'Producto' + Math.round(Math.random() * (100 -1)+ 1),
        productCode: this.productService.generarCodigo(),
        releaseDate: '2019-03-07',
        price: Math.round(Math.random() * (130-20) + 20 ),
        description: 'Producto de prueba 2',
        starRating: Math.round(Math.random() * (200-1) +1),
        imageUrl: ''
      };
      this.productService.updateProduct(id, datos).subscribe(() => {
        return this.productService.getProducts().subscribe((res:any []) => {
          this.productService.products = res;
          this.productService.filteredProducts = res;
        },
          (        err: any) => console.log(err));
      })
    }
  }
