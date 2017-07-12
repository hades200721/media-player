import {
    Directive,
    OnInit,
    EventEmitter,
    HostListener,
    ElementRef,
    Input,
    Output
} from '@angular/core';

@Directive({
    selector: '[draggable]'
})
export class Draggable implements OnInit {

    dragStart: boolean = false;
    mousedrag: any;

    previousPosition: any;
    mouseup = new EventEmitter();
    mousedown = new EventEmitter();
    @Output() onDrag = new EventEmitter();

    @Input('draggable') draggableConfig: any;

    @HostListener('mousedown', ['$event'])
    onMousedown(event: MouseEvent) {
        this.previousPosition = { x: event.clientX, y: event.clientY };
        this.dragStart = true;
        this.mousedown.emit(event);
    }

    @HostListener('mousemove', ['$event'])
    onMousemove(event) {
        if (this.dragStart) {
            event.deltaX = event.clientX - this.previousPosition.x;
            event.deltaY = event.clientY - this.previousPosition.y;
            this.previousPosition = { x: event.clientX, y: event.clientY };
            this.onDrag.emit(event);
        }
    }

    @HostListener('document:mouseup', ['$event'])
    onMouseup(event: MouseEvent) {
        if (this.dragStart) {
            this.dragStart = false;
            this.mouseup.emit(event);
        }
    }

    constructor(public element: ElementRef) {

        this.mousedrag = this.mousedown.map(
            (event: MouseEvent) => {
                return {
                    left: event.clientX - this.element.nativeElement.getBoundingClientRect().left,
                    top: event.clientY - this.element.nativeElement.getBoundingClientRect().top
                };
            })
            .flatMap(
            imageOffset => this.onDrag.map(
                (pos: MouseEvent) => ({
                    top: pos.clientY - this.element.nativeElement.getBoundingClientRect().top - imageOffset.top,
                    left: pos.clientX - this.element.nativeElement.getBoundingClientRect().left - imageOffset.left
                }))
                .takeUntil(this.mouseup)
            );
    }

    ngOnInit() {

        // this.mousedrag.subscribe({
        //     next: pos => {
        // if (this.axisAllow === 'xy') {
        //     this.elm.style.top = pos.top + 'px';
        //     this.elm.style.left = pos.left + 'px';
        // } else {
        //     if (this.axisAllow === 'y') {
        //         this.elm.style.top = pos.top + 'px';
        //     } else {
        //         if (this.axisAllow === 'x') {
        //             this.elm.style.left = pos.left + 'px';
        //         }
        //     }
        // }
        //     }
        // });
    }
}