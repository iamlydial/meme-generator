import { Component, ElementRef, ViewChild } from '@angular/core';
import { ColorEvent } from 'ngx-color';
import { reduce } from 'rxjs';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.css'
})
export class GeneratorComponent {
@ViewChild('memeCanvas', { static: false }) myCanvas!: ElementRef<HTMLCanvasElement>;
topText : string = '';
bottomText : string = '';
fileEvent: any;
textColor: string = '#000000';
backgroundColor: string = '#f9f9f9';

preview(e: any) {
  this.fileEvent = e;
  if (this.myCanvas && this.myCanvas.nativeElement) {
    let canvas = this.myCanvas.nativeElement;
    let ctx = canvas.getContext('2d');

    let render = new FileReader();
    render.readAsDataURL(e.target.files[0]);

    render.onload = function (event) {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = function () {
        // Calculate the aspect ratio of the image
        const aspectRatio = img.width / img.height;

        // Calculate the dimensions based on the aspect ratio and desired height
        const desiredHeight = (canvas.height * 0.7); // 70% of the canvas height
        const width = desiredHeight * aspectRatio;
        const height = desiredHeight;

        // Center the image on the canvas
        const x = (canvas.width - width) / 2;
        const y = (canvas.height - height) / 2;

        // Draw the image on the canvas
        ctx?.drawImage(img, x, y, width, height);
      };
    };
  }
}

drawText(){
  let canvas = this.myCanvas.nativeElement;
  let ctx = canvas.getContext('2d');
  
  ctx?.clearRect(0,0,canvas.width, canvas.height);

  this.preview(this.fileEvent);

  // Check if this.fileEvent is defined before calling preview
  if (this.fileEvent) {
    this.preview(this.fileEvent);
  }

  if (ctx) {
    ctx.fillStyle = this.backgroundColor;
    ctx?.fillRect(0,0,canvas.width, canvas.height);
    
    ctx.fillStyle = this.textColor;
    ctx.font = '50px Comic Sans MS';
    ctx.textAlign = 'center'
    ctx.fillText(this.topText, canvas.width / 2, 100);
    ctx.fillText(this.bottomText, canvas.width / 2, 750);
  }
  
}

canvasTextColor($event: ColorEvent){
  this.textColor = $event.color.hex;
  this.drawText();
}

canvasBgColor($event: ColorEvent){
  this.backgroundColor = $event.color.hex;
  this.drawText();
}

}
