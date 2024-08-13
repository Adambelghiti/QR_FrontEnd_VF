import { Component } from '@angular/core';
import { EntrepotService } from './entrepot.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entrepots',
  templateUrl: './entrepots.component.html',
  styleUrls: ['./entrepots.component.css'],
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule],
  providers: [EntrepotService]
})
export class EntrepotsComponent {
  entrepots: any[] = [];

  constructor(private entrepotService: EntrepotService, private router: Router) {
    this.entrepotService.getEntrepots().subscribe(entrepots => {
      this.entrepots = entrepots;
    });
  }

  deleteEntrepot(id: number): void {
    this.entrepotService.deleteEntrepot(id).subscribe(() => {
      this.entrepots = this.entrepots.filter(entrepot => entrepot.id !== id);
    });
  }

  editEntrepot(id: number): void {
    this.router.navigate(['/entrepots/edit', id]);
  }
  navigateBack(): void {
    this.router.navigate(['/welcome']);
  }
}
