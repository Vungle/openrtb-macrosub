'use strict';
var sub = require('../lib/macro-substitutor');

describe('OpenRTB Macro Substitutor', function() {
  describe('in basic substitution', function() {
    it('should process ${AUCTION_ID}', function() {
      sub('${AUCTION_ID}', {id: 'abc'}).should.equal('abc');
      sub('${AUCTION_ID}abc', {id: 'abc'}).should.equal('abcabc');
      sub('${AUCTION_ID}${AUCTION_ID:B64}', {id: 'abc'}).should.equal('abcabc');
      sub('\n\n\n${AUCTION_ID}', {id: '$$'}).should.equal('\n\n\n$$');
    });

    it('should process ${AUCTION_BID_ID}', function() {
      sub('${AUCTION_BID_ID}', {bidid: 'abc'}).should.equal('abc');
      sub('${AUCTION_BID_ID}abc', {bidid: 'abc'}).should.equal('abcabc');
      sub('${AUCTION_BID_ID}${AUCTION_BID_ID:B64}', {bidid: 'abc'}).should.equal('abcabc');
      sub('\n\n\n${AUCTION_BID_ID}', {bidid: '$$'}).should.equal('\n\n\n$$');
    });

    it('should process ${AUCTION_IMP_ID}', function() {
      sub('${AUCTION_IMP_ID}', {impid: 'abc'}).should.equal('abc');
      sub('${AUCTION_IMP_ID}abc', {impid: 'abc'}).should.equal('abcabc');
      sub('${AUCTION_IMP_ID}${AUCTION_IMP_ID:B64}', {impid: 'abc'}).should.equal('abcabc');
      sub('\n\n\n${AUCTION_IMP_ID}', {impid: '$$'}).should.equal('\n\n\n$$');
    });

    it('should process ${AUCTION_SEAT_ID}', function() {
      sub('${AUCTION_SEAT_ID}', {seat: 'abc'}).should.equal('abc');
      sub('${AUCTION_SEAT_ID}abc', {seat: 'abc'}).should.equal('abcabc');
      sub('${AUCTION_SEAT_ID}${AUCTION_SEAT_ID:B64}', {seat: 'abc'}).should.equal('abcabc');
      sub('\n\n\n${AUCTION_SEAT_ID}', {seat: '$$'}).should.equal('\n\n\n$$');
    });

    it('should process ${AUCTION_AD_ID}', function() {
      sub('${AUCTION_AD_ID}', {adid: 'abc'}).should.equal('abc');
      sub('${AUCTION_AD_ID}abc', {adid: 'abc'}).should.equal('abcabc');
      sub('${AUCTION_AD_ID}${AUCTION_AD_ID:B64}', {adid: 'abc'}).should.equal('abcabc');
      sub('\n\n\n${AUCTION_AD_ID}', {adid: '$$'}).should.equal('\n\n\n$$');
    });

    it('should process ${AUCTION_PRICE}', function() {
      sub('${AUCTION_PRICE}', {price: 780}).should.equal('780');
      sub('${AUCTION_PRICE}abc', {price: 780}).should.equal('780abc');
      sub('${AUCTION_PRICE}${AUCTION_PRICE:B64}', {price: 780}).should.equal('780780');
      sub('\n\n\n${AUCTION_PRICE}', {price: 780}).should.equal('\n\n\n780');
    });

    it('should process ${AUCTION_CURRENCY}', function() {
      sub('${AUCTION_CURRENCY}', {cur: 'usd'}).should.equal('usd');
      sub('${AUCTION_CURRENCY}abc', {cur: 'usd'}).should.equal('usdabc');
      sub('${AUCTION_CURRENCY}${AUCTION_CURRENCY:B64}', {cur: 'usd'}).should.equal('usdusd');
      sub('\n\n\n${AUCTION_CURRENCY}', {cur: '$$'}).should.equal('\n\n\n$$');
    });

    it('should ignore encoding for now', function() {
      var valueMap = {price: 10};
      sub('${AUCTION_PRICE:B128}', valueMap)
          .should.equal(sub('${AUCTION_PRICE:B64}', valueMap));
    });

    it('should not process mismatched cases', function() {
      sub('${auction_id}', {id: '123'}).should.equal('${auction_id}');
      sub('${auction_id}${AUCTION_ID}', {id: '123'}).should.equal('${auction_id}123');
    });
  });

  describe('in complicated substitution', function() {
    it('should process inner-most macros', function() {
      sub('${AUCTION_${AUCTION_ID}}', {
        id: 'BID_ID',
        bid: 'abc'
      }).should.equal('${AUCTION_BID_ID}');
    });

    it('should not process a macro that spans multiple lines', function() {
      sub('${AUCTION_\nID}', {id: 'abc'}).should.equal('${AUCTION_\nID}');
    });

    it('should not not process recursive macros', function() {
      sub('${AUCTION_ID}', {
        id: '${AUCTION_BID_ID}',
        bid: 'abc'
      }).should.equal('${AUCTION_BID_ID}');
    });

    it('should process all macros', function() {
      sub('${AUCTION_ID} ${AUCTION_BID_ID}, ${AUCTION_IMP_ID} ${AUCTION_AD_ID} ${AUCTION_SEAT_ID}${AUCTION_PRICE} ${AUCTION_CURRENCY}.',
        {
          id: 'Hello',
          bidid: 'world',
          impid: 'OpenRTB',
          adid: 'will help you',
          seat: 'win $',
          price: 10000,
          cur: 'USD'
        }).should.equal('Hello world, OpenRTB will help you win $10000 USD.');
    });
  });
});
