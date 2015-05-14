(function() {
  "use strict";
  var Skeletor = this.Skeletor || {};
  this.Skeletor.Mobile = this.Skeletor.Mobile || new Skeletor.App();
  var app = this.Skeletor.Mobile;

  app.config = null;
  app.requiredConfig = {
    wakeful: {
      url: 'string'
    }
  };

  app.client = null;

  app.init = function() {
    /* CONFIG to read wakeful URL */
    app.loadConfig('../config.json');
    app.verifyConfig(app.config, app.requiredConfig);

    // create Faye client pointing at Wakeful server
    app.client = new Faye.Client(app.config.wakeful.url);

    app.setupClickListeners();

    // subscribe to a channel to receive messages
    app.subscribeToChannel('/foo');
  },

  app.setupClickListeners = function () {
    jQuery('#submit-message').click(function(ev) {
      var message = jQuery('input').val();
      // console.log(message);
      app.client.publish('/foo', {text: message});
    });
  },

  app.subscribeToChannel = function (streamName) {
    var subscription = app.client.subscribe(streamName, function(message) {
      // handle message
      console.log(message);
      var msgList = jQuery('#messages');
      var msgItem = jQuery('<li>'+message.text+'</li>');
      msgList.append(msgItem);
    });

  }

  // this.Skeletor.Mobile = app;
  this.Skeletor = Skeletor;
}).call(this);