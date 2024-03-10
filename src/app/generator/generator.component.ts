import { Component, ElementRef, ViewChild } from '@angular/core';
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

  if (ctx) {
    ctx.fillStyle = '#000000';
    ctx.font = '50px Comic Sans MS';
    ctx.textAlign = 'center'
    ctx.fillText(this.topText, canvas.width / 2, 100);
    ctx.fillText(this.bottomText, canvas.width / 2, 750);
  }
  
}

}
