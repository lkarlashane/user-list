import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from 'src/app/models/users';
import { UserListService } from 'src/app/services/user-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  searchForm: FormGroup;
  userList =  new BehaviorSubject<Users[]>([]);
  userList$ = this.userList.asObservable();
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
      this.userList.next(res);
      this.setupPagination(res);
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
      this.userList.next(res.filter(item => item.name.toLocaleLowerCase().includes(input.toLocaleLowerCase())));
      this.setupPagination(this.userList.value);
    })
  }

  clearSearch() {
    this.searchForm.reset();
    this.getUserList();
  }
}
