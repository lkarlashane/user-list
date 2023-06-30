import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Users } from 'src/app/models/users';
import { UserListService } from 'src/app/services/user-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  searchForm: FormGroup;
  users: Users[] = [];
  userList!: Observable<any>;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userListService: UserListService, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      search: ['', [Validators.required]]
    })
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.userListService.getUserList().subscribe(res => {
      this.users = res;
      this.setupPagination(this.users);
    })
  }

  setupPagination(users: Users[]) {
    this.dataSource = new MatTableDataSource(users);
    this.userList = this.dataSource.connect();
    this.dataSource.paginator = this.paginator;
  }

  onSearch() {
    const input = this.searchForm.get('search')?.value;
    this.userListService.getUserList().subscribe(res => {
      this.users = res.filter(item => item.name.toLocaleLowerCase().includes(input.toLocaleLowerCase()))
    })
    // this.searchForm.reset(); 
  }

  clearSearch() {
    this.searchForm.get('search')?.setValue('');
    this.getUserList();
  }
}
