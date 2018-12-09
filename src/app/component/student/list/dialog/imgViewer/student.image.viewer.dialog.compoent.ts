import { Component, ViewEncapsulation } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

/**
 * Student Image Viewer - Dialog
 */
@Component({
    selector: 'app-student-image-viewer-dialog',
    templateUrl: './student.image.viewer.dialog.component.html',
    styleUrls: ['./student.image.viewer.dialog.component.css'],
    encapsulation: ViewEncapsulation.Emulated
})
export class StudentImageViewerDialogComponent extends DialogComponent<any, any> {

    /* Dialog Properties */
    public dialogProperties: {display: boolean} = {
        display: false
    }

    /* Dialog Input Data */
    public dialogInputData: {imageDataURL: string} = {
        imageDataURL: null
    }

    /* Constructor */
    constructor(dialogService: DialogService) {
        super(dialogService);
    }

    public onClose(): void {
        this.close();
    }
}