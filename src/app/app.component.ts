import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  template:  `
  <div class="ui input">
    <input type="text" 
      placeholder="Search employees" 
      name="searchInput"
      value="{{input}}"
      (keydown)="keyDown($event, searchInput.value)" 
      #searchInput/>
  </div>
  <button type="submit" class="ui button" (click)="search(searchInput.value)">Search</button>
  <div class="ui divider"></div>
  <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  input: string;
  private subscription: Subscription;
  constructor(private router: Router, private route: ActivatedRoute){}

  search(input: string): void {
    this.router.navigateByUrl(`search?input=${input}`);
  }

  keyDown(event: KeyboardEvent, input: string) {
    if(event.keyCode === 13)
      this.search(input);
  }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(params=>{
      this.input = params['input'];
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
