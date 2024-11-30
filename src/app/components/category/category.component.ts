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

  entrepreneurships: Entrepreneurship[] = []; 
  errorMessage: string = '';
  categories: Category[] = [];


  constructor(private categoryservice: CategoryService, private entrepreneurshipservice: EntrepreneurshipService, private router: Router ) {}

  ngOnInit(): void {
    this.categoryservice.getCategory().subscribe((data) => (this.categories = data));
    console.log(this.categories)
  }



  onCategoryClick(nameCategory: string): void {
    console.log('Categoría seleccionada: ', nameCategory);
    this.entrepreneurshipservice.getEntrepreneurshipByCategoryByName(nameCategory)
      .subscribe(
        (data: Entrepreneurship[]) => {
          console.log(data)
          this.entrepreneurships = data; // Asignamos el emprendimiento recibido a la propiedad
          
        },
        (error) => {
          this.errorMessage = 'Error al obtener los datos de la categoría';
          console.error(error);
        }
      );
  }


}
