#OpenRTB Macro Substitutor#
[![Build Status](https://api.travis-ci.org/Vungle/openrtb-macrosub.svg?branch=master)](https://travis-ci.org/Vungle/openrtb-macrosub)

##Usage##
```js
var sub = require('./openrtb-macrosub');

sub('http://some/crazy/win/URL/{$AUCTION_ID}/{$AUCTION_PRICE}', {id: 'some-id', price: 500});
// This will output 'http://some/crazy/win/URL/some-id/500'.


sub('http://some/URL/needs/{$AUCTION_SEAT_ID}', {seat: 'e$c4p ed'}, true);
// This will output 'http://some/URL/needs/e%24c4p%20ed'.
```

##TODO##
* Support macro encoding.
