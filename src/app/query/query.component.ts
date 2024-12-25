import { Component, OnInit } from '@angular/core';
import { QueryService, Query } from '../query.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  imports: [
    ReactiveFormsModule,
    NgFor
  ],
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {
  queries: Query[] = [];
  queryForm: FormGroup;

  constructor(private queryService: QueryService, private fb: FormBuilder) {
    this.queryForm = this.fb.group({
      script: ['', Validators.required],
      db_id: ['', Validators.required],
      user_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadQueries();
  }

  loadQueries(): void {
    this.queryService.getQueries().subscribe(
      data => {
        this.queries = data;
      },
      error => {
        console.error('Error fetching queries', error);
      }
    );
  }


  addQuery(): void {
    if (this.queryForm.valid) {
      const newQuery: Query = {
        query_id: 0,
        script: this.queryForm.value.script,
        info: '',
        executed_at: new Date().toISOString(),
        user_id: this.queryForm.value.user_id,
        db_id: this.queryForm.value.db_id
      };
      this.queryService.addQuery(newQuery).subscribe(
        () => {
          this.loadQueries();
          this.queryForm.reset();
        },
        error => {
          console.error('Error adding query', error);
        }
      );
    }
  }
}


// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-query',
//   imports: [],
//   templateUrl: './query.component.html',
//   styleUrl: './query.component.css'
// })
// export class QueryComponent {

// }
