import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SelectInputComponent } from '../../components/select-input/select-input.component';
import { TextInputComponent } from '../../components/text-input/text-input.component';
import { TagInputComponent } from '../../components/tag-input/tag-input.component';
import { FlashcardDataService } from '../../shared/services/flashcard-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flashcard-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    SelectInputComponent,  // Add to the imports array
    TextInputComponent,
    // TagInputComponent,
  ],
  templateUrl: './flashcard-form.component.html',
  styleUrls: ['./flashcard-form.component.scss']
})
export class FlashcardFormComponent {
  form: FormGroup;
  difficulties = ['Easy', 'Medium', 'Hard'];
  animations = ['Flip', 'Slide', 'Fade'];

  // Constructor of FlashcardFormComponent
  constructor(
    private fb: FormBuilder,
     private flashcardService: FlashcardDataService,
   private router: Router
  
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      images: this.fb.array([]),
      tags: this.fb.group({
        category: [''],
        subCategory: [''],
        subject: [''],
      }),
      difficulty: ['', Validators.required],  // Initialize FormControl here
      animation: ['', Validators.required],  // Initialize FormControl here
    });
  }

  // Form Control Getters
  get titleControl(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get difficultyControl(): FormControl {
    return this.form.get('difficulty') as FormControl;
  }

  get animationControl(): FormControl {
    return this.form.get('animation') as FormControl;
  }

  // Form Controls
  get images() {
    return this.form.get('images') as FormArray;
  }

  get categoryControl(): FormControl {
    return this.form.get('tags.category') as FormControl;
  }

  get subCategoryControl(): FormControl {
    return this.form.get('tags.subCategory') as FormControl;
  }

  get subjectControl(): FormControl {
    return this.form.get('tags.subject') as FormControl;
  }

  // Add Image Functionality
  addImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      const file = input.files[0];
      this.images.push(this.fb.control(file.name)); // Adding file name to FormArray
      input.value = ''; // Clear the file input
    }
  }

  // Remove Image Functionality
  removeImage(index: number) {
    this.images.removeAt(index);
  }

  // Reset Form - Restore initial state but keeps values
  resetForm() {
    // Reset the form without clearing images or removing the values
    this.form.reset({
      title: this.form.get('title')?.value || '', // Optional: Add a default value for title
      images: this.form.get('images')?.value || [], // Preserve image array if necessary
      tags: {
        category: this.form.get('tags.category')?.value || '',
        subCategory: this.form.get('tags.subCategory')?.value || '',
        subject: this.form.get('tags.subject')?.value || ''
      },
      difficulty: this.form.get('difficulty')?.value || '',
      animation: this.form.get('animation')?.value || ''
    });
    // Reset the state of controls (pristine, touched, etc.) without clearing data
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  // Clear Form - Completely clear the form values and reset its state
  clearForm() {
    this.form.reset(); // Completely clear all form values
    this.images.clear(); // Clear images FormArray
    this.form.markAsPristine(); // Optionally mark the form as pristine
    this.form.markAsUntouched(); // Optionally mark the form as untouched
  }

  // Submit Form
  // submit() {
  //   if (this.form.valid) {
  //     console.log('Form Submitted:', this.form.value); // Log the form's values
  //   } else {
  //     console.log('Form is invalid');
  //   }
  // }


// submit() {
//   if (this.form.valid) {
//     const formValue = {
//       ...this.form.value,
//       images: this.images.controls.map(ctrl => ctrl.value)
//     };
//     this.flashcardService.addFlashcard(formValue);
//     console.log('Saved to LocalStorage:', formValue);
//     this.form.reset();
//     this.images.clear();
//   }

 
submit() {
  if (this.form.valid) {
    const flashcard = this.form.value;
    this.flashcardService.addFlashcard(flashcard); // Save to localStorage
    this.form.reset(); // Optional: clear form after submission
    this.router.navigate(['/dashboard']); // Redirect to dashboard (or '/dashboard' if that's your route)
  } else {
    console.log('Form is invalid');
  }
}


}
