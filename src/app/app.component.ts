import { Component, ViewEncapsulation, Inject, HostListener } from '@angular/core';
import { StorageService, isStorageAvailable, LOCAL_STORAGE} from 'angular-webstorage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent {

  title = 'app';

  constructor(@Inject(LOCAL_STORAGE) private storageService: StorageService) {}

  @HostListener('window:unload', ['$event'])
  onWindowUnload() {
    if (isStorageAvailable(localStorage) && localStorage.length > 0) {
      localStorage.clear();
    }
  }
}
