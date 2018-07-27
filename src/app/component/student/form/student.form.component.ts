import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { Student } from '../../../model/Student';
import { GenderEnum } from '../../../util/GenderEnum';

@Component({
    selector: 'app-student-form',
    styleUrls: ['./student.form.component.css'],
    templateUrl: './student.form.component.html',
    encapsulation: ViewEncapsulation.Emulated
})
export class StudentFormComponent {

    /* DTO */
    private studentDTO : Student;
    
    /* Sequence-generated Values  */
    private generatedStudentId: number = 0;
    
    /* Custom Events */
    @Output() private onStudentCreatedEventEmitter = new EventEmitter<{newStudent: Student}>();
    
    /* Properties */
    private studentPhotoPreview;

    /* Constructor */
    constructor() {
        this.studentDTO = new Student(++this.generatedStudentId, '', GenderEnum.FEMALE, null, 0);
    }
    
    /* Getters and Setters */
    public setStudentDTO(studentDTO: Student): void {
        this.studentDTO = studentDTO;
    }
    public getStudentDTO() : Student {
        return this.studentDTO;
    }
    
    /* Functions */
    public onStudentCreated(): void {
        this.onStudentCreatedEventEmitter.emit({newStudent: this.studentDTO});
        this.studentDTO = new Student(++this.generatedStudentId, '', GenderEnum.FEMALE, null, 0);
        this.studentPhotoPreview = '';
    }

    public onStudentPhotoChanged(event): void {
        try {
            let fileReader = new FileReader();
            fileReader.onload = () => {
                this.studentPhotoPreview = fileReader.result;
                this.studentDTO.setPhotoRenderred(this.studentPhotoPreview); 
            };
            fileReader.readAsDataURL(event.target.files[0]);
            this.studentDTO.setPhoto(event.target.files[0]);
        } catch(exception) {
            this.studentPhotoPreview = '';
        }
    }
}