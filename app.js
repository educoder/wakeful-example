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
    // create Faye client pointing at Wakeful server
    app.client = new Faye.Client('http://coati.encorelab.org:7890/faye');

    app.setupEventHandler();

    // subscribe to a channel to receive messages
    app.subscribeToChannel('/foo');
  },

  app.setupEventHandler = function () {
    jQuery( "#messageForm" ).submit(function( event ) {
      var message = JSON.stringify({text: jQuery('#messageText').val()});
      // console.log(message);
      var publication = app.client.publish('/foo', message);

      publication.then(function() {
        console.log('Message received by server!');
        // clear the input field
        jQuery('#messageText').val('');
      }, function(error) {
        alert('There was a problem: ' + error.message);
      });
      event.preventDefault();
    });
  },

  app.subscribeToChannel = function (streamName) {
    var subscription = app.client.subscribe(streamName, function(jsonMessage) {
      var message = JSON.parse(jsonMessage);
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