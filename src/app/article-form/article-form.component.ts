import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../articles/article.service';
import { EntrepotService } from '../entrepots/entrepot.service';
import { FabricantService } from '../fabricants/fabricant.service';
import { FournisseurService } from '../fournisseurs/fournisseur.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    ArticleService,
    EntrepotService,
    FabricantService,
    FournisseurService
  ]
})
export class ArticleFormComponent implements OnInit {
  articleForm: FormGroup;
  articleId: number | null = null;
  entrepots: any[] = [];
  fabricants: any[] = [];
  fournisseurs: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private entrepotService: EntrepotService,
    private fabricantService: FabricantService,
    private fournisseurService: FournisseurService
  ) {
    this.articleForm = this.fb.group({
      serialNumber: [{ value: '', disabled: true }],
      nom: ['', Validators.required],
      longueur: ['', Validators.required],
      largeur: ['', Validators.required],
      hauteur: ['', Validators.required],
      categorie: ['', Validators.required],
      entrepot: ['', Validators.required],
      fabricant: ['', Validators.required],
      fournisseur: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadEntrepots();
    this.loadFabricants();
    this.loadFournisseurs();

    this.route.paramMap.subscribe((params) => {
      this.articleId = Number(params.get('id'));
      if (this.articleId) {
        this.loadArticle();
      }
    });
  }

  loadArticle(): void {
    if (this.articleId) {
      this.articleService.getArticleBySerialNumber(this.articleId).subscribe((article) => {
        this.articleForm.patchValue({
          ...article,
          entrepot: this.entrepots.find(e => e.id === article.entrepot?.id),  // Finding and setting the full object
          fabricant: this.fabricants.find(f => f.id === article.fabricant?.id),
          fournisseur: this.fournisseurs.find(s => s.id === article.fournisseur?.id),
        });
      });
    }
  }
  loadEntrepots(): void {
    this.entrepotService.getEntrepots().subscribe((entrepots) => {
      this.entrepots = entrepots;
    });
  }

  loadFabricants(): void {
    this.fabricantService.getFabricants().subscribe((fabricants) => {
      this.fabricants = fabricants;
    });
  }

  loadFournisseurs(): void {
    this.fournisseurService.getFournisseurs().subscribe((fournisseurs) => {
      this.fournisseurs = fournisseurs;
    });
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
      const articleData = {
        nom: this.articleForm.value.nom,
        longueur: this.articleForm.value.longueur,
        largeur: this.articleForm.value.largeur,
        hauteur: this.articleForm.value.hauteur,
        categorie: this.articleForm.value.categorie,
        entrepotNom: this.articleForm.value.entrepot.nom ,  // Extracting the name, defaulting to null
        fabricantName: this.articleForm.value.fabricant.name ,  // Extracting the name, defaulting to null
        fournisseurName: this.articleForm.value.fournisseur.name   // Extracting the name, defaulting to null
      };

      // Debugging the article data
      console.log('Article Data:', JSON.stringify(articleData, null, 2));
      console.log('Selected Entrepot:', this.articleForm.value.entrepot);
      console.log('Selected Fabricant:', this.articleForm.value.fabricant);
      console.log('Selected Fournisseur:', this.articleForm.value.fournisseur);

      if (this.articleId) {
        this.articleService.updateArticle(this.articleId, articleData).subscribe(() => {
          this.router.navigate(['/articles']);
        });
      } else {
        this.articleService.createArticle(articleData).subscribe(() => {
          this.router.navigate(['/articles']);
        });
      }
    } else {
      console.error('Form is invalid');
    }
  }

}
