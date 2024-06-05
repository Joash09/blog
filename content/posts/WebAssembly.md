+++
title = "Porting my Lisp Interpreter (written in C) to WebAssembly"
author = ["Joash Naidoo"]
date = 2022-07-12T00:00:00+02:00
tags = ["WebAssembly", "Emscripten", "Web"]
draft = false
math = "True"
+++

You wont go long in web development before you hear of WebAssembly (WASM) and the performance benefits it brings to web applications. Additionally, and known to a lesser extent, WebAssembly also provides an avenue for increasing the portability to existing code bases, similarly to Docker, given WebAssembly's wide availability and security running in the browser's execution environment. In this post I will evaluate the latter claim for myself.

Writing web assembly starts with the Emscripten project. Emscripten compiles C or C++ to WebAssembly byte code and can be a drop in replacement for GCC. Not too long ago, I wrote a Lisp tutorial with the aid of this [tutorial](https:https://buildyourownlisp.com/contents). The interpreter was written in C. It would be cool if I could showcase it along with my other web app demos. The main function of the interpreter is a simple while loop which prompts the user write "Lisp" code and then evaluates immediately, similarly to running a Python prompt. After evaluation, the program will print the return value or, if an error occurred, the error message. This is not an API project which exposes functions which could be called from the Angular app directly. While this functionality is possible, it something to be investigated later. For now we only want a program with a simple loop which accepts input and returns some processed output.


## Building WebAssembly byte code {#building-webassembly-byte-code}

Installing Emscripten is simple by following the online [documentation](https://emscripten.org/docs/getting_started/downloads.html). To build the project with emcc instead of GCC, I could just replace the CC variable in my Makefile however, it is important to note, Emscripten runs in a sandbox. This means external libraries utilized by the program cannot be dynamically linked since these libraries are not available in the sandbox. This is worth noting since my program dynamically links the readline program (LDFLAGS=-lreadline). A simple solution to begin this journey is to remove the readline dependency and instead use the standard library function "fgets" instead. If the project does have additional dependencies which must be included, there is a mechanism to also convert them into WebAssembly modules. However, we will see later that even if we were able to compile with the readline dependency as a WebAssembly module, we would still need to remove it as a dependency when targeting the browser given the browser's asynchronous behaviour.

Running the emcc compiler, will produce a collection of 3 files:

-   .JS file
-   .WASM file
-   .HTML file

The output .HTML file is to run the application in the web browser and needs to be served with a web server. If you have Python3 you can do this easily with the http.server module.

```bash
source path/to/Emscripten/emsdk_env.sh

emcc prompt.o lval.o mpc.o -o prompt.html # compile everything into a .html file (with embedded js) or .js file

python -m http.server # Run in same directory as prompt.html
```

You'll notice when running the web server, our fgets command gets mapped to the 'window.prompt' method in JavaScript which produces an ugly popup in the browser. Furthermore, the output is only printed after closing the prompt. I address these issues later after porting to Angular.


## Integrating WebAssembly into Angular project {#integrating-webassembly-into-angular-project}

First generate an Angular component for our WebAssembly program to run. Copy the .js and .wasm to a new folder in your assets directory. The Angular component will load the script by creating a HTMLScriptElement and append it to body of the DOM. But before that, we must understand what these .js and .wasm files are.


### Relationship between .js and .wasm files {#relationship-between-dot-js-and-dot-wasm-files}

The .js file is a sort of glue code which will load and run our .wasm for us. The primary structure of the .js file is a Module declaration (declared at the top of the file). The .js file is cleverly designed to allow us to overload some of the Module's properties which effects the behaviour of how the .wasm is run. This is accomplished by first checking to see if any variable with name Module is defined and overload properties where applicable. If no Module variable is defined then it'll create one with default behaviours. For this project the primary interest of the module is to overload the print function, because we don't want to be printing to the browser console but instead have IO implemented with HTML elements.

If you inspected the generated .HTML file you'll see Emscripten provided an example of this already. Before the .js file is loaded with the script tag, another script tag defines a Module object. It overloads the a property print which directs its input to a text area HTML element with id: output. Similar to how we loaded the .js file, I also created a jispy\\_overrides.js file which includes my overrides for the Module.

jispy\\_overrides.js:

```typescript
// Define Module and override print function
var Module = {
  preRun: [],
  postRun: [],
  print: function() {
    var e = document.getElementById("output");
    return e&&(e.value=""), function(t) {
      arguments.length>1 && (t=Array.prototype.slice.call(arguments).join(" ")),
      console.log(t),
      e&&(e.value+=t + "\n", e.scrollTop=e.scrollHeight)
    }
  }()
}
```


### Component Source code {#component-source-code}

In the Angular component responsible for running the WASM application we include the following code to load the jispy_overrides.js and jispy.js files as HTML script elements.

```typescript
import { Component, OnInit, Renderer2, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-jispy',
  templateUrl: './jispy.component.html',
  styleUrls: ['./jispy.component.css']
})
export class JispyComponent implements OnInit {
  constructor(private _render: Renderer2,
              @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit(): void {
    this._loadScript('jispy_overrides');
    this._loadScript('jispy');
  }

  ngOnDestroy(): void {
    this._document.getElementById('jispy_overrides')?.remove();
    this._document.getElementById('jispy')?.remove();
  }

  private _loadScript(name: string) {
    if (this._document.getElementById(name)) { return; }

    let script = this._render.createElement('script') as HTMLScriptElement;
    script.id = name;
    script.type = 'text/javascript';
    script.src = 'assets/jispy/'+name+'.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('Script loaded')
    }
    this._render.appendChild(this._document.body, script);

  }
}
```

Loading our component now should produce the same behaviour as running the .HTML file from earlier. A prompt popup for input and printing to the console for output. Of course it would be nicer if input came from a HTML elements on screen as opposed to using prompt and the output was returned after entering each window.prompt entry. This ended being a non-trivial task.


### Changing default IO behaviours {#changing-default-io-behaviours}

Two things to notice:

-   Output isn't update after every window.prompt entry
-   Why are we using window.prompt to capture input?

Consider, when the WebAssembly is loaded, it runs on the main browser thread. When the WebAssembly program starts running, it blocks the UI rendering steps on screen. Only once the WebAssembly process is finish will the browser get around to updating elements on screen. It is at this point we need to acknowledge that the C program is a synchronous program whereas the web does things asynchronously. When the C program requires input, the entire process halts until the input is provided. If the user only needed to input data once for the program to run, this wouldn't be problematic. However an interpreter continuously relies on user input compounding this problem further. When porting to WASM, the window.prompt command is the only way to achieve synchronous input in the browser. If we wanted input from some other HTML element, we would need to pause the WASM task and allow the main thread to continue with its other responsibilities, such as UI rendering. Only once the user has entered his/her input can we resume the WASM process.

To make our synchronous program behave asynchronously, the Emscripten tool includes a Asyncify feature. Alongside this Enscripten allows us to "inject" JavaScript code which can used to replace the problematic synchronous parts of my C code.

I would like to mention even though I thought this would be a common task (i.e. integrating input), it wasn't particularly clear on how to go about solving the issue. I tried multiple approaches such as Emscripten's now depreciated Emterpreter, overriding Emscripten's File IO stdin, running the WASM on a separate web worker etc. In the end, this was the only approach that worked for me.

We will start by first adding text input component. Alongside this we will define a JavaScript function which create an EventListener on the component and wrap the response of the EventListener in a Promise. This function is how our C program will receive input as opposed to window.prompt.

```javascript
// Wrapping eventlistener in a Promise
var inputElement = document.getElementById('input');
function input_promise() {
  return new Promise((resolve, promise) => {
    inputElement.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        input = inputElement.value;
        resolve(input);
      }
    });
  });
}
```

Now we will "inject" some JavaScript code into our C application. This JavaScript function will replace the synchronous "readline" function. In C we can use MACROS to choose between the implementations depending on our desired target.

Before main function:

```c
#ifndef __EMSCRIPTEN__
#include <editline.h>
#else
#include <Emscripten.h>
EM_ASYNC_JS(char*, web_readline, (), {
        const web_input = await input_promise();
        console.log(web_input);
        const byteCount = (Module.lengthBytesUTF8(web_input)+1);
        const web_inputPointer = Module._malloc(byteCount);
        Module.stringToUTF8(web_input, web_inputPointer, byteCount);
        return web_inputPointer;
    });
#endif
```

Replacement within main function:

```c
while(1) {

    #ifndef __EMSCRIPTEN__
    char* input = readline("jispy > ");
    add_history(input);
    #else
    char* input = web_readline();
    #endif

    // ... process input here
}
```

Finally we can compile with Emscripten with the following flags to get our WASM and .JS files.

```bash
emcc <sources> -o main.wasm \
    -O3 \  # optimizations
    -sASYNCIFY \  # enbale ASYNCIFY
    -sEXPORTED_RUNTIME_METHODS="['lengthBytesUTF8', 'stringToUTF8']"

emcc <sources> -o main.js \
    -O3 \  # optimizations
    -sASYNCIFY \  # enbale ASYNCIFY
    -sEXPORTED_RUNTIME_METHODS="['lengthBytesUTF8', 'stringToUTF8']"
```


## Closing thoughts {#closing-thoughts}

There is a lot of interest surrounding WebAssembly. Since completing this project, I am a little more convinced and excited for the increased portability of software when targeted towards the browser. The addtional work I had to do was specific to integrating C's input/output with the HTML browser elements. I think standalone apps like command line tools or API's which just expose once off methods are the easiest to integrate with WebAssembly. In this example I had to modify my code to integrate with HTML elements but if you just want raw portability you can run your application in a browser runtime just with a terminal. I cannot say anything in terms of the performance benefits of WebAssembly since I didn't profile my application, but I can't notice anything different between running on the browser versus running natively. In the end, this is a pretty cool project and I am now on the lookout for other projects which could be run in the browser.


## Additional Resources {#additional-resources}

-   Loading JavaScript files in Angular: <https://github.com/angular/components/tree/main/src/google-maps#readme>
