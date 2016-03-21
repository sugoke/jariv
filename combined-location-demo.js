if (Meteor.isClient) {
  // counter starts at 0
  Session.set("isTracking", false);

  /*Template.tracking.helpers({
    isTracking: function () {
      return Session.get("isTracking");
    }
  });

  Template.tracking.events({
    'click button': function () {
      var isTracking = Session.get('isTracking');

      if(!isTracking) {
        //This is where all the location updates get handed back, whether its the foreground or background.
        CombinedLocation.startWatching(function(location) {
          console.log("Got a new location from the foreground / background tracker", location);
        })
      } else {
        CombinedLocation.stopWatching();
      }

      Session.set('isTracking', !Session.get('isTracking') );
    }
  });

  */
}