import { Component } from '@angular/core';
import { Category, CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { Entrepreneurship, EntrepreneurshipService } from '../../services/entrepreneurship.service';
import { CommentsService } from '../../services/comments.service';
import { ReactionService } from '../../services/reaction.service';


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

  constructor(private categoryservice: CategoryService, private entrepreneurshipService: EntrepreneurshipService, private commentsService: CommentsService, private reactionService: ReactionService, private router: Router) { }


  ngOnInit(): void {
    this.categoryservice.getAllCategories().subscribe((data) => (this.categories = data.sort((a, b) => a.idCategory - b.idCategory)))
    console.log(this.categories)
  }


  // Maneja el evento de clic en una categoría.
  onCategoryClick(nameCategory: string): void {

    // Establece la categoría activa para destacar o filtrar los resultados en la interfaz.
    this.activeCategory = nameCategory;

    // Función reutilizable para manejar la respuesta exitosa de la API.
    const handleResponse = (data: Entrepreneurship[]) => {
      // Actualiza la lista global de emprendimientos en el servicio compartido.
      this.entrepreneurshipService.updateEntrepreneurships(data);
      // Carga los comentarios y reacciones asociados a los emprendimientos recibidos.
      this.loadCommentsAndReactionsForEntrepreneurships(data);
    };

    // Si se selecciona "TODAS", cargar todos los emprendimientos disponibles.
    if (nameCategory === 'TODAS') {
      this.entrepreneurshipService.getAllEntrepreneurships().subscribe(
        handleResponse,
        (error) => {
          this.errorMessage = 'Error al obtener los datos de los emprendimientos';
          console.error(error);
        }
      );
    } else {
      // Cargar emprendimientos filtrados por la categoría seleccionada.
      this.entrepreneurshipService.getEntrepreneurshipsByCategory(nameCategory).subscribe(
        handleResponse,
        (error) => {
          this.errorMessage = 'Error al obtener los datos de la categoría';
          console.error(error);
        }
      );
    }
  }


  //  Método auxiliar para cargar los comentarios y reacciones de una lista de emprendimientos.
  private loadCommentsAndReactionsForEntrepreneurships(entrepreneurships: Entrepreneurship[]): void {
    // Iterar sobre cada emprendimiento en la lista
    entrepreneurships.forEach((entrepreneurship) => {

      // Obtener comentarios asociados al emprendimiento actual
      this.commentsService.getCommentsByEntrepreneurship(entrepreneurship.idEntrepreneurship).subscribe(
        (comments) => {
          // Asignar el total de comentarios al emprendimiento
          entrepreneurship.totalComments = comments.length;

          // Procesar y formatear los comentarios recibidos
          entrepreneurship.comments = comments.map((comment) => {
            if (comment.commentDate) {
              // Convertir la fecha del comentario a un formato válido
              const isoDateString = comment.commentDate.replace(' ', 'T');
              const date = new Date(isoDateString);
              if (isNaN(date.getTime())) {
                console.error('Invalid Date format:', comment.commentDate);
              } else {
                const options: Intl.DateTimeFormatOptions = {
                  year: 'numeric', month: 'long', day: 'numeric',
                  hour: '2-digit', minute: '2-digit', second: '2-digit'
                };
                comment.commentDate = date.toLocaleDateString('es-ES', options);
              }
            } else {
              console.error('commentDate is undefined for comment:', comment);
            }
            return comment;
          });

          // Obtener comentarios asociados al emprendimiento actual
          this.reactionService.getAllReactions().subscribe((reactions) => {
            // Filtrar reacciones que corresponden al emprendimiento actual
            const reactionsForEntrepreneurship = reactions.filter(
              (reaction) => reaction.idEntrepreneurship === entrepreneurship.idEntrepreneurship
            );
            // Asignar el total de reacciones al emprendimiento
            entrepreneurship.totalReactions = reactionsForEntrepreneurship.length;
          });
        });
    })
  }


}