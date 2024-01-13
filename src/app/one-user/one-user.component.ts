// one-user.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-one-user',
  templateUrl: './one-user.component.html',
  styleUrls: ['./one-user.component.scss']
})
export class OneUserComponent implements OnInit {
  userId: number = 0;
  userDetails: any;
  userIds: number[] = [];

  constructor(private route: ActivatedRoute, private ApiService: ApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.getUserDetails();
      
    });
  }

  getUserDetails() {
    this.ApiService.getOneUser(this.userId)
      .subscribe(user => {
        this.userDetails = user;
      });
  }


  getUsersId() {
    this.ApiService.getAllUsers().subscribe(
      (users: any[]) => {
        this.userIds = users.map(user => user.id);
      },
      error => {
        console.error('Erreur lors de la récupération des utilisateurs : ', error);
      }
    );
  }
}
