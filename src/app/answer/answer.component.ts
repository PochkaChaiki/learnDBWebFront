import { Component, OnInit } from '@angular/core';
import { AnswerService, Answer } from '../answer.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  imports:[
    ReactiveFormsModule,
    NgFor
  ],
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  answers: Answer[] = [];
  answerForm: FormGroup;
  sortField: string = '';
  sortDirection: string = 'asc';

  constructor(private answerService: AnswerService, private fb: FormBuilder) {
    this.answerForm = this.fb.group({
      answer: ['', Validators.required],
      question_id: ['', Validators.required],
      query_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAnswers();
  }

  loadAnswers(): void {
    this.answerService.getAnswers().subscribe(
      data => {
        this.answers = data;
      },
      error => {
        console.error('Error fetching answers', error);
      }
    );
  }

  deleteAnswer(id: number): void {
    this.answerService.deleteAnswer(id).subscribe(
      () => {
        this.loadAnswers();
      },
      error => {
        console.error('Error deleting answer', error);
      }
    );
  }

  addAnswer(): void {
    if (this.answerForm.valid) {
      const newAnswer: Answer = {
        answer_id: 0,
        answer: this.answerForm.value.answer,
        is_correct: false,
        question_id: this.answerForm.value.question_id,
        query_id: this.answerForm.value.query_id
      };
      this.answerService.addAnswer(newAnswer).subscribe(
        () => {
          this.loadAnswers();
          this.answerForm.reset();
        },
        error => {
          console.error('Error adding answer', error);
        }
      );
    }
  }

  sortAnswers(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.answers.sort((a, b) => {
      const aValue = a[field as keyof Answer];
      const bValue = b[field as keyof Answer];
      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
}


// import { Component } from '@angular/core';
// import { AnswerService, Answer } from '../answer.service';

// @Component({
//   selector: 'app-answer',
//   imports: [],
//   templateUrl: './answer.component.html',
//   styleUrl: './answer.component.css'
// })
// export class AnswerComponent {
//   answers: Array<Answer> = []
//   newAnswer: Answer = {answer_id: 0, answer: '', is_correct: true, question_id: 0, query_id: 0}; 
//   sortDirection: 'asc' | 'desc' = 'asc';
//   errorMessage: string = '';


//   sortAnswers() {
//     const direction = this.sortDirection === 'asc' ? 1 : -1;
//     this.answers.sort((a: Answer, b: Answer) =>
//       (a.answer_id - b.answer_id) * direction
//     );
//     this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
//   }
//   constructor(private answerService: AnswerService) {}

//   ngOnInit() {
//     this.fetchAnswers();
//   }

//   fetchAnswers() {
//     this.answerService.getAnswers().subscribe(
//       (data) => (this.answers = data),
//       (error) => console.error('Error fetching answers:', error)
//     );
//   }
//   addAnswer(): void {
//     this.answerService.addAnswer(this.newAnswer).subscribe((response) => {
//       console.log(response);
//       this.answers.push(response); 
//       this.newAnswer = {answer_id: 0, answer: '', is_correct: true, question_id: 0, query_id: 0}; 
//     },
//     (error)=>{
//         if (error.status == 400){
//           this.errorMessage = error.error.message;
//         }
//       });
      
//     };

//   deleteAnswer(id: number) {
//     this.answerService.deleteAnswer(id).subscribe(() => {
//       this.answers = this.answers.filter((answer) => answer.answer_id !== id);
//     });
//   }

// }


