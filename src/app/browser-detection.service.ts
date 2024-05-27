import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserDetectionService { // Chrome for example, doesn't support displaying unicode flags

  constructor() {
  }

  isChrome(): boolean {
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  }
}
