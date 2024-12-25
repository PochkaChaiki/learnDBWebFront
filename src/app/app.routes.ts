import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { QuestionComponent } from './question/question.component';
import { AnswerComponent } from './answer/answer.component';
import { QueryComponent } from './query/query.component'; 
import { MainComponent } from './main/main.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: 'login', component: AuthComponent },
    { path: 'questions', redirectTo: '/main/questions' },
    { path: 'answers', redirectTo: '/main/answers' },
    { path: 'query', redirectTo: '/main/query' },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { 
        path: 'main', 
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            { path: 'questions', component: QuestionComponent },
            { path: 'answers', component: AnswerComponent },
            { path: 'query', component: QueryComponent },
            // { path: '', redirectTo: '/questions', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }