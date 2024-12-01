import { Component, Input } from '@angular/core';
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

  @Input() idEntrepreneurship!: number;
  @Input() comments: any[] = [];
  newComment: string = '';


  constructor(private commentsService: CommentsService, private entrepreneurshipService: EntrepreneurshipService, private router: Router) { }

  addComment(): void {
    if (this.newComment.trim()) {
      const comment = { user: 'Usuario', text: this.newComment }; // Ajusta el usuario según tu lógica
      this.entrepreneurshipService.addComment(this.idEntrepreneurship, comment).subscribe(() => {
        this.comments.push(comment);
        this.newComment = '';
      });
    }
  }

}
