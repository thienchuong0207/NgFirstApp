import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Student } from '../../../model/Student';

@Component({
    selector: 'app-student-list',
    templateUrl: './student.list.component.html',
    styleUrls: ['./student.list.component.css'],
    encapsulation: ViewEncapsulation.Emulated
})
export class StudentListComponent {

    /* Properties */
    @Input('students')
    private students: Student[] = [];
    
    @Output()
    private onStudentRemovedEventEmitter: EventEmitter<{removedStudentId: number}> = new EventEmitter<{removedStudentId: number}>();

    /* Function - Remove a student */
    public onStudentRemoved(studentId: number): void {
        let data = {
            removedStudentId: studentId
        };
        this.onStudentRemovedEventEmitter.emit(data);
    }
}