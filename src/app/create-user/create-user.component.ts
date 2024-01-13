// create-user.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  userForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private formBuilder: FormBuilder, private ApiService: ApiService) {
    this.userForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
    });
  }

  createUser() {
    this.errorMessage = null;

    if (this.userForm.valid) {
      const userData = this.userForm.value;

      // Utilisez la nouvelle méthode avec l'observable personnalisé
      this.ApiService.createUser(userData).subscribe(
        (response) => {
          console.log('Utilisateur créé avec succès :', response);
          this.successMessage = 'Utilisateur créé avec succès !';
          this.userForm.reset();
        },
        (error) => {
          console.error('Erreur lors de la création de l\'utilisateur :', error);
          this.successMessage = null;
          this.errorMessage = 'Une erreur s\'est produite lors de la création de l\'utilisateur.';
        }
      );
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs.';
    }
  }

  isFieldInvalid(field: string) {
    return (
      (this.userForm.get(field)?.invalid && this.userForm.get(field)?.touched) ||
      (this.userForm.get(field)?.untouched && this.userForm.touched)
    );
  }
}
