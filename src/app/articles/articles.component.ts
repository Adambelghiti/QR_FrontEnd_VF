import { Component } from '@angular/core';
import { ArticleService } from './article.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule,NzTableModule,NzButtonModule,NzIconModule],
  providers: [ArticleService]
})
export class ArticlesComponent {
  articles: any[] = [];

  constructor(private articleService: ArticleService, private router: Router) {
    this.articleService.getArticles().subscribe(
      articles => {
        console.log('Articles loaded:', articles);
        this.articles = articles;
      },
      error => {
        console.error('Error loading articles:', error);
      }
    );
  }

  viewArticle(serialNumber: number): void {
    this.router.navigate(['/articles/view', serialNumber]);
  }

  editArticle(serialNumber: number): void {
    this.router.navigate(['/articles/edit', serialNumber]);
  }

  deleteArticle(serialNumber: number): void {
    this.articleService.deleteArticle(serialNumber).subscribe(() => {
      console.log(`Deleted article with serial number: ${serialNumber}`);
      this.articles = this.articles.filter(article => article.serialNumber !== serialNumber);
    });
  }
  navigateBack(): void {
    this.router.navigate(['/welcome']);
  }
  downloadQr(serialNumber: number): void {
    this.articleService.getQrCode(serialNumber).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${serialNumber}-qr.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error downloading QR code:', error);
    });
  }
}
