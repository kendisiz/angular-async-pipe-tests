import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-async-test',
  templateUrl: './async-test.component.html',
  styleUrls: ['./async-test.component.css'],
})
export class AsyncTestComponent implements OnInit {
  time = new Date().toUTCString();
  isPromiseResolved = false;
  timeAsPromise = new Promise<String>((resolve, reject) => {
    setTimeout(() => {
      resolve(new Date().toUTCString());
      this.isPromiseResolved = true;
    }, 2000);
  });

  timeAsObservable = new Observable<String>((observer) => {
    observer.next(new Date().toUTCString());
    observer.complete();
  });

  constructor() {}

  ngOnInit() {}
}
