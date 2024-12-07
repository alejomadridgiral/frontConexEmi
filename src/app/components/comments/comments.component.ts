import { Component, Input } from '@angular/core';
import { EntrepreneurshipService } from '../../services/entrepreneurship.service';
import { Comments, CommentsService } from '../../services/comments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comments',
  standalone: false,

  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {

  @Input() idEntrepreneurship!: number;
  @Input() comments: Comments[] = [];

  newComment: Comments = {
    idComment: 0,
    commentDescription: "",
    idEntrepreneurship: 0,
    idUser: 0,

    commentDate: "",
    entrepreneurshipName: "",
    user: "",
    totalComments: 0,
  };

  constructor(private commentsService: CommentsService, private entrepreneurshipService: EntrepreneurshipService, private router: Router) { }

  // Método para agregar un nuevo comentario al emprendimiento actual
  addComment(): void {
    // Asignar el ID del emprendimiento al nuevo comentario
    this.newComment.idEntrepreneurship = this.idEntrepreneurship

    // Construir el objeto payload con los datos necesarios para el servicio
    const payload = {
      commentDescription: this.newComment.commentDescription,
      idEntrepreneurship: this.newComment.idEntrepreneurship,
      idUser: this.getRandomUserId(),
    };
    // Mostrar el objeto payload en la consola para depuración
    console.log('Payload a enviar:', payload);

    // Llamar al servicio para crear un nuevo comentario
    this.commentsService.createComments(payload).subscribe({
      // Manejo de la respuesta exitosa del servicio
      next: (result) => {
        console.log('Comentario creado con éxito:', result);
        this.comments.push(result); // Agregar el nuevo comentario a la lista actual de comentarios
        this.newComment.commentDescription = ""; // Limpiar el campo de entrada del comentario después de crearlo
        this.commentsService.notifyCommentAdded(); // Notificar a otros componentes o servicios que un comentario ha sido agregado
      },
      // Manejo de errores en caso de que falle la creación del comentario
      error: (e) => {
        console.error('Error al crear el comentario:', e);
        alert('Hubo un error al crear el comentario.');
      },
    });
  }

  
  // Función temporal para generar un ID de usuario aleatorio.
  private getRandomUserId(): number {
    // Genera un número aleatorio entre 0 (inclusive) y 1 (no inclusivo), lo multiplica por 10,
    // redondea hacia abajo para obtener un entero, y luego le suma 1 para que el rango sea de 1 a 10.
    return Math.floor(Math.random() * 10) + 1;
  }


}
