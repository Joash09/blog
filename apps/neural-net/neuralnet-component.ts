import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { tidy, browser } from '@tensorflow/tfjs';
import { setWasmPaths } from '@tensorflow/tfjs-backend-wasm';
import { loadLayersModel } from '@tensorflow/tfjs-layers';

import { mapping } from './assets/mapping';

// const tf = require('@tensorflow/tfjs');
// const wasmSimdPath = require('./node_modules/@tensorflow/tfjs-backend-wasm/dist/tfjs-backend-wasm-simd.wasm');
// const wasmSimdThreadedPath = require('./node_modules/@tensorflow/tfjs-backend-wasm/dist/tfjs-backend-wasm-threaded-simd.wasm');
// const wasmPath = require('./node_modules/@tensorflow/tfjs-backend-wasm/dist/tfjs-backend-wasm.wasm');

@customElement('neural-network-app')
export class NeuralNetworkApp extends LitElement {

    @property() accessor prediction = '...';
    isDragging = false;
    model: any;

    constructor() {
        super();
        this.addEventListener('mousedown', (e: MouseEvent) => this.isDragging = true);
        this.addEventListener('mouseup', (e: MouseEvent) => this.isDragging = false);
    }

    connectedCallback() {
        super.connectedCallback()
        // setWasmPaths({
        //     'tfjs-backend-wasm.wasm': wasmPath,
        //     'tfjs-backend-wasm-simd.wasm': wasmSimdPath,
        //     'tfjs-backend-wasm-threaded-simd.wasm': wasmSimdThreadedPath
        // });
        // (async () => {
        //     await tf.setBackend('wasm');
        //     console.log('ok');
        // })();
        this.loadModel();
    }

    loadModel() {

        loadLayersModel('./model.json').then((model: any) => {
            this.model = model as any;
            console.log('Model loaded');
        });
    }

    firstUpdated() {

        const canvas = this.shadowRoot.getElementById('canvas') as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        context.fillStyle = '#000000';
        context.fillRect(0, 0, 280, 280);
    }

    mouseMove(e: MouseEvent) {

        if (!this.isDragging) {
            return;
        }
        // const canvas = e.target as HTMLCanvasElement;
        const canvas = this.shadowRoot.getElementById('canvas') as HTMLCanvasElement;
        const context = canvas.getContext('2d');

        const rect = canvas.getBoundingClientRect();
        const xCanvasOffset = e.offsetX;
        const yCanvasOffset = e.offsetY;
        const xCanvas = e.x - rect.left;
        const yCanvas = e.y - rect.top;

        context.beginPath();
        context.lineWidth = 7;
        context.lineCap = 'round';
        context.strokeStyle = '#FFFFFF';
        context.moveTo(xCanvas, yCanvas);
        context.lineTo(xCanvasOffset, yCanvasOffset);
        context.stroke();
        context.closePath();

    }

    predict() {
        const canvasImg = this.getImageData();
        const pred = tidy(() => {

            let tmpImage = browser.fromPixels(canvasImg);
            tmpImage = tmpImage.mean(2);
            tmpImage = tmpImage.reshape([1, 28, 28]);
            // tmpImage = tf.cast(tmpImage, 'float32')
            // tmpImage = tmpImage.div(255);
            console.log(tmpImage.data())
            const output = this.model.predict(tmpImage) as any;
            const predictions: number[] = Array.from(output.dataSync());
            console.log(predictions);
            this.prediction = String.fromCharCode(mapping[predictions.indexOf(Math.max.apply(Math, predictions))]);
            console.log(this.prediction);

        });
    }

    clearCanvas() {
        const canvas = this.shadowRoot.getElementById('canvas') as HTMLCanvasElement;
        const context = canvas.getContext('2d');

        context.beginPath();
        context.fillStyle = '#000000';
        context.fillRect(0, 0, 280, 280);
        context.closePath();

        this.prediction = '...';
    }

    getImageData(): ImageData {
        const canvas = this.shadowRoot.getElementById('canvas') as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        const tmpImage = context.drawImage(canvas, 0, 0, 28, 28);
        return context.getImageData(0, 0, 28, 28);
    }


    render() {

        return html`
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/picnic">
<canvas
        @mousemove="${this.mouseMove}"
        id="canvas"
        width=280
        height=280
        class="center"
        style="border: 3px solid blue">
</canvas>
<div class="flex center">
        <button @click="${this.predict}" class="success">Predict Text</button>
        <button @click="${this.clearCanvas}" class="warning">Clear</button>
</div>
<br>
<div class="flex center">
    <b>I'm guessing you drew a ${this.prediction}</b>
</div>
        `;
    }

}
