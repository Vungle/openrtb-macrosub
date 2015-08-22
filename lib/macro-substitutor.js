'use strict';

/**
 * A map whose keys are partial values of the substitution macros defined in
 * OpenRTB 2.3, and values are the keys of the substitution value map. Also, the
 * values are all derived from the property names of various objects defined by
 * the Open RTB spec.
 */
var _MACRO_MAP = {
  'ID': 'id',
  'BID_ID': 'bidid',
  'IMP_ID': 'impid',
  'SEAT_ID': 'seat',
  'AD_ID': 'adid',
  'PRICE': 'price',
  'CURRENCY': 'cur'
};

/** Regex pattern used to grep all the possible macros in a given string. */
var MACRO_PATTERN = new RegExp('\\$\\{AUCTION_(' + Object.keys(_MACRO_MAP).join('|') + ')(:[A-Za-z0-9]+)?\\}', 'g');

/**
 * A standard replacer function for String#replace() method during the macro
 * substitution process.
 *
 * @param {!SubstitutionValueMap} valueMap A map of substitution values.
 * @param {string} matchedMacro Current matched value of the macro.
 * @param {string} macroKey Key of the macro map.
 * @returns {string} Returns the replacement value.
 * @private
 */
var _MACRO_REPLACER = function(valueMap, matchedMacro, macroKey) {
  var valueMapKey = _MACRO_MAP[macroKey];
  return valueMap[valueMapKey] || '';
};


/**
 * Given a template that may contains macros specified in Open RTB 2.3, this
 * method will find and replaces macros with values defined in the a the map.
 *
 * @param {string} template Template whose macros will be substituted.
 * @param {!SubstitutionValueMap} valueMap A map of substitution values.
 * @param {boolean=} opt_shouldEncode Optional boolean flag to indicate whether
 *     the values in the substitution value map should be URI encoded.
 * @return {string} Returns fully substituted string, or throw in case of error.
 */
module.exports = function(template, valueMap, opt_shouldEncode) {
  var newValueMap = {};

  if (opt_shouldEncode) {
    for (var key in valueMap) {
      newValueMap[key] = encodeURIComponent(valueMap[key]);
    }
  } else {
    newValueMap = valueMap;
  }

  return template.replace(
      MACRO_PATTERN,
      _MACRO_REPLACER.bind(null, newValueMap));
};


/**
 * @typedef {{
 *   id: string=,
 *   bidid: string=,
 *   impid: string=,
 *   seat: string=,
 *   adid: string=,
 *   price: number=,
 *   cur: string=
 * }} SubstitutionValueMap A map of substitution values whose keys represent
 * partially the macro to be replaced, and its values represent the values of
 * the corresponding macro replacement.
 */