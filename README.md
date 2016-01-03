# bless loader for webpack

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

### API

``` javascript
import "./file.css";
// => will split the CSS files into multiple chunks (upto 4096 selectors) and then add these chunks to link tags with the href attribute being base64 data URI of these chunks
// example: <link type="text/css" rel="stylesheet" id="1d53a8dc7d323c4064a623e0d9acadd5-pace-0" class="blessed-links" href="data:text/css;base64,QGNoYXJzZXQgIlVURi04Ijt...=">
```

### Recommended configuration

``` javascript
{
  module: {
    loaders: [
      { test: /\.css$/, loader: "bless" },
    ]
  }
}
```

## Install

`npm install bless-loader`

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
