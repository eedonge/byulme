define(function() {

  "use strict";

  var console = window.console || {log:function(){}};

  var exports = {
    version: "0.1.0",
    author: "eedonge"
  };

  exports.log = function() {
    var args = Array.prototype.unshift.call(arguments, new Date().toLocaleString());
    console.log.apply(console, arguments);
  };

  return exports;

})