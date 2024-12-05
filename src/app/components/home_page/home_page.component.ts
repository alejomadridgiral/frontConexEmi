import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  standalone: false,
  
  templateUrl: './home_page.component.html',
  styleUrl: './home_page.component.css'
})
export class HomePageComponent {

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
