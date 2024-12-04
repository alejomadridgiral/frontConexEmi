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

  @Input() idEntrepreneurship!: number;
  @Input() reaction: number = 0;

  newReaction: Reaction = {
    idReaction: 0,
    hasReacted: true,
    idEntrepreneurship: 1,
    idUser: 0,

    entrepreneurshipName: "",
    user: "",
    totalReactions: 0,
  }

  constructor(private reactionService: ReactionService, private entrepreneurshipService: EntrepreneurshipService, private router: Router) { }


  // Método para agregar una reacción a un emprendimiento.
  addReaction(): void {
    // Asignar el ID del emprendimiento al nuevo objeto de reacción
    this.newReaction.idEntrepreneurship = this.idEntrepreneurship

    // Construir el objeto payload con los datos correctos
    const payload = {
      hasReacted: this.newReaction.hasReacted,
      idEntrepreneurship: this.newReaction.idEntrepreneurship,
      idUser: this.getRandomUserId(),
    };
    // Mostrar el objeto payload en la consola para depuración
    console.log('Payload a enviar:', payload);

    // Llamar al servicio para enviar los datos de la reacción
    this.reactionService.createReaction(payload).subscribe({
      // Manejo de la respuesta exitosa del servicio
      next: (result) => {
        console.log('Reacción creada con éxito:', result);
        this.reaction++; // Incrementar el contador de reacciones        
        this.reactionService.notifyReactionAdded();  // Notificar que se agregó una reacción
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
