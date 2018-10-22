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
    private filteredByName: string = '';
    
    @Input('students')
    private students: Student[] = [];

    @Output()
    private onStudentRemovedEventEmitter: EventEmitter<{selectedStudent: Student}> = new EventEmitter<{selectedStudent: Student}>();

    /**
     * Remove a Student
     * @param student
     */
    public onStudentRemoved(student: Student): void {
        
        let data = {
            selectedStudent: student
        };
        this.onStudentRemovedEventEmitter.emit(data);
    }

    /**
     * Filter Students by Name
     * @param event
     */
    public onStudentsFilteredByName(value): void {
        this.filteredByName = value;
    }
}