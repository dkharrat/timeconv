var Vue = require('vue');
var Moment = require('moment');
var UnixTime = require('./unixTime');

var init = function() {
  return new Vue({
    el: '#unix-time-converter-form',
    data: {
      dateText: Moment().format(),
      unixTime: UnixTime.now()
    },
    methods: {
      setUnixTimeFromString: function (e) {
        this.unixTime = UnixTime.fromDate(new Date(e));
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
};

module.exports = {
  init: init
};
