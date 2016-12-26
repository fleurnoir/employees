import { Observable } from 'rxjs';

export function withLog<T>(observable: Observable<T>): Observable<T> {
  return observable.catch((error, obs)=>{
    console.log(error);
    return Observable.empty<T>();
  });
}
