import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import  { HttpClientModule } from '@angular/common/http';

import { UserRoutingModule } from './user-routing.module';
import { MatCardModule } from '@angular/material/card';
import { UserListComponent } from './user-list/user-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class UserModule { }
