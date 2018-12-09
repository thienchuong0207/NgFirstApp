import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { StudentDeletionModel } from './student.deletion.dialog.model';

@Component({
    selector: 'app-student-deletion-dialog',
    templateUrl: './student.deletion.dialog.component.html',
    styleUrls: ['./student.deletion.dialog.component.css'],
    encapsulation: ViewEncapsulation.Emulated
})
export class StudentDeletionDialogComponent extends DialogComponent<any, any> implements OnInit {

    /* Dialog Input Data */
    public dialogProperties: {display: boolean} = {display: false}
    public studentDeletionModel: StudentDeletionModel = null;

    /* OnInit */
    public ngOnInit() {
        if (!this.studentDeletionModel) {
            this.close();
        }
    }

    /* Constructor --> Need to inject DialogService to be able to receive input data when opening dialog */
    constructor(dialogService: DialogService) {
        super(dialogService);
    }

    /* User Selection Processing */
    public onYes(): void {
        this.result = true;
        this.close();
    }

    public onNo(): void {
        this.close();
    }
}