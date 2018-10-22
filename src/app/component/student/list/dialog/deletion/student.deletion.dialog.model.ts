import { Student } from "src/app/model/Student";

/**
 * Student Deletion Model
 */
export class StudentDeletionModel {

    /* Student ID that needs to be deleted */
    public selectedStudent: Student;
    
    constructor(selectedStudent: Student) {
        this.selectedStudent = selectedStudent
    } 
}