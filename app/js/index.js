$ = jQuery = require('jquery');
var UnixTimeClock = require('./unixTimeClock');
var UnixTimeConverter = require('./unixTimeConverter');

$(function() {

  UnixTimeClock.init(document.getElementById('cur-unix-time'));
  UnixTimeConverter.init();

});

