
var UnixTime = (function() {
  var methods = {
    fromDate: function(date) {
      return Math.round(date.getTime()/1000);
    },
    now: function() {
      return this.fromDate(new Date());
    }
  };
  return methods;
}());

module.exports = UnixTime;
