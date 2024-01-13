import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  userIdToDelete: number = 0;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    
  }

  deleteUser() {
    if (this.userIdToDelete) {
      this.apiService.deleteUser(this.userIdToDelete).subscribe({
        next: (response: any) => {
          this.successMessage = 'Utilisateur supprimé avec succès !';
          this.errorMessage = null;
        },
        error: (error) => {
          this.successMessage = null;
          if (error.status === 404) {
            this.errorMessage = 'L\'utilisateur est introuvable !';
          } else {
            this.errorMessage = 'Une erreur s\'est produite lors de la suppression de l\'utilisateur.';
          }
        },
      });
    } else {
      this.errorMessage = 'Veuillez spécifier l\'ID de l\'utilisateur à supprimer.';
    }
  }
}
