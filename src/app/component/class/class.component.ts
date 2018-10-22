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
            /* Get Class Info */
            this.classService.getClassById(this.id).subscribe(
                (data: {id: string, name: string, teacherName: string}) => {
                    this.name = data.name;
                    this.teacherName = data.teacherName;
                },
                (error) => {
                    loggingService.error(error);
                }
            );
            /* Get List of Students */
            this.classService.getStudentsByClassId(this.id).subscribe((returnedStudents: {id: string, name: string, gender: number, photo: string, classId: string}[]) => {
                if (returnedStudents != null && returnedStudents.length > 0) {
                    returnedStudents.forEach((returnedStudent: {id: string, name: string, gender: number, photo: string, classId: string}) => {
                        let student: Student = new Student(
                            returnedStudent.id,
                            returnedStudent.name,
                            returnedStudent.gender == 0 ? GenderEnum.FEMALE : GenderEnum.MALE,
                            returnedStudent.photo,
                            returnedStudent.classId  
                        );
                        this.students.push(student);
                    })
                }
            }, (error) => {
                this.loggingService.error(error)
            });
        }
    }

    /**
     * Add new student to Student List
     * @param event
     */
    public onStudentAdded(event: {newStudent: Student}): void {
        
        event.newStudent.setClassId(this.id);
        let observable: Observable<Response> = this.classService.addNewStudent(event.newStudent);
        if (observable != null) {
            observable.subscribe((response) => {
                this.students.push(event.newStudent);
            },
            (error) => {
                this.loggingService.error(error);
            });
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
                            },
                            (error) => {
                                this.loggingService.error(error)
                            });
                        }
                    }
                });
        }
    }
}