import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export interface Student {
  name: string;
  avgGrade: number;
  note?: string;
}

@Component({
  selector: "app-root",
  template: `
    <h1>University App</h1>
    <div>
      <div *ngFor="let student of students$ | async">
        <h2>{{ student.name }}</h2>
        <p>Average Grade: {{ student.avgGrade }}</p>
        <p *ngIf="student.note">{{ student.note }}</p>
      </div>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  students$: Observable<Student[]> | undefined;

  constructor(private readonly httpClient: HttpClient) {}

  ngOnInit(): void {
    this.students$ = this.httpClient.get<Student[]>(
      `${environment.backend}/api/v1/students`
    );
  }
}
