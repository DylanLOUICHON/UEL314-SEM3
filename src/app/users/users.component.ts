// users.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  constructor(private ApiService: ApiService) { }

  ngOnInit(): void {
    this.ApiService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }
}