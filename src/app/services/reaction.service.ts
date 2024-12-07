import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


export interface Reaction {
  idReaction: number;
  hasReacted: boolean;
  idEntrepreneurship: number;
  entrepreneurshipName: string;
  idUser: number;
  user: string;
  totalReactions: number;
}


export interface createReaction {
  hasReacted: boolean;
  idEntrepreneurship: number;
  idUser: number;
}


@Injectable({
  providedIn: 'root'
})
export class ReactionService {
  private apiUrl =  "http://localhost:8080/reaction";

  private reactionAddedSource = new Subject<void>(); // Subject que se utiliza para notificar eventos cuando se agrega una reacción.
  reactionAdded$ = this.reactionAddedSource.asObservable(); // Observable que otros componentes pueden suscribirse para recibir notificaciones de nuevas reacciones.

  constructor(private http: HttpClient) { }


  // Método para crear: Reaction
  createReaction(reaction: createReaction): Observable<Reaction> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Reaction>(this.apiUrl, reaction, { headers })
  }

  // Método para obtener por id: Reaction
  getReactionById(idReaction: number): Observable<Reaction> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Reaction>(`${this.apiUrl}/${idReaction}`, { headers });
  }

  // Método para obtener todos: Reaction
  getAllReactions(): Observable<Reaction[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Reaction[]>(this.apiUrl, { headers })
  }

  // Método para eliminar por id: Reaction
  deleteReactionById(idReaction: number): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<void>(`${this.apiUrl}/${idReaction}`, { headers });
  }

  // Método que notifica a los suscriptores que se ha agregado una nueva reacción
  notifyReactionAdded() {
    this.reactionAddedSource.next(); // Emite un valor a través del Subject para notificar a los suscriptores que se ha agregado una nueva reacción.
  }


}
