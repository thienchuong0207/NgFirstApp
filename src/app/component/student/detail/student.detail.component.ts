import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-student-detail',
    templateUrl: './student.detail.component.html',
    styleUrls: ['./student.detail.component.css']
})
export class StudentDetailComponent {
    /* Properties */
    @Input("studentPhoto") private studentPhoto: string;
}