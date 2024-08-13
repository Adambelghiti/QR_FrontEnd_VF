import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule], // Include RouterModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-front';
}
