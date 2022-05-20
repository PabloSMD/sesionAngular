import { Injectable } from '@angular/core';
import { IProduct } from '../product';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { ThisReceiver } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  filteredProducts: IProduct[]=[];
  public products: IProduct[] = [];

  constructor(private http: HttpClient) { }

  getProducts():Observable <IProduct[]> {
    return  this.http.get<IProduct[]> ('http://localhost:3000/productos').pipe(map((res:any) => res.data));
  }
  
/*         {
        
        "productId": 1, 
        "productName": "Zapatillas de lona", 
        "productCode": "GDN-0011",
        "releaseDate": "March 19, 2016",
        "description": "Zapatillas de lona con cana marca Converse" ,
        "price" : 19.95,
        "starRating": 200,
        "imageUrl": ""
        },
        {
        
          "productId": 2, 
        "productName": "Jeans Azules", 
        "productCode": "GDN-0012",
        "releaseDate": "March 10, 2016",
        "description": "Jeans Azules Americanino" ,
        "price" : 24.95,
        "starRating": 50,
        "imageUrl": "https://pngimg.com/uploads/jeans/jeans_PNG5767.png" 
        },
        {
          "productId": 3, 
          "productName": "Polera Hombre ", 
          "productCode": "GDN-00341",
          "releaseDate": "Januarry 19, 2017",
          "description": "Polera para Hombre Verano" ,
          "price" : 15.90,
          "starRating": 150,
          "imageUrl": "https://i0.pngocean.com/files/321/373/250/t-shirt-boyfriend-crew-neck-man-t-shirt.jpg"
        
          },
        {
          "productId": 4, 
          "productName": "Pendiente de Diamantes", 
          "productCode": "GDN-0099",
          "releaseDate": "June 09, 2021",
          "description": "Pendiente con diamantes importados" ,
          "price" : 1900.95,
          "starRating": 5.0,
          "imageUrl": "https://img2.freepng.es/20180430/wcq/kisspng-diamond-necklace-earring-charms-pendants-jewelle-5ae6b940be3739.0893245115250701447791.jpg"
        
          },
        {
          "productId": 5, 
          "productName": "Sandalias de cuero para Mujer", 
          "productCode": "GDN-1211",
          "releaseDate": "December 04, 2014",
          "description": "Sandalias de cuero sintético para mujer" ,
          "price" : 34.95,
          "starRating": 4.6,
          "imageUrl": "https://png.pngtree.com/png-vector/20201224/ourmid/pngtree-womens-sandals-womens-shoes-summer-cool-ladies-png-image_2618751.jpg"
        
          },
        {
          "productId": 6, 
          "productName": "Gorro de Lana", 
          "productCode": "GDN-1311",
          "releaseDate": "March 18, 2017",
          "description": "Gorro de lana invierno 2017" ,
          "price" : 10.95,
          "starRating": 3.7,
          "imageUrl": "https://th.bing.com/th/id/OIP.6tlks76YVPWYT1j-S2AKpwHaFK?pid=ImgDet&rs=1" 
          }
       ]
    
  } */

  deleteProduct(id: number) {
    return this.http.delete('http://localhost:3000/producto/'+id);
  }

  updateProduct (id: number, product: IProduct) {
    return this.http.put('http://localhost:3000/producto/'+id, product);
  }

  rand_code(chars: string, lon: number): string {
    let code ="";
    for (let x =0; x < lon; x++) {
      let rand = Math.floor(Math.random () * chars.length);
      code += chars.substr(rand, 1);
    }
    return code;
  }

  generarCodigo(): string {
    return this.rand_code ('ABCDEFGHIJKLMNOPQRSTUVYZ', 3) + '-' + this.rand_code('0123456789', 4);
  }

  saveProduct (product: IProduct) {
    return this.http.post <IProduct[]> ('http://localhost:3000/producto', product);
  }
}
