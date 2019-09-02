import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[controlWidgetToggle]'
})
export class ControlWidgetToggleDirective
{
    /**
     * Constructor
     *
     * @param {ElementRef} elementRef
     */
    constructor(
        public elementRef: ElementRef
    )
    {
    }
}
