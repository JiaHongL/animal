import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamic-Loading]'
})
export class LoadingDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
