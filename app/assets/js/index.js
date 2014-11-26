var $ = require('jquery');
var Moment = require('moment');
var Vue = require('vue');

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
      self.elem.innerHTML = UnixTime.now()
    }
    this.start();
  }
  return constructor;
}());

var unixTimeClock = new UnixTimeClock(document.getElementById("cur-unix-time"));

$(function() {
  $("#cur-unix-time")
    .mouseenter(function() {
      unixTimeClock.stop();
    })
    .mouseleave(function() {
      unixTimeClock.start();
    });

  var unixTimeConverter = new Vue({
    el: '#unix-time-converter-form',
    data: {
      dateText: Moment().format(),
      unixTime: UnixTime.now()
    },
    methods: {
      setUnixTimeFromString: function (e) {
        this.unixTime = UnixTime.fromDate(Moment(e).toDate());
      },
      refreshUnixTime: function (e) {
        this.unixTime = UnixTime.now();
      }
    },
    computed: {
      utcTime: {
        get: function() {
          return Moment.utc(parseInt(this.unixTime, 10)*1000).format('YYYY-MM-DD HH:mm:ss Z');
        }
      },
      localTime: {
        get: function() {
          return Moment(parseInt(this.unixTime, 10)*1000).format('ddd, MMM Do YYYY, HH:mm:ss (h:mm:ss a)');
        }
      }
    }
  });
});

