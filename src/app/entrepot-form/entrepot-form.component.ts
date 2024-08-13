import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EntrepotService } from '../entrepots/entrepot.service';
import { Entrepot } from '../entrepots/entrepot';

@Component({
  selector: 'app-entrepot-form',
  templateUrl: './entrepot-form.component.html',
  styleUrls: ['./entrepot-form.component.css'],
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule, ReactiveFormsModule],
  providers: [EntrepotService]
})
export class EntrepotFormComponent implements OnInit {
  entrepotForm: FormGroup;
  entrepotId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private entrepotService: EntrepotService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.entrepotForm = this.fb.group({
      id: [null],  // ID will be set when editing
      nom: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.entrepotId = Number(params.get('id'));
      if (this.entrepotId) {
        this.loadEntrepot();
      }
    });
  }

  loadEntrepot(): void {
    if (this.entrepotId) {
      this.entrepotService.getEntrepotById(this.entrepotId).subscribe(entrepot => {
        this.entrepotForm.patchValue(entrepot);
      });
    }
  }

  onSubmit(): void {
    const entrepotData: Entrepot = this.entrepotForm.value;

    if (this.entrepotId) {
      this.entrepotService.updateEntrepot(this.entrepotId, entrepotData).subscribe(
        (response) => {
          console.log('Entrepot updated successfully:', response);
          this.goToEntrepotList();
        },
        (error) => {
          console.error('Error occurred while updating Entrepot:', error);
        }
      );
    } else {
      this.entrepotService.createEntrepot(entrepotData).subscribe(
        (response) => {
          console.log('Entrepot created successfully:', response);
          this.goToEntrepotList();
        },
        (error) => {
          console.error('Error occurred while creating Entrepot:', error);
        }
      );
    }
  }

  goToEntrepotList(): void {
    this.router.navigate(['/entrepots']).then((success) => {
      if (success) {
        console.log('Navigation to Entrepot list was successful');
      } else {
        console.error('Navigation to Entrepot list failed');
      }
    });
  }
}
