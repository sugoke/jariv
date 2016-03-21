if (Meteor.isClient) {

Template.registerHelper("isCordova", function () {
    
    if (Meteor.isCordova) { return true  };
    
 
});

BackgroundLocation.options.fetchLocationOnStart = true;


Meteor.startup(function () {
  if (Meteor.isCordova) {
    if (AdMob) {
      AdMob.createBanner( {
        adId: 'ca-app-pub-4293931110825058/1227111928',
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        isTesting: true,
        autoShow: true,
        success: function() {
          console.log("Received ad");
        },
        error: function() {
          console.log("No ad received");
        }
      });
    } else {
      console.log("No Admob");
    }
  } else {
    console.log("No Cordova ");
  }
});

//Only start if this is a cordova project
if (Meteor.isCordova) {
  //Only run commands after cordova has finished device Ready
  Meteor.startup(function() {
  
//Make sure to get at least one GPS coordinate in the foreground before starting background services
navigator.geolocation.getCurrentPosition();
  
    //Configure Plugin
    BackgroundLocation.configure({
      desiredAccuracy: 10, // Desired Accuracy of the location updates (lower = more accurate).
      distanceFilter: 1, // (Meters) Distance between points aquired.
      debug: true, // Show debugging info on device.
      interval: 1000, // (Milliseconds) Requested Interval in between location updates.
      
      //[Android Only Below]
      notificationTitle: 'JARIV', // Customize the title of the notification.
      notificationText: 'Tracking', // Customize the text of the notification.
      fastestInterval: 1000, //(Milliseconds) - Fastest interval OS will give updates.
      useActivityDetection : false // Shuts off GPS when your phone is still, increasing battery life enormously
    });

    //Register a callback for location updates.
    //this is where location objects will be sent in the background
    BackgroundLocation.registerForLocationUpdates(function (location) {
    
      console.log("We got a Background Update" + JSON.stringify(location));
      
      console.log("backgrounded");
      
      followers = trackings.findOne({idlink: idlink}); 
      
      if (followers.followers >= 0 ){
      
 	latLng = {lat: location.latitude, lng: location.longitude}
    
      Meteor.call("updategps", latLng, idlink);
      
  /*  trackings.update({idlink:idlink}, 
	
        {$set: {latitude: location.latitude, longitude: location.longitude}}
        
      );
      
     */ 
      
    }
    
    }, function (err) {
      console.log("Error: Didnt get an update", err);
    });

  /*  //[Android Only]
    //Register a callback for activity updates 
    //If you set the option useActivityDetection to true you will recieve
    //periodic activity updates, see below for more information
    BackgroundLocation.registerForActivityUpdates(function (activities) {
      console.log("We got an activity Update" + activites);
    
     followers = trackings.findOne({idlink: idlink}); 
      
      if (followers.followers >= 0 ){
      
      latLng = {lat: location.latitude, lng: location.longitude}
    
      Meteor.call("updategps", latLng, idlink);
      
    trackings.update({idlink:idlink}, 
	
        {$set: {latitude: location.latitude, longitude: location.longitude}}
        
      );
    }
    
    
    }, function (err) {
      console.log("Error:", err);
    });
    
    */

    //Start the Background Tracker. 
    //When you enter the background tracking will start.
   // BackgroundLocation.start();

    ///later, to stop
   // BackgroundLocation.stop();

  });
}








  Meteor.startup(function() {
    GoogleMaps.load();
  });
  


}