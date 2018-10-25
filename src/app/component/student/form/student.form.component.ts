import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { Student } from '../../../model/Student';
import { LoggingService } from '../../../service/LoggingService';
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
    
    /* Custom Events */
    @Output()
    private onStudentPhotoUploadedEventEmitter: EventEmitter<{processingStatus: boolean}> = new EventEmitter<{processingStatus: boolean}>();
    @Output()
    private onStudentCreatedEventEmitter: EventEmitter<{newStudent: Student}> = new EventEmitter<{newStudent: Student}>();
    
    /* Properties */
    private studentPhotoPreview;
    private studentPhotoPreviewDisplayed: boolean = false;
    private studentPhotoTempUploadPath: string = '';

    /* Constructor */
    constructor(private loggingService: LoggingService) {
        this.studentDTO = new Student('', '', GenderEnum.FEMALE, '', '');
    }
    
    /* Getters and Setters */
    public setStudentDTO(studentDTO: Student): void {
        this.studentDTO = studentDTO;
    }
    
    public getStudentDTO() : Student {
        return this.studentDTO;
    }
    
    /**
     * Create a new Student
     */
    public onStudentCreated(): void {
        try {
            this.onStudentCreatedEventEmitter.emit({newStudent: this.studentDTO});
            this.studentDTO = new Student('', '', GenderEnum.FEMALE, '', '');
        } catch(exception) {
            this.loggingService.error(exception);
        } finally {
            this.studentPhotoPreview = '';
            this.studentPhotoPreviewDisplayed = false;
        }
    }

    /**
     * Preview Student's Photo
     */
    public onStudentPhotoChanged(event): void {
        let status = {
            processingStatus: true
        }
        this.onStudentPhotoUploadedEventEmitter.emit(status);
        try {
            let studentPhoto = event.target.files[0];
            if (studentPhoto != null) {
                let fileReader = new FileReader();
                fileReader.onload = () => {
                    this.studentPhotoPreview = fileReader.result;
                    this.studentDTO.setPhoto(this.studentPhotoPreview);
                    status.processingStatus = false;
                    this.onStudentPhotoUploadedEventEmitter.emit(status);
                };
                fileReader.readAsDataURL(studentPhoto);
                this.studentPhotoPreviewDisplayed = true;
            } else {
                this.studentDTO.setPhoto('');
                this.studentPhotoPreviewDisplayed = false;
                status.processingStatus = false;
                this.onStudentPhotoUploadedEventEmitter.emit(status);
            }
        } catch(exception) {
            this.studentPhotoPreview = '';
            this.studentPhotoPreviewDisplayed = false;
            this.loggingService.error(exception);
            status.processingStatus = false;
            this.onStudentPhotoUploadedEventEmitter.emit(status);
        } finally {
            this.studentPhotoTempUploadPath = '';
        }
    }
}