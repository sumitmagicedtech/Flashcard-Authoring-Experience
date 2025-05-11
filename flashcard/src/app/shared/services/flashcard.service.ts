import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

@Injectable({
  providedIn: 'root',
})
export class FlashcardService {
  private flashcards: Flashcard[] = [
    { id: 1, question: 'What is Angular?', answer: 'A platform for building web applications.' },
    { id: 2, question: 'What is TypeScript?', answer: 'A superset of JavaScript with type definitions.' },
    { id: 3, question: 'What is RxJS?', answer: 'A library for reactive programming using Observables.' },
    { id: 4, question: 'What is a Component?', answer: 'A building block of Angular applications.' },
  ];

  getFlashcards(): Observable<Flashcard[]> {
    return of(this.flashcards);
  }
}
