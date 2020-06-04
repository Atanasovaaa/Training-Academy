import { Component, OnInit } from '@angular/core';
import { CourseModel } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { Message } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  courses: Array<CourseModel> = new Array<CourseModel>(0);
  loading: boolean = false;
  msgs: Message[] = [];

  constructor(
    public authService: AuthService,
    public courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses() {
    this.loading = true;
    const userId = this.authService.getUserId();
    this.courseService.getAllCourses(userId).subscribe(
      (res: any) => {
        this.loading = false;
        this.courses = res.courses;
        console.log(this.courses);
      },
      (error) => {
        this.loading = false;
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: 'Error get courses' });
      }
    );
  }
}
