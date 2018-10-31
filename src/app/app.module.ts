import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AccordionModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import {InputTextModule} from 'primeng/inputtext';
import {KeyFilterModule} from 'primeng/keyfilter';
import {InputSwitchModule} from 'primeng/inputswitch';
import {EditorModule} from 'primeng/editor';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ChipsModule} from 'primeng/chips';
import {SpinnerModule} from 'primeng/spinner';

// Début des import utiliser pour primeng
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
// Fin des import utiliser pour primeng
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';

// import {MultiSelectModule} from 'primeng/multiselect';

// Utilisé pour faire fonctionner l'exemple de primeng.
import { HttpClientModule } from '@angular/common/http';


import { CalendarModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import {FileUploadModule} from 'primeng/fileupload';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TablecrudComponent } from './components/tablecrud/tablecrud.component';

import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule,
  MatMenuModule, MatSelectModule, MatToolbarModule
} from '@angular/material';

 
import {  NoFrameworkModule, MaterialDesignFrameworkModule } from 'angular6-json-schema-form';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ApplicationFormComponent } from './components/application-form/application-form.component';
 

const appRoutes: Routes = [
  { path: 'form', component: ApplicationFormComponent },
  { path: 'form/:id',      component: ApplicationFormComponent },
  {
    path: 'list',
    component: TablecrudComponent,
    data: { title: 'Heroes List' }
  },
  { path: '',
    redirectTo: '/list',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TablecrudComponent,
    PageNotFoundComponent,
    ApplicationFormComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AccordionModule,
    PanelModule,
    ButtonModule,
    CalendarModule,
    FileUploadModule,
    RadioButtonModule,
    TableModule,
    DialogModule,
    HttpClientModule,
    SliderModule,
    MultiSelectModule,
    DropdownModule,
    // JSON Schema Form
    MaterialDesignFrameworkModule,
    NoFrameworkModule,
    // Material
    MatButtonModule, MatCardModule, MatCheckboxModule,
    MatIconModule, MatMenuModule, MatSelectModule, MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

