import { Pipe, PipeTransform } from '@angular/core';

import { Student } from '../../../model/Student';

/**
 * Students Filter
 */
@Pipe({
    name: 'studentsFilter',
    pure: false
})
export class StudentsFilter implements PipeTransform {

    /**
     * Filter Students by Name
     * @param students
     * @param filterByName 
     */
    public transform(students: Student[], filterByName: string): Student[] {
        let filteredStudents: Student[] = [];
        if (!students || students.length === 0) {
            return students;
        }
        if (!filterByName || filterByName.trim().length === 0) {
            return students;
        }
        students.forEach((student: Student) => {
            if (student.getName().toLowerCase().indexOf(filterByName.toLowerCase()) >= 0) {
                filteredStudents.push(student);
            }
        });
        return filteredStudents;
    }
}