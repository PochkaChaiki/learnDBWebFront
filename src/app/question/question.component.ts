import { Component, OnInit } from '@angular/core';
import { QuestionService, Question } from '../question.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  imports: [
    ReactiveFormsModule,
    NgFor
  ],
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questions: Question[] = [];
  questionForm: FormGroup;
  editingQuestion: Question | null = null;

  constructor(private questionService: QuestionService, private fb: FormBuilder) {
    this.questionForm = this.fb.group({
      question_text: ['', Validators.required],
      correct_answer: ['', Validators.required],
      dbsample_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.getQuestions().subscribe(
      data => {
        this.questions = data;
      },
      error => {
        console.error('Error fetching questions', error);
      }
    );
  }

  deleteQuestion(id: number): void {
    this.questionService.deleteQuestion(id).subscribe(
      () => {
        this.loadQuestions();
      },
      error => {
        console.error('Error deleting question', error);
      }
    );
  }

  addQuestion(): void {
    if (this.questionForm.valid) {
      const newQuestion: Question = {
        question_id: 0,
        question_text: this.questionForm.value.question_text,
        correct_answer: this.questionForm.value.correct_answer,
        dbsample_id: this.questionForm.value.dbsample_id
      };
      this.questionService.addQuestion(newQuestion).subscribe(
        () => {
          this.loadQuestions();
          this.questionForm.reset();
        },
        error => {
          console.error('Error adding question', error);
        }
      );
    }
  }

  updateQuestion(): void {
    if (this.questionForm.valid && this.editingQuestion) {
      const updatedQuestion: Question = {
        question_id: this.editingQuestion.question_id,
        question_text: this.questionForm.value.question_text,
        correct_answer: this.questionForm.value.correct_answer,
        dbsample_id: this.questionForm.value.dbsample_id
      };
      this.questionService.updateQuestion(updatedQuestion).subscribe(
        () => {
          this.loadQuestions();
          this.questionForm.reset();
          this.editingQuestion = null;
        },
        error => {
          console.error('Error updating question', error);
        }
      );
    }
  }

  editQuestion(question: Question): void {
    this.editingQuestion = question;
    this.questionForm.patchValue(question);
  }  
}