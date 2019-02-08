# show close up of images (zoom in)


an [AngularJS](http://angularjs.org/) directive to zoom into images.


## Installation

#### using script tag
```html
<script type="text/javascript" src="imgZoom.js"></script>
```

## usage

#### add module "webcam" as dependency
```js
angular.module('myApp', ['imgZoom'])
```

#### add the new element in HTML
```html
<img-zoom src="url"></img-zoom>
```
optional css ```class``` can be passed to the image:
```
<img-zoom src="url" class="'gradient'"></img-zoom>
```
The code is licensed under the MIT License. @see LICENSE file