import { Component } from '@angular/core';
import { Entrepreneurship, EntrepreneurshipService } from '../../services/entrepreneurship.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrepreneurship',
  standalone: false,

  templateUrl: './entrepreneurship.component.html',
  styleUrl: './entrepreneurship.component.css'
})
export class EntrepreneurshipComponent {

  entrepreneurships: Entrepreneurship[] = [];


  constructor(private entrepreneurshipService: EntrepreneurshipService, private router: Router) { }


  ngOnInit(): void {
    this.entrepreneurshipService.entrepreneurships$.subscribe((data) => {
      this.entrepreneurships = data;
    });
    this.entrepreneurshipService.getAllEntrepreneurships().subscribe((data) => {
      this.entrepreneurshipService.updateEntrepreneurships(data);
    });
  }

  
  // Método que se llamará desde el CategoryComponent cuando se haga clic en una categoría
  filterByCategory(nameCategory: string): void {
    this.entrepreneurshipService.getEntrepreneurshipsByCategory(nameCategory).subscribe((data) => {
      this.entrepreneurshipService.updateEntrepreneurships(data);
    });

  }

}
