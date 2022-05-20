import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { StarComponent } from './product/product-list/star/star.component';


import {LOCALE_ID} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeEsCL from '@angular/common/locales/es-CL'
import { DefaultPipe } from './shared/image.pipe';

import {HttpClientModule } from '@angular/common/http';
import { ModalAddComponent } from './services/modal-add/modal-add.component';
registerLocaleData(localeEsCL, 'es-CL');

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    StarComponent,
    DefaultPipe,
    ModalAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es-CL'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
