import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-async-test',
  templateUrl: './async-test.component.html',
  styleUrls: ['./async-test.component.css'],
})
export class AsyncTestComponent implements OnInit {
  time = new Date().toUTCString();
  isPromiseResolved = false;
  isObservableStarted = false;
  timeAsPromise = new Promise<String>((resolve, reject) => {
    setTimeout(() => {
      resolve(new Date().toUTCString());
      this.isPromiseResolved = true;
    }, 2000);
  });

  timeAsObservable$ = new Observable<String>((observer) => {
    let intervalRef = window.setInterval(() => {
      this.isObservableStarted = true;
      observer.next(new Date().toUTCString());
    }, 1000);
    window.setTimeout(() => {
      window.clearInterval(intervalRef);
      observer.complete();
    }, 5000);
  });

  numbers$ = interval(1000).pipe(
    take(7),
    tap((val) => console.log(val))
  );

  constructor() {}

  ngOnInit() {}
}
