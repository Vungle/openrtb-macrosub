#OpenRTB Macro Substitutor#
[![Build Status](https://api.travis-ci.org/Vungle/openrtb-macrosub.svg?branch=master)](https://travis-ci.org/Vungle/openrtb-macrosub)

##Usage##
```js
var sub = require('./openrtb-macrosub');

sub('http://some/crazy/win/URL/{$AUCTION_ID}/{$AUCTION_PRICE}', {id: 'some-id', price: 500});
// This will output 'http://some/crazy/win/URL/some-id/500'.

```

##TODO##
* Support macro encoding.
* Support encoded/escaped characters.