import { Component, OnInit } from '@angular/core';
import { ModalAddService } from '../modal-add.service';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.css']
})
export class ModalAddComponent implements OnInit {

  formProduct: FormGroup;

  constructor(public modalAddService: ModalAddService, private formBuilder: FormBuilder) { 
    this.formProduct = this.formBuilder.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      date: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      rating: ['', [Validators.required]],
    });
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
