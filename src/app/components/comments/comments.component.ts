import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EntrepreneurshipService } from '../../services/entrepreneurship.service';
import { CommentsService } from '../../services/comments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comments',
  standalone: false,

  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {

  @Input() idEntrepreneurship: number = 0;
  @Output() commentAdded: EventEmitter<void> = new EventEmitter<void>();
  newComment: string = '';

  constructor(private commentsService: CommentsService) {}

  // Función para agregar un comentario
  addComment(): void {
    if (this.newComment.trim()) {
      const randomUserId = this.getRandomUserId();
      const comment = {
        commentDate: new Date().toISOString(),
        commentDescription: this.newComment,
        idEntrepreneurship: this.idEntrepreneurship,
        idUser: randomUserId
      };

      this.commentsService.createComment(comment).subscribe(response => {
        console.log('Comentario creado', response);
        this.newComment = '';
        this.commentAdded.emit();
      }, error => {
        console.error('Error al crear comentario', error);
      });
    }
  }

  // Función temporal para generar un ID de usuario aleatorio entre 1 y 10
  private getRandomUserId(): number {
    return Math.floor(Math.random() * 10) + 1;
  }

}
