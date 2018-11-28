import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  status: BehaviorSubject<string>;

  constructor() {
    this.status = new BehaviorSubject('ready');
  }

  setStatus(status: string) {
    this.status.next(status);
  }
}
