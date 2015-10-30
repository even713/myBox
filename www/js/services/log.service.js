angular.module('myBox.services.log', [])

  .factory("clog", function(){
    var level = "log";//log
    var log;
    if(level == "alert")
      log = window.alert;
    else {
      log = console
    }
    return {
      log: function(){
        //log.log.apply(window, arguments);
      },
      error: function(){
        //log.error.apply(window, arguments);
      }
    }
  });
