import { Component, ElementRef, ViewChild } from '@angular/core';
import { reduce } from 'rxjs';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.css'
})
export class GeneratorComponent {
@ViewChild('memeCanvas', { static: false }) myCanvas!: ElementRef<HTMLCanvasElement>;


preview(e: any) {
  if (this.myCanvas && this.myCanvas.nativeElement) {
    let canvas = this.myCanvas.nativeElement;
    let ctx = canvas.getContext('2d');

    let render = new FileReader();
    render.readAsDataURL(e.target.files[0]);

    render.onload = function(event) {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = function() {
        // Calculate the aspect ratio of the image
        const aspectRatio = img.width / img.height;

        // Calculate the dimensions based on the aspect ratio
        let width = img.width;
        let height = img.height;

        // Adjust dimensions to fit within the canvas while maintaining the aspect ratio
        if (width > canvas.width) {
          width = canvas.width;
          height = width / aspectRatio;
        }

        if (height > canvas.height) {
          height = canvas.height;
          width = height * aspectRatio;
        }

        // Center the image on the canvas
        const x = (canvas.width - width) / 2;
        const y = (canvas.height - height) / 2;

        // Draw the image on the canvas
        ctx?.drawImage(img, x, y, width, height);
      };
    };
  }
}

}
