import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ArticleService } from '../articles/article.service';
import { Article } from '../articles/article';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  providers: [ArticleService]
})
export class ArticleComponent implements OnInit {
  article: Article | null = null;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.articleService.getArticleBySerialNumber(id).subscribe(article => {
        this.article = article;
      });
    }
  }

  downloadQr(): void {
    if (this.article) {
      const id = this.article.serialNumber;
      if (id !== undefined) {
        this.articleService.getQrCode(id).subscribe(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${id}-qr.png`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        }, error => {
          console.error('Error downloading QR code:', error);
        });
      } else {
        console.error('ID is undefined');
      }
    } else {
      console.error('Article is null');
    }
  }
}
