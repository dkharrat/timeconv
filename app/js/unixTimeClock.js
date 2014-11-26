var UnixTime = require('./unixTime');

var UnixTimeClock = (function() {
  var constructor = function (_elem) {
    var self = this;
    var unixTimeUpdater;
    this.elem = _elem;

    this.start = function() {
      this.stop();
      this.refresh();
      unixTimeUpdater = setInterval(this.refresh, 1000);
    };

    this.stop = function() {
      clearInterval(unixTimeUpdater);
    };

    this.refresh = function() {
      self.elem.innerHTML = UnixTime.now();
    };
    this.start();
  };
  return constructor;
}());

module.exports = UnixTimeClock;
