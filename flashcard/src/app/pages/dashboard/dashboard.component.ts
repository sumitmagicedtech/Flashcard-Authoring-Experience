import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FlashcardDataService } from '../../shared/services/flashcard-data.service';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatCardModule,
     MatButtonModule,
      ReactiveFormsModule,
      MatTableModule
    
    ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  flashcards: any[] = [];
displayedColumns: string[] = [
  'title',
  'images',
  'category',
  'subCategory',
  'subject',
  'difficulty',
  'animation'
];


  constructor(private flashcardService: FlashcardDataService) {}

  ngOnInit(): void {
    this.flashcards = this.flashcardService.getFlashcards();
  }
}