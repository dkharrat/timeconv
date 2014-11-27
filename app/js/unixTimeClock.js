$ = jQuery = require('jquery');
var Bootstrap = require('bootstrap');
var Vue = require('vue');
var UnixTime = require('./unixTime');
var ZeroClipboard = require('zeroclipboard');

var init = function(elem) {
  return new Vue({
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

      var clip = new ZeroClipboard(elem);
      clip.on('ready', function(event) {
        $htmlBridge = $('#global-zeroclipboard-html-bridge');
        $htmlBridge.tooltip({
          title:      'Click to copy',
          animation:  false,
          placement:  'bottom',
          trigger:    'manual'
        });

        var showTooltipWithTitle = function(title) {
          return $htmlBridge.attr('title', title)
                            .tooltip('fixTitle')
                            .tooltip('show');
        };

        clip.on('aftercopy', function(client, args){
          showTooltipWithTitle('Copied!');
        });

        $htmlBridge.on('mouseover', function() {
          showTooltipWithTitle('Click to copy');
        });

        $htmlBridge.on('mouseleave', function() {
          $(this).tooltip('hide');
        });
      });
    }
  });
};

module.exports = {
  init: init
};
