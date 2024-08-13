import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FabricantService } from '../fabricants/fabricant.service';
import { Fabricant } from '../fabricants/fabricant';

@Component({
  selector: 'app-fabricant-form',
  templateUrl: './fabricant-form.component.html',
  styleUrls: ['./fabricant-form.component.css'],
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule, ReactiveFormsModule],
  providers: [FabricantService]
})
export class FabricantFormComponent implements OnInit {
  fabricantForm: FormGroup;
  fabricantId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private fabricantService: FabricantService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.fabricantForm = this.fb.group({
      id: [null],  // ID will be set when editing
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.fabricantId = Number(params.get('id'));
      if (this.fabricantId) {
        this.loadFabricant();
      }
    });
  }

  loadFabricant(): void {
    if (this.fabricantId) {
      this.fabricantService.getFabricantById(this.fabricantId).subscribe(fabricant => {
        this.fabricantForm.patchValue(fabricant);
      });
    }
  }

  onSubmit(): void {
    const fabricantData: Fabricant = this.fabricantForm.value;

    if (this.fabricantId) {
      this.fabricantService.updateFabricant(this.fabricantId, fabricantData).subscribe(
        (response) => {
          console.log('Fabricant updated successfully:', response);
          this.goToFabricantList();
        },
        (error) => {
          console.error('Error occurred while updating Fabricant:', error);
        }
      );
    } else {
      this.fabricantService.createFabricant(fabricantData).subscribe(
        (response) => {
          console.log('Fabricant created successfully:', response);
          this.goToFabricantList();
        },
        (error) => {
          console.error('Error occurred while creating Fabricant:', error);
        }
      );
    }
  }

  goToFabricantList(): void {
    this.router.navigate(['/fabricants']).then((success) => {
      if (success) {
        console.log('Navigation to Fabricant list was successful');
      } else {
        console.error('Navigation to Fabricant list failed');
      }
    });
  }
}
