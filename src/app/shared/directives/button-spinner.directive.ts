import {Directive, ElementRef, Input, OnInit} from '@angular/core';


@Directive({
  selector: '[buttonSpinner]',
})
export class ButtonSpinnerDirective implements OnInit {

  private originalElement: Element;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.originalElement = this.elementRef.nativeElement.cloneNode(true);
  }

  @Input('buttonSpinner') set showSpinner (showSpinner: boolean) {
    if (showSpinner && showSpinner !== undefined) {
      setTimeout(() => {
        this.elementRef.nativeElement.innerHTML = '<img src="./assets/icons/loading_spinner.gif" height="20px" wdith="20px">';
        this.elementRef.nativeElement.disabled = true;
      }, 150);
    } else if (this.originalElement) {
      this.elementRef.nativeElement.innerHTML = this.originalElement.innerHTML;
      this.elementRef.nativeElement.disabled = false;
    }
  }

}
