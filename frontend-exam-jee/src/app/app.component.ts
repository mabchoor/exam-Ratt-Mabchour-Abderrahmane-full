// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientListComponent } from './components/client-list/client-list.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ClientListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-exam-jee';
}