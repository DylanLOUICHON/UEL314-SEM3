// update-user.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit {
  userId: number | null = null;
  userData: any = {};
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = +params['id'];
      if (this.userId) {
        // Récupérez les détails de l'utilisateur à mettre à jour
        this.apiService.getOneUser(this.userId).subscribe(
          (userDetails) => {
            this.userData = userDetails;
          },
          (error) => {
            console.error('Erreur lors de la récupération des détails de l\'utilisateur : ', error);
          }
        );
      }
    });
  }

  updateUser(): void {
    if (this.userId && this.userData) {
      this.apiService.updateUser(this.userId, this.userData).subscribe(
        () => {
          this.errorMessage = null;
          this.successMessage = 'Utilisateur mis à jour avec succès !';
        },
        (error) => {
          this.successMessage = null;
          this.errorMessage = 'Erreur lors de la mise à jour de l\'utilisateur.';
          console.error('Erreur lors de la mise à jour de l\'utilisateur : ', error);
        }
      );
    } else {
      this.errorMessage = 'Veuillez spécifier l\'ID de l\'utilisateur et fournir des données valides.';
    }
  }
}