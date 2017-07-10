import { Observable } from 'rxjs/Observable';
export function initObservable() {
    let keys$ = Observable.fromEvent(document, 'keyup')
    .do(
        (keyUp: KeyboardEvent) => {
            // console.log(keyUp.key); 
        }
    );

    keys$.subscribe();

    // fetch('')


}