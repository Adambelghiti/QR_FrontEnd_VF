import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FournisseurService } from '../fournisseurs/fournisseur.service';
import { Fournisseur } from '../fournisseurs/fournisseur';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-fournisseur-form',
  templateUrl: './fournisseur-form.component.html',
  styleUrls: ['./fournisseur-form.component.css'],
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule, ReactiveFormsModule,

    NzTableModule, NzButtonModule, NzIconModule],
  providers: [FournisseurService]
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
      id: [null],  // ID will be set when editing
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
    const fournisseurData: Fournisseur = this.fournisseurForm.value;

    if (this.fournisseurId) {
      this.fournisseurService.updateFournisseur(this.fournisseurId, fournisseurData).subscribe(
        (response) => {
          console.log('Fournisseur updated successfully:', response);
          this.goToFournisseurList();
        },
        (error) => {
          console.error('Error occurred while updating Fournisseur:', error);
        }
      );
    } else {
      this.fournisseurService.createFournisseur(fournisseurData).subscribe(
        (response) => {
          console.log('Fournisseur created successfully:', response);
          this.goToFournisseurList();
        },
        (error) => {
          console.error('Error occurred while creating Fournisseur:', error);
        }
      );
    }
  }

  goToFournisseurList(): void {
    this.router.navigate(['/fournisseurs']).then((success) => {
      if (success) {
        console.log('Navigation to Fournisseur list was successful');
      } else {
        console.error('Navigation to Fournisseur list failed');
      }
    });
  }
}
