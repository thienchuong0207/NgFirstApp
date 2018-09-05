import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
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
    private onStudentRemovedEventEmitter: EventEmitter<{removedStudentId: string}> = new EventEmitter<{removedStudentId: string}>();

    /**
     * Remove a Student
     * @param studentId
     */
    public onStudentRemoved(studentId: string): void {
        let data = {
            removedStudentId: studentId
        };
        this.onStudentRemovedEventEmitter.emit(data);
    }
}