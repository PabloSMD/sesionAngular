import { Component, OnInit } from '@angular/core';
import { ModalAddService } from '../modal-add.service';
import { FormGroup, FormBuilder, Validators, Form, AsyncValidator, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.css']
})
export class ModalAddComponent implements OnInit {

  formProduct: FormGroup;
  productService: any;


  constructor(public modalAddService: ModalAddService, private formBuilder: FormBuilder) { 
    this.formProduct = this.formBuilder.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required,Validators.minLength(8)], this.codeValidator()],
      date: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      rating: ['', [Validators.required]],
    });
  }

  codeValidator(): AsyncValidatorFn {
    return (control: AbstractControl):Observable<{ [key: string]: any} | null> => {
      let code = control.value;
      console.log("cliente - code:" + code);
      return this.productService.searchProduct(control.value)
      .pipe(map((res: string | any[]) => {
        if (res && res.length) {
          console.log('codigo encontrado');
          return { 'existe':true}; // el codigo ya está registrado
        }
        console.log('codigo no existe'); // el codigo no existe
        return null;
      })
      );
    };
  }

  ocultarModal () {
    this.modalAddService.ocultarModal();
  }

saveData () {
  console.log(this.formProduct.value);
}
  ngOnInit(): void {
  }

}
