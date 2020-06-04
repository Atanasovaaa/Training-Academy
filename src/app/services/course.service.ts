import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL } from '../shared/constants';
import { CourseModel } from '../models/course.model';

@Injectable()
export class CourseService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
  });

  constructor(private http: HttpClient) {}

  getAllCourses(id: number) {
    return this.http.get(`${apiURL}/courses/${id}`, { headers: this.headers });
  }
}
