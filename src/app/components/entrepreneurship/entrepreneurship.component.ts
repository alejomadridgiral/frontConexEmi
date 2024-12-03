import { Component } from '@angular/core';
import { Entrepreneurship, EntrepreneurshipService } from '../../services/entrepreneurship.service';
import { Router } from '@angular/router';
import { CommentsService } from '../../services/comments.service';


@Component({
  selector: 'app-entrepreneurship',
  standalone: false,

  templateUrl: './entrepreneurship.component.html',
  styleUrl: './entrepreneurship.component.css'
})
export class EntrepreneurshipComponent {

  entrepreneurships: Entrepreneurship[] = [];

  constructor(private entrepreneurshipService: EntrepreneurshipService, private commentsService: CommentsService, private router: Router) { }


  ngOnInit(): void {
    this.entrepreneurshipService.entrepreneurships$.subscribe((data) => {
      this.entrepreneurships = data;
    });
    this.entrepreneurshipService.getAllEntrepreneurships().subscribe((data) => {
      this.entrepreneurshipService.updateEntrepreneurships(data); this.loadComments();
    });
  }

  
  loadComments(): void {
    this.entrepreneurships.forEach(entrepreneurship => {
      this.commentsService.getCommentsByEntrepreneurship(entrepreneurship.idEntrepreneurship).subscribe(comments => {
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
      });
    });
  }


  // Método que se llamará desde el CategoryComponent cuando se haga clic en una categoría
  filterByCategory(nameCategory: string): void {
    this.entrepreneurshipService.getEntrepreneurshipsByCategory(nameCategory).subscribe((data) => {
      this.entrepreneurshipService.updateEntrepreneurships(data);
    });

  }

}
