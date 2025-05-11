// src/app/services/flashcard-data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlashcardDataService {
  private key = 'flashcardData';

  getFlashcards(): any[] {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  addFlashcard(flashcard: any) {
    const flashcards = this.getFlashcards();
    flashcards.push(flashcard);
    localStorage.setItem(this.key, JSON.stringify(flashcards));
  }

  clearFlashcards() {
    localStorage.removeItem(this.key);
  }
}
