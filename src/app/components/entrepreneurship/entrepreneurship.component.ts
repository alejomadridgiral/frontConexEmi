import { Component } from '@angular/core';
import { Entrepreneurship, EntrepreneurshipService } from '../../services/entrepreneurship.service';
import { Router } from '@angular/router';
import { CommentsService } from '../../services/comments.service';
import { ReactionService } from '../../services/reaction.service';


@Component({
  selector: 'app-entrepreneurship',
  standalone: false,

  templateUrl: './entrepreneurship.component.html',
  styleUrl: './entrepreneurship.component.css'
})
export class EntrepreneurshipComponent {

  entrepreneurships: Entrepreneurship[] = [];

  constructor(private entrepreneurshipService: EntrepreneurshipService, private commentsService: CommentsService, private reactionService: ReactionService, private router: Router) { }


  ngOnInit(): void {
    // Suscripción al observable de emprendimientos para recibir actualizaciones en tiempo real
    this.entrepreneurshipService.entrepreneurships$.subscribe((data) => {
      this.entrepreneurships = data; // Actualizar la lista de emprendimientos
      console.log(data)
    });
    // Cargar todos los emprendimientos desde el servicio al inicializar el componente
    this.entrepreneurshipService.getAllEntrepreneurships().subscribe((data) => {
      this.entrepreneurshipService.updateEntrepreneurships(data);  // Actualizar el estado compartido con los datos recibidos
      this.loadCommentsAndReactions(); // Cargar comentarios y reacciones relacionados
    });
    // Suscripción al observable para detectar cuándo se añade un comentario
    this.commentsService.commentAdded$.subscribe(() => {
      this.loadCommentsAndReactions(); // Recargar comentarios y reacciones
    });
  }


  // Carga los comentarios y reacciones para cada emprendimiento.
  loadCommentsAndReactions(): void {
    // Iterar sobre cada emprendimiento para cargar comentarios y reacciones
    this.entrepreneurships.forEach((entrepreneurship) => {
      // Cargar comentarios asociados al emprendimiento
      this.commentsService.getCommentsByEntrepreneurship(entrepreneurship.idEntrepreneurship).subscribe((comments) => {
        // Asignar el total de comentarios del emprendimiento
        entrepreneurship.totalComments = comments.length; 

        // Mapear los comentarios para procesar las fechas
        entrepreneurship.comments = comments.map((comment) => {
          if (comment.commentDate) {
            // Formatear la fecha del comentario de acuerdo con el formato ISO
            const isoDateString = comment.commentDate.replace(' ', 'T');
            const date = new Date(isoDateString);
             // Verificar si la fecha es válida
            if (isNaN(date.getTime())) {
              console.error('Invalid Date format:', comment.commentDate);
            } else {
              // Definir las opciones de formato para la fecha
              const options: Intl.DateTimeFormatOptions = {
                year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit', second: '2-digit'
              };
               // Asignar la fecha formateada al comentario
              comment.commentDate = date.toLocaleDateString('es-ES', options);
            }
          } else {
            console.error('commentDate is undefined for comment:', comment);
          }
          return comment;
        });
      });

      // Cargar reacciones asociadas al emprendimiento
      this.reactionService.getAllReactions().subscribe((reactions) => {
        // Filtrar las reacciones que corresponden al emprendimiento actual
        const reactionsForEntrepreneurship = reactions.filter(
          (reaction) => reaction.idEntrepreneurship === entrepreneurship.idEntrepreneurship
        );
        // Asignar el total de reacciones específicas para este emprendimiento
        entrepreneurship.totalReactions = reactionsForEntrepreneurship.length; 
      });
    });
  }


  // Método que se llama desde el CategoryComponent cuando se hace clic en una categoría.
  filterByCategory(nameCategory: string): void {
    // Llamar al servicio para obtener los emprendimientos que pertenecen a la categoría seleccionada
    this.entrepreneurshipService.getEntrepreneurshipsByCategory(nameCategory).subscribe((data) => {
      // Actualizar la lista de emprendimientos en el servicio con los datos filtrados
      this.entrepreneurshipService.updateEntrepreneurships(data);
    });

  }

  
}
