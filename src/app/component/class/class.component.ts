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

@Component({
    selector: 'app-class',
    templateUrl: './class.component.html',
    styleUrls: ['./class.component.css'],
    providers: [ClassService],
    encapsulation: ViewEncapsulation.Emulated
})
export class ClassComponent {

    /* Properties */
    private id: string = 'C01';
    private name: string = '';
    private teacherName: string = '';
    private students: Student[] = [];
    private totalStudents: number = 0;
    private isProcessingSomething: boolean = false;

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
                     /* Get List of Students */
                    this.classService.getStudentsByClassId(this.id, 0, Constants.STUDENT.NO_OF_STUDENTS_PER_PAGE).subscribe((jsonData) => {
                        if (jsonData && jsonData.total > 0) {
                            this.totalStudents = jsonData.total;
                            let returnedStudents = jsonData.students;
                            returnedStudents.forEach((returnedStudent: {id: string, name: string, gender: number, photo: string, classId: string}) => {
                                let student: Student = new Student(
                                    returnedStudent.id,
                                    returnedStudent.name,
                                    returnedStudent.gender == 0 ? GenderEnum.FEMALE : GenderEnum.MALE,
                                    returnedStudent.photo,
                                    returnedStudent.classId  
                                );
                                this.students.push(student);
                            });
                            this.isProcessingSomething = false;
                        } else {
                            this.isProcessingSomething = false;
                        }
                    }, (error) => {
                        this.loggingService.error(error);
                        this.isProcessingSomething = false;
                    });
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
     * @param event
     */
    public onStudentAdded(event: {newStudent: Student}): void {
        this.isProcessingSomething = true;
        event.newStudent.setClassId(this.id);
        let observable: Observable<Response> = this.classService.addNewStudent(event.newStudent);
        if (observable != null) {
            observable.subscribe((response) => {
                this.students.push(event.newStudent);
                this.isProcessingSomething = false;
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
     * @param selectedStudentId 
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
                                let index = -1;
                                let count = -1;
                                this.students.forEach((student) => {
                                    count++;
                                    if (student.getId() === event.selectedStudent.getId()) {
                                        index = count;
                                    }
                                });
                                this.students.splice(index, 1);
                                this.studentDetailPhoto = '';
                                this.isProcessingSomething = false;
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
        this.isProcessingSomething = true;
        let page = event.page;
        let size = event.size;
        this.classService.getStudentsByClassId(this.id, page, size).subscribe((jsonData) => {
            if (jsonData && jsonData.total > 0) {
                this.students = [];
                this.totalStudents = jsonData.total;
                let returnedStudents = jsonData.students;
                returnedStudents.forEach((returnedStudent: {id: string, name: string, gender: number, photo: string, classId: string}) => {
                    let student: Student = new Student(
                        returnedStudent.id,
                        returnedStudent.name,
                        returnedStudent.gender == 0 ? GenderEnum.FEMALE : GenderEnum.MALE,
                        returnedStudent.photo,
                        returnedStudent.classId  
                    );
                    this.students.push(student);
                });
                this.isProcessingSomething = false;
            } else {
                this.isProcessingSomething = false;
            }
        }, (error) => {
            this.loggingService.error(error);
            this.isProcessingSomething = false;
        });
    }
}