import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { flipAnimation, starAnimation } from '../../shared/animations/flip.animation';
import { Flashcard, FlashcardService } from '../../shared/services/flashcard.service';
import { FlashcardTrackingService } from '../../shared/services/flashcard-tracking.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-flashcard-viewer',
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './flashcard-viewer.component.html',
  styleUrl: './flashcard-viewer.component.scss',
  animations: [flipAnimation, starAnimation]
})


export class FlashcardViewerComponent implements OnInit {
  flashcards: Flashcard[] = [];
  currentIndex = 0;
  isFlipped = false;
  isBrowser: boolean;

  constructor(
    private flashcardService: FlashcardService,
    private trackingService: FlashcardTrackingService,
   
    @Inject(PLATFORM_ID) private platformId: any
  ) {
      this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.flashcardService.getFlashcards().subscribe((cards) => {
      this.flashcards = cards;
    });

    if (this.isBrowser) {
      // Check localStorage only if we're in the browser environment
      const stored = localStorage.getItem('favorites');
      if (stored) {
        this.favoriteIds = new Set(JSON.parse(stored));
      }
    }
  }

favoriteIds = new Set<number>();

 toggleFavorite(event: Event) {
    if (this.isBrowser) {
      event.stopPropagation(); // Prevent flip on icon click
      const currentId = this.flashcards[this.currentIndex].id;
      if (this.favoriteIds.has(currentId)) {
        this.favoriteIds.delete(currentId);
      } else {
        this.favoriteIds.add(currentId);
      }
      localStorage.setItem('favorites', JSON.stringify([...this.favoriteIds]));
    }
  }

  isFavorite(id: number): boolean {
    return this.favoriteIds.has(id);
  }


  flipCard(): void {
    this.isFlipped = !this.isFlipped;
  }

  nextCard(): void {
    if (this.currentIndex < this.flashcards.length - 1) {
      this.currentIndex++;
      this.isFlipped = false;
      this.trackingService.markAsViewed(this.flashcards[this.currentIndex].id);
    }
  }

  previousCard(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.isFlipped = false;
      this.trackingService.markAsViewed(this.flashcards[this.currentIndex].id);
    }
  }

  randomCard(): void {
    this.currentIndex = Math.floor(Math.random() * this.flashcards.length);
    this.isFlipped = false;
    this.trackingService.markAsViewed(this.flashcards[this.currentIndex].id);
  }

  hasViewed(id: number): boolean {
    return this.trackingService.hasViewed(id);
  }

  //  toggleFavorite(id: number): void {
  //   if (this.trackingService.isFavorite(id)) {
  //     this.trackingService.removeFavorite(id);
  //   } else {
  //     this.trackingService.addFavorite(id);
  //   }
  // }

  // isFavorite(id: number): boolean {
  //   return this.trackingService.isFavorite(id);
  // }

}
