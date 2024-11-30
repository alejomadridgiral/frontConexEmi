import { Component } from '@angular/core';
import { Category, CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { Entrepreneurship, EntrepreneurshipService } from '../../services/entrepreneurship.service';

@Component({
  selector: 'app-category',
  standalone: false,
  
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  categories: Category[] = [];
  errorMessage: string = '';


  constructor(private categoryservice: CategoryService, private entrepreneurshipService: EntrepreneurshipService, private router: Router ) {}

  ngOnInit(): void {
    this.categoryservice.getCategory().subscribe((data) => (this.categories = data));
    console.log(this.categories)
  }


  onCategoryClick(nameCategory: string): void {
    if (nameCategory === 'TODAS') {
      this.entrepreneurshipService.getEntrepreneurship().subscribe(
        (data: Entrepreneurship[]) => {
          this.entrepreneurshipService.updateEntrepreneurships(data);
        },
        (error) => {
          this.errorMessage = 'Error al obtener los datos de los emprendimientos';
          console.error(error);
        }
      );
    } else {
      this.entrepreneurshipService.getEntrepreneurshipByCategoryByName(nameCategory).subscribe(
        (data: Entrepreneurship[]) => {
          this.entrepreneurshipService.updateEntrepreneurships(data);
        },
        (error) => {
          this.errorMessage = 'Error al obtener los datos de la categoría';
          console.error(error);
        }
      );
    }
  }


}
