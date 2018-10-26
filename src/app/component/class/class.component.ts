import { Component, ViewEncapsulation } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Student as Student } from '../../model/Student';
import { ClassService } from '../../service/ClassService';
import { LoggingService } from '../../service/LoggingService';
import { GenderEnum } from '../../util/GenderEnum';
import { DialogService } from 'ng2-bootstrap-modal';
import { StudentDeletionDialogComponent } from '../student/list/dialog/deletion/student.deletion.dialog.component';
import { StudentDeletionModel } from '../student/list/dialog/deletion/student.deletion.dialog.model';
import { Constants } from 'src/app/util/Constants';
import { timingSafeEqual } from 'crypto';

@Component({
    selector: 'app-class',
    templateUrl: './class.component.html',
    styleUrls: ['./class.component.css'],
    providers: [ClassService],
    encapsulation: ViewEncapsulation.Emulated
})
export class ClassComponent {

    /* Class-related Infomation */
    private id: string = 'C01';
    private name: string = '';
    private teacherName: string = '';

    /* Flag Variable to Determine whether Spinner is Displayed or not */
    private isProcessingSomething: boolean = false;

    /* Student-related Information, also Includes Paginator-related Information */
    private students: Student[] = [];
    private totalStudents: number = 0;
    private currentStudentPage: number = -1;
    private totalStudentPages: number = 0;
    private firstStudentIndex: number = 0;

    /* Display photo of selected student */
    private studentDetailPhoto: string = '';

    /* Dependencies */
    private classService: ClassService;
    private loggingService: LoggingService;
    private dialogService: DialogService;

    /* Constructor */
    constructor(classService: ClassService, loggingService: LoggingService, dialogService: DialogService) {
        this.classService = classService;
        this.loggingService = loggingService;
        this.dialogService = dialogService;
        if (classService) {
            this.isProcessingSomething = true;
            /* Get Class Info */
            this.classService.getClassById(this.id).subscribe(
                (data: {id: string, name: string, teacherName: string}) => {
                    this.name = data.name;
                    this.teacherName = data.teacherName;
                    let page = 0;
                    let size = Constants.STUDENT.NO_OF_STUDENTS_PER_PAGE;
                    this.currentStudentPage = page;
                    /* Load Students List */
                    this.loadStudentsList(page, size);
                },
                (error) => {
                    loggingService.error(error);
                    this.isProcessingSomething = false;
                }
            );
        }
    }

    /**
     * Add new student to Student List
     * @param event: {newStudent: Student}
     */
    public onStudentAdded(event: {newStudent: Student}): void {
        this.isProcessingSomething = true;
        event.newStudent.setClassId(this.id);
        let observable: Observable<Response> = this.classService.addNewStudent(event.newStudent);
        if (observable != null) {
            observable.subscribe((response) => {
                let currentStudentsPerPage = this.students.length;
                if (currentStudentsPerPage == Constants.STUDENT.NO_OF_STUDENTS_PER_PAGE) {
                    this.currentStudentPage++;
                }
                let page = this.currentStudentPage;
                let size = Constants.STUDENT.NO_OF_STUDENTS_PER_PAGE;
                this.loadStudentsList(page, size);
            },
            (error) => {
                this.loggingService.error(error);
                this.isProcessingSomething = false;
            });
        } else {
            this.isProcessingSomething = false;
        }
    }

    /**
     * Remove a student from Student List
     * @param event: {selectedStudent: Student} 
     */
    public onStudentRemoved(event: {selectedStudent: Student}): void {
        if (this.dialogService) {
            let dialogProperties: {display: boolean} = {
                display: true
            };
            let studentDeletionModel: StudentDeletionModel = {
                selectedStudent: event.selectedStudent
            };
            let dialogInputData = {
                dialogProperties: dialogProperties,
                studentDeletionModel: studentDeletionModel
            };
            this.dialogService
                .addDialog(StudentDeletionDialogComponent, dialogInputData)
                .subscribe((isConfirmed) => {
                    if (isConfirmed) {
                        this.isProcessingSomething = true;
                        let observable: Observable<Response> = this.classService.removeStudent(event.selectedStudent.getId());
                        if (observable != null) {
                            observable.subscribe((response) => {
                                this.studentDetailPhoto = '';
                                if (this.students.length == 1) {
                                    this.currentStudentPage--;
                                }
                                let page = this.currentStudentPage < 0 ? 0 : this.currentStudentPage;
                                let size = Constants.STUDENT.NO_OF_STUDENTS_PER_PAGE;
                                this.loadStudentsList(page, size);
                            },
                            (error) => {
                                this.loggingService.error(error);
                                this.isProcessingSomething = false;
                            });
                        } else {
                            this.isProcessingSomething = false;
                        }
                    }
                });
        }
    }

    /**
     * On Processing Something
     * @param event 
     */
    public onProcessingSomething(event) {
        this.isProcessingSomething = event.processingStatus;
    }

    /**
     * On Student Page Change
     * @param event
     */
    public onStudentPageChange(event) {
        let page = event.page;
        let size = event.size;
        if (page != this.currentStudentPage) {
            this.currentStudentPage = page;
            this.isProcessingSomething = true;
            this.loadStudentsList(page, size);
        }
    }

    /**
     * Load a List of Students
     * @param page: Selected Page Index
     * @param size: Number of Students per Page
     */
    private loadStudentsList(page: number, size: number): void {
        this.classService.getStudentsByClassId(this.id, page, size).subscribe((jsonData) => {
            if (jsonData) {
                let shadowStudents = [];
                this.totalStudents = jsonData.total;
                this.totalStudentPages = jsonData.totalPages;
                let returnedStudents = jsonData.students;
                returnedStudents.forEach((returnedStudent: {id: string, name: string, gender: number, photo: string, classId: string}) => {
                    let student: Student = new Student(
                        returnedStudent.id,
                        returnedStudent.name,
                        returnedStudent.gender == 0 ? GenderEnum.FEMALE : GenderEnum.MALE,
                        returnedStudent.photo,
                        returnedStudent.classId
                    );
                    shadowStudents.push(student);
                });
                this.students = shadowStudents;
                this.firstStudentIndex = page * size;
                this.isProcessingSomething = false;
            } else {
                this.totalStudents = 0;
                this.totalStudentPages = 0
                this.students = [];
                this.isProcessingSomething = false;
            }
        }, (error) => {
            this.loggingService.error(error);
            this.isProcessingSomething = false;
        });
    }
}