// src/app/services/flashcard-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class FlashcardDataService {
  private key = 'flashcardData';
   private flashcardsSubject = new BehaviorSubject<any[]>(this.getFlashcards());  // BehaviorSubject to emit updates

     get flashcards$() {
    return this.flashcardsSubject.asObservable();
  }

  getFlashcards(): any[] {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  // addFlashcard(flashcard: any) {
  //   const flashcards = this.getFlashcards();
  //   flashcards.push(flashcard);
  //   localStorage.setItem(this.key, JSON.stringify(flashcards));
  // }
    addFlashcard(flashcard: any) {
    const flashcards = this.getFlashcards();
    flashcards.unshift(flashcard);  // Add the new flashcard at the beginning
    localStorage.setItem(this.key, JSON.stringify(flashcards));
    this.flashcardsSubject.next(flashcards);  // Emit updated flashcards
  }

  clearFlashcards() {
    localStorage.removeItem(this.key);
     this.flashcardsSubject.next([]); 
  }
}
