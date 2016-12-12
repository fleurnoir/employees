import { EventEmitter } from '@angular/core'; 

export class Lazy<T> {
  private loaded: boolean;
  private waiters: EventEmitter<T>;
  private result: T;

  constructor(private readonly getValueFn: ()=>Promise<T>) {
  }

  getValue(handler: (result: T)=>void): void {
    if(this.loaded)
      handler(this.result);
    else if(this.waiters)
      this.waiters.subscribe(handler);
    else {
      this.waiters = new EventEmitter<T>();
      this.waiters.subscribe(handler);
      this.getValueFn().then(
        result=>this.resolve(result), 
        error=>{
          console.log(error);
          this.resolve(undefined);
        })
    }
  }

  private resolve(result: T) {
    this.loaded = true;
    this.result = result;
    this.waiters.emit(result);
    this.waiters = null;
  }
}