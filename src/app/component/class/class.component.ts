import { Component, ViewEncapsulation } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Student as Student } from '../../model/Student';
import { ClassService } from '../../service/ClassService';
import { LoggingService } from '../../service/LoggingService';
import { GenderEnum } from '../../util/GenderEnum';

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

    /* Constructor */
    constructor(classService: ClassService, loggingService: LoggingService) {
        
        this.classService = classService;
        this.loggingService = loggingService;
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
    public onStudentAdded(event: { newStudent: Student }): void {
        
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
    public onStudentRemoved(event: { removedStudentId: string }): void {
        
        let observable: Observable<Response> = this.classService.removeStudent(event.removedStudentId);
        if (observable != null) {
            observable.subscribe((response) => {
                let index = -1;
                let count = -1;
                this.students.forEach((student) => {
                    count++;
                    if (student.getId() === event.removedStudentId) {
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
}