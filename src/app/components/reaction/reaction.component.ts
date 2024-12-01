import { Component, Input } from '@angular/core';
import { Reaction, ReactionService } from '../../services/reaction.service';
import { EntrepreneurshipService } from '../../services/entrepreneurship.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reaction',
  standalone: false,

  templateUrl: './reaction.component.html',
  styleUrl: './reaction.component.css'
})
export class ReactionComponent {

  @Input() idEntrepreneurship?: number;
  @Input() likes: number = 0;
  reactions: Reaction[] = [];

  constructor(private reactionService: ReactionService, private entrepreneurshipService: EntrepreneurshipService, private router: Router) { }

  
  ngOnInit(): void {
    this.reactionService.getAllReactions().subscribe((data) => (this.reactions = data));
    console.log(this.reactions)
  }

  likeEntrepreneurship(): void {
    if (this.idEntrepreneurship !== undefined) {
      const reaction = { idReaction: 0, hasReacted: true, idEntrepreneurship: this.idEntrepreneurship, idUser: 1 }; // Ajusta el idUser según tu lógica
      this.reactionService.createReaction(reaction).subscribe(() => {
        this.likes++;
      });
    }
  } 

}
