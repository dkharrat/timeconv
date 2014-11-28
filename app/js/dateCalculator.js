$ = jQuery = require('jquery');
var Bootstrap = require('bootstrap');
var Vue = require('vue');
var datetimepicker = require('bootstrap-datetimepicker');
var Moment = require('moment');

var init = function() {
  var inputEvent = document.createEvent('HTMLEvents');
  inputEvent.initEvent('input', true, false);

  $('#start-date-picker').datetimepicker();
  // datetimepicker does not fire native JS change events when field changes (so Vue.js updates model), so we have to
  // do it manually
  $('#start-date-picker').on("dp.change",function (e) {
    if ("createEvent" in document) {  // chrome/FF
      $('#start-date-picker input')[0].dispatchEvent(inputEvent);
    } else {  // IE
      $('#start-date-picker input')[0].fireEvent('on' + event.type);
    }
  });

  var inputDateFormat = "YYYY/MM/DD hh:mm a";

  return new Vue({
    el: '#date-calculator-form',
    data: {
      startDate: Moment().format(inputDateFormat),
      op: "+",
      years: 0,
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    },
    methods: {
    },
    computed: {
      resultDate: {
        get: function() {
          var startMoment = Moment(this.startDate, inputDateFormat);
          var dateOp = (this.op == '+') ? 'add' : 'subtract';
          var result = startMoment
            [dateOp](parseInt(this.years), 'year')
            [dateOp](parseInt(this.months), 'months')
            [dateOp](parseInt(this.weeks), 'weeks')
            [dateOp](parseInt(this.days), 'days')
            [dateOp](parseInt(this.hours), 'hours')
            [dateOp](parseInt(this.minutes), 'minutes')
            [dateOp](parseInt(this.seconds), 'seconds');
          return result.format("ddd, MMM Do YYYY, h:mm:ss a (Z)");
        }
      }
    }
  });
};

module.exports = {
  init: init
};
