import { Component } from '@angular/core';
import { FabricantService } from './fabricant.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fabricants',
  templateUrl: './fabricants.component.html',
  styleUrls: ['./fabricants.component.css'],
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule],
  providers: [FabricantService]
})
export class FabricantsComponent {
  fabricants: any[] = [];

  constructor(private fabricantService: FabricantService, private router: Router) {
    this.fabricantService.getFabricants().subscribe(fabricants => {
      this.fabricants = fabricants;
    });
  }

  deleteFabricant(id: number): void {
    this.fabricantService.deleteFabricant(id).subscribe(() => {
      this.fabricants = this.fabricants.filter(fabricant => fabricant.id !== id);
    });
  }

  editFabricant(id: number): void {
    this.router.navigate(['/fabricants/edit', id]);
  }
  navigateBack(): void {
    this.router.navigate(['/welcome']);
  }
}
