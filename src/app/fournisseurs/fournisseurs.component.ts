import { Component } from '@angular/core';
import { FournisseurService } from './fournisseur.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrls: ['./fournisseurs.component.css'],
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule],
  providers: [FournisseurService]
})
export class FournisseursComponent {
  fournisseurs: any[] = [];

  constructor(private fournisseurService: FournisseurService, private router: Router) {}

  ngOnInit(): void {
    this.fournisseurService.getFournisseurs().subscribe(fournisseurs => {
      this.fournisseurs = fournisseurs;
    });
  }

  deleteFournisseur(id: number): void {
    this.fournisseurService.deleteFournisseur(id).subscribe(() => {
      this.fournisseurs = this.fournisseurs.filter(fournisseur => fournisseur.id !== id);
    });
  }

  editFournisseur(id: number): void {
    this.router.navigate(['/fournisseurs/edit', id]);
  }
    navigateBack(): void {
    this.router.navigate(['/welcome']);
  }
}
