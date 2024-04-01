import { html, css, LitElement } from 'lit';
import { customElement, eventOptions } from 'lit/decorators.js';
import { instantiateStreaming } from 'asyncify-wasm';

// const jispy_overrides = require('./assets/jispy_overrides.js')
// const wasm_loader = require('./assets/jispy.js')
//var Module = require('./assets/jispy_overrides.js');
//Module = require('./assets/jispy.js');
// import * as Module from './assets/jispy_overrides.js';

@customElement('jispy-interpreter')
export class JipsyInterpreter extends LitElement {


  constructor() {
    super();
  }

  load_overrides() {
    let jispy_overrides = document.createElement('script');
    jispy_overrides.onload = this.onLoad.bind(this);
    jispy_overrides.src = './jispy_overrides.js';
    jispy_overrides.async = true;
    jispy_overrides.defer = true;
    return jispy_overrides;
  }

  load_wasm() {
    let wasm = document.createElement('script');
    wasm.onload = this.onLoad.bind(this);
    wasm.src = './jispy.js';
    wasm.async = true;
    wasm.defer = true;
    return wasm;
  }

  onLoad() {
    console.log('Loaded external script');
  }

  render() {

// <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/picnic">
    return html`
${this.load_overrides()}
${this.load_wasm()}
<textarea id="output" rows="14" style="width: 100%; background: black; color: white;"></textarea>
<input type="text" id="input" style="width: 100%; border: 3px solid blue" placeholder="Type your input here (Hit Enter to evaluate)">
`
  }

  // Creating component not in shadowDOM but in main DOM,
  // so elements are accessible by WASM
  protected createRenderRoot() {
  // createRenderRoot() {
    return this;
  }

}
