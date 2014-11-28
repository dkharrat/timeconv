$ = jQuery = require('jquery');
var UnixTimeClock = require('./unixTimeClock');
var UnixTimeConverter = require('./unixTimeConverter');
var DateCalculator = require('./dateCalculator');

$(function() {

  UnixTimeClock.init(document.getElementById('cur-unix-time'));
  UnixTimeConverter.init();
  DateCalculator.init();

});

