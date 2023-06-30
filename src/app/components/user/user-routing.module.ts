import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'user-list',
        component: UserListComponent
      },
      {
        path: '',
        redirectTo: '/user-list',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
