import { Directive, ElementRef ,Input,Renderer2,HostListener} from '@angular/core';

@Directive({
  selector: '[appChangebg]'
})
export class ChangebgDirective {
  @Input() isCorrect : Boolean = false;
  constructor(private ef:ElementRef , private render:Renderer2) { }
  @HostListener('click') answer(){
    if(this.isCorrect){
      this.render.setStyle(this.ef.nativeElement,'background','green');
    }
  }

}
