import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from '../../environments/environment';
import { Student } from '../model/Student';
import { LoggingService } from './LoggingService';

@Injectable()
export class ClassService {
    
    /* Constructor */
    constructor(private http: Http, private loggingService: LoggingService) {}
    
    /**
     * Get Class by Id
     * @param classId
     */
    public getClassById(classId: string): Observable<{id: string, name: string, teacherName: string}> {

        let gettingClassByIdAPI = `${env.backEndApi.url}/class/${classId}`;
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.http.get(gettingClassByIdAPI, {headers: headers}).pipe(map((response: Response) => {
            let data = response.json();
            return data;
        }));
    }

    /**
     * Get Students by Class Id
     * @param classId
     */
    public getStudentsByClassId(classId: string): Observable<[]> {
        
        let gettingStudentsByClassIdAPI = `${env.backEndApi.url}/student?classId=${classId}`;
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.http.get(gettingStudentsByClassIdAPI, {headers: headers}).pipe(map((response: Response) => {
            let data = response.json();
            return data;
        }));
    }

    /**
     * Add new student to Student List
     * @param event
     */
    public addNewStudent(newStudent: Student): Observable<Response> {
        
        let observable: Observable<Response> = null;
        try {
            let requestBody = JSON.stringify({
                id: newStudent.getId(),
                name: newStudent.getName(),
                gender: newStudent.getGenderValue(),
                photo: null,
                classId: newStudent.getClassId()
            });
            let studentAddingAPI = `${env.backEndApi.url}/student`;
            let headers = new Headers({
                'Content-Type': 'application/json'
            });
            observable = this.http.post(studentAddingAPI, requestBody, {headers: headers});
        } catch(ex) {
            this.loggingService.error(ex);
        }
        return observable;
    }

    /**
     * Remove a student from Student List
     * @param selectedStudentId 
     */
    public removeStudent(selectedStudentId: string): Observable<Response> {
        
        let observable: Observable<Response> = null;
        try {
            if (selectedStudentId) {
                let studentDeletingAPI = `${env.backEndApi.url}/student/${selectedStudentId}`;
                observable = this.http.delete(studentDeletingAPI);
            }
        } catch(ex) {
            this.loggingService.error(ex);
        }
        return observable;
    }
}