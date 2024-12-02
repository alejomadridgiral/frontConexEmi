import { Component } from '@angular/core';
import { Category, CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { Entrepreneurship, EntrepreneurshipService } from '../../services/entrepreneurship.service';


interface IconMap {
  [key: string]: string;
}


@Component({
  selector: 'app-category',
  standalone: false,

  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  categories: Category[] = [];
  errorMessage: string = '';
  activeCategory: string = 'TODAS';

  iconMap: IconMap = {
    'TODAS': "fa-solid fa-list",
    'Tecnologia': "fa-solid fa-desktop",
    'Energia_y_Sostenibilidad': "fa-solid fa-lightbulb",
    'Salud_y_Bienestar': "fa-solid fa-heart-pulse",
    'E_Commerce': "fa-solid fa-bitcoin-sign",
    'Alimentos_y_Bebidas': "fa-solid fa-utensils",
    'Automotriz': "fa-solid fa-car-side",
    'Deportes': "fa-solid fa-person-running",
    'Cultura': "fa-solid fa-user-group",
    'Educacion': "fa-solid fa-graduation-cap",
    'Moda_y_Belleza': "fa-solid fa-shirt",
    'Construccion_e_Inmobiliaria': "fa-solid fa-building",
    'Otros': "fa-solid fa-ellipsis"
  };

  constructor(private categoryservice: CategoryService, private entrepreneurshipService: EntrepreneurshipService, private router: Router) { }


  ngOnInit(): void {
    this.categoryservice.getAllCategories().subscribe((data) => (this.categories = data.sort((a, b) => a.idCategory - b.idCategory)))
    console.log(this.categories)
  }


  onCategoryClick(nameCategory: string): void {
    this.activeCategory = nameCategory;
    if (nameCategory === 'TODAS') {
      this.entrepreneurshipService.getAllEntrepreneurships().subscribe(
        (data: Entrepreneurship[]) => {
          this.entrepreneurshipService.updateEntrepreneurships(data);
        },
        (error) => {
          this.errorMessage = 'Error al obtener los datos de los emprendimientos';
          console.error(error);
        }
      );
    } else {
      this.entrepreneurshipService.getEntrepreneurshipsByCategory(nameCategory).subscribe(
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
