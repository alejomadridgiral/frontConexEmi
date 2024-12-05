import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  standalone: false,
  
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  scrollTo(targetId: string): void {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, 
        behavior: 'smooth',
      });
    }
  }
  
}
