import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Student } from '../../../model/Student';
import { Constants } from 'src/app/util/Constants';

@Component({
    selector: 'app-student-list',
    templateUrl: './student.list.component.html',
    styleUrls: ['./student.list.component.css'],
    encapsulation: ViewEncapsulation.Emulated
})
export class StudentListComponent {

    /* Properties */
    private filteredByName: string = '';
    private pageSize: number = 6;
    
    @Input('totalStudents')
    private totalStudents: number = 0;

    @Input('students')
    private students: Student[] = [];

    @Output()
    private onPageChangeEventEmitter: EventEmitter<{page: number, size: number}> = new EventEmitter<{page: number, size: number}>();
    
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

    /**
     * Check whether Paginator is Displayed or not
     */
    public isPaginatorDisplayed(): boolean {
        let isDisplayed = false;
        if (Math.ceil(this.totalStudents / this.pageSize) > 1) {
            isDisplayed = true;
        }
        return isDisplayed;
    }

    /**
     * On Page Change Event
     * @param event
     */
    public onPageChange(event): void {
        let page = event.page;
        let size = Constants.STUDENT.NO_OF_STUDENTS_PER_PAGE;
        let data = {
            page: page,
            size: size
        }
        this.onPageChangeEventEmitter.emit(data);
    }
}