import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FournisseurService } from '../fournisseurs/fournisseur.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-fournisseur-form',
  templateUrl: './fournisseur-form.component.html',
  styleUrls: ['./fournisseur-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule], // Include necessary modules
  providers: [FournisseurService] // Provide the service if needed
})
export class FournisseurFormComponent implements OnInit {
  fournisseurForm: FormGroup;
  fournisseurId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private fournisseurService: FournisseurService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.fournisseurForm = this.fb.group({
      id: [null],
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.fournisseurId = Number(params.get('id'));
      if (this.fournisseurId) {
        this.loadFournisseur();
      }
    });
  }

  loadFournisseur(): void {
    if (this.fournisseurId) {
      this.fournisseurService.getFournisseurById(this.fournisseurId).subscribe(fournisseur => {
        this.fournisseurForm.patchValue(fournisseur);
      });
    }
  }

  onSubmit(): void {
    const fournisseurData = this.fournisseurForm.value;

    if (this.fournisseurId) {
      this.fournisseurService.updateFournisseur(this.fournisseurId, fournisseurData).subscribe(
        () => this.goToFournisseurList(),
        (error) => console.error('Error updating Fournisseur:', error)
      );
    } else {
      this.fournisseurService.createFournisseur(fournisseurData).subscribe(
        () => this.goToFournisseurList(),
        (error) => console.error('Error creating Fournisseur:', error)
      );
    }
  }

  goToFournisseurList(): void {
    this.router.navigate(['/fournisseurs']);
  }
}
