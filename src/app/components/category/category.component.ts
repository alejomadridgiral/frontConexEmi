import { Component } from '@angular/core';
import { Category, CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { Entrepreneurship, EntrepreneurshipService } from '../../services/entrepreneurship.service';
import { CommentsService } from '../../services/comments.service';


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

  constructor(private categoryservice: CategoryService, private entrepreneurshipService: EntrepreneurshipService, private commentsService: CommentsService, private router: Router) { }


  ngOnInit(): void {
    this.categoryservice.getAllCategories().subscribe((data) => (this.categories = data.sort((a, b) => a.idCategory - b.idCategory)))
    console.log(this.categories)
  }


  onCategoryClick(nameCategory: string): void {
    this.activeCategory = nameCategory;
  
    const handleResponse = (data: Entrepreneurship[]) => {
      this.entrepreneurshipService.updateEntrepreneurships(data);
      this.loadCommentsForEntrepreneurships(data); // Cargar los comentarios
    };
  
    if (nameCategory === 'TODAS') {
      this.entrepreneurshipService.getAllEntrepreneurships().subscribe(
        handleResponse,
        (error) => {
          this.errorMessage = 'Error al obtener los datos de los emprendimientos';
          console.error(error);
        }
      );
    } else {
      this.entrepreneurshipService.getEntrepreneurshipsByCategory(nameCategory).subscribe(
        handleResponse,
        (error) => {
          this.errorMessage = 'Error al obtener los datos de la categoría';
          console.error(error);
        }
      );
    }
  }
  
  // Método auxiliar para cargar los comentarios de los emprendimientos
  private loadCommentsForEntrepreneurships(entrepreneurships: Entrepreneurship[]): void {
    entrepreneurships.forEach((entrepreneurship) => {
      this.commentsService.getCommentsByEntrepreneurship(entrepreneurship.idEntrepreneurship).subscribe(
        (comments) => {
          entrepreneurship.comments = comments.map(comment => {
            if (comment.commentDate) {
              // Ajustar la cadena de fecha al formato ISO 8601
              const isoDateString = comment.commentDate.replace(' ', 'T');
              const date = new Date(isoDateString);
              if (isNaN(date.getTime())) {
                console.error("Invalid Date format:", comment.commentDate);
              } else {
                const options: Intl.DateTimeFormatOptions = {
                  year: 'numeric', month: 'long', day: 'numeric',
                  hour: '2-digit', minute: '2-digit', second: '2-digit'
                };
                comment.commentDate = date.toLocaleDateString('es-ES', options);
              }
            } else {
              console.error("commentDate is undefined for comment:", comment);
            }
            return comment;
          });
        },
        (error) => {
          console.error(`Error al cargar comentarios para el emprendimiento con ID ${entrepreneurship.idEntrepreneurship}:`, error);
        }
      );
    });
  }


}
