import { Component, HostListener, Renderer, ElementRef } from '@angular/core';
import { ConnectionService } from 'ng-connection-service'
import { BaseComponent } from './helper/BaseComponent';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent {
  status = '';
  isConnected: boolean = true;
  GetLocalStorageItem() {
    const localstoragedata = localStorage.getItem('appkey');
    this.localcontent = JSON.parse(localstoragedata);
  }
  constructor(private _connSer: ConnectionService,private el: ElementRef,private renderer:Renderer) {
    super();
    this._connSer.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (isConnected) {
        this.status = "Internet is Connected";
      }
      else {
        this.status = "Internet Disconnected";
        this.isConnected = false;
      }
    })
  }

//   @HostListener('click', ['$event']) onclick(event: Event) {
//     debugger;
//     alert(event);
//   }
//   @HostListener('document:keydown.esc', ['$event']) oncclick(event: Event) {
//     debugger;
//     alert(event.srcElement);
//   }
//   @HostListener('document:keyup.enter') onKeyUp() {
//     alert('S');
    
//   }

//   // @HostListener('onMouse') onKeyUp() {
//   //   alert('S');
    
//   // }
//   @HostListener('mouseover') onMouseOver() {
//     this.ChangeBgColor('green');
// }

// @HostListener('click') onClick() {
//     window.alert('Host Element Clicked');
// }
// @HostListener('mouseleave') onMouseLeave() {
//     this.ChangeBgColor('black');
// }

// @HostListener('mousehover') onMouseHover() {
//   this.ChangeBgColor('red');
// }
// ChangeBgColor(color: string) {
 
//   this.renderer.setElementStyle(this.el.nativeElement, 'color', color);
// }
 
}
