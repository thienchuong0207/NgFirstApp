import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from '../../environments/environment';
import { Student } from '../model/Student';
import { LoggingService } from './LoggingService';

@Injectable()
export class ClassService {
    
    /* Properties */
    private students: Student[] = [];
    
    /* Constructor */
    constructor(private http: Http, private loggingService: LoggingService) {}
    
    /* Getters */
    public getAllStudents(): Student[] {
        return this.students;
    }
    
    /**
     * Get Class by Id
     * @param classId
     */
    public getClassById(classId: string): Observable<{id: string, name: string, teacherName: string}> {
        let apiGettingClassById = `${env.backEndApi.url}/class/${classId}`;
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.http.get(apiGettingClassById, {headers: headers}).pipe(map((response: Response) => {
            let data = response.json();
            return data;
        }));
    }

    /**
     * Add new student to Student List
     * @param event
     */
    public addNewStudent(newStudent: Student): boolean {
        this.loggingService.info(`ClassService.onStudentAdded(): adding student ${JSON.stringify(newStudent)}`);
        let isDone: boolean = false;
        try {
            this.students.push(newStudent);
            isDone = true;
            this.loggingService.info("ClassService.onStudentAdded(): DONE");
        } catch(ex) {
            this.loggingService.error(ex);
        }
        return isDone;
    }

    /**
     * Remove a student from Student List
     * @param selectedStudentId 
     */
    public removeStudent(selectedStudentId: string): boolean {
        this.loggingService.info(`ClassService.onStudentRemoved(): deleting student ${selectedStudentId} `);
        let isDone: boolean = false;
        try {
            if (this.students && this.students.length > 0) {
                let index: number = -1;
                this.students.forEach(student => {
                    index++;
                    if (student.getId() === selectedStudentId) {
                        this.students.splice(index, 1);
                        isDone = true;
                    }
                });
            }
            this.loggingService.info("ClassService.onStudentRemoved(): DONE");
        } catch(ex) {
            this.loggingService.error(ex);
        }
        return isDone;
    }
}