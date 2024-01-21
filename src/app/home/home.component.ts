import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userId: number | null = null;
  userIdToUpdate: number | null = null;
  userIds: number[] = [];


  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  goToUserDetails(): void {
    if (this.userId) {
      this.router.navigate(['/user/', this.userId]);
    }
  }

}
