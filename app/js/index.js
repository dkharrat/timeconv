$ = jQuery = require('jquery');
var Bootstrap = require('bootstrap');
var Moment = require('moment');
var Vue = require('vue');
var ZeroClipboard = require('zeroclipboard');
var UnixTime = require('./unixTime');

$(function() {
  var unixTimeClock = new Vue({
    el: '#cur-unix-time',
    data: {
      unixTime: UnixTime.now()
    },
    methods: {
      refresh: function() {
        this.unixTime = UnixTime.now();
      },
      start: function() {
        this.stop();
        this.refresh();
        this.interval = setInterval(this.refresh, 1000);
      },
      stop: function() {
        clearInterval(this.interval);
      }
    },
    ready: function() {
      this.start();

      ZeroClipboard.config({
        hoverClass: 'hover'
      });

      var clip = new ZeroClipboard(document.getElementById('cur-unix-time'));
      clip.on('ready', function(event) {
        $htmlBridge = $('#global-zeroclipboard-html-bridge');
        $htmlBridge.tooltip({
          title:      'Click to copy',
          placement:  'bottom',
          trigger: 'manual',
          container: 'body'
        });

        clip.on('aftercopy', function(client, args){
          $htmlBridge.tooltip('hide');
        });

        $htmlBridge.on('mouseover', function() {
          $(this).tooltip('show');
        });

        $htmlBridge.on('mouseleave', function() {
          $(this).tooltip('hide');
        });
      });
    }
  });

  var unixTimeConverter = new Vue({
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

});

