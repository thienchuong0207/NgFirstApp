import { Component, ViewEncapsulation, OnDestroy, Inject } from '@angular/core';
import { StorageService, isStorageAvailable, LOCAL_STORAGE} from 'angular-webstorage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent implements OnDestroy {

  title = 'app';

  constructor(@Inject(LOCAL_STORAGE) private storageService: StorageService) {}

  /**
   * OnDestroy: Clear all Keys in Local Storage
   */
  ngOnDestroy() {
    if (isStorageAvailable(localStorage) && localStorage.length > 0) {
      localStorage.clear();
    }
  }
}
