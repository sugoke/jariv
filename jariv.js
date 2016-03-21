trackings = new Mongo.Collection("trackings");
stats = new Mongo.Collection("stats");

if (Meteor.isClient) {



////////////////////////////////////////////////////////////////////

Template.slideBox.rendered = function() {
  IonSideMenu.snapper.disable();
};

////////////////////////////////////////////////////////////////////

   Template.index.helpers({
   
  
  
  location: function() {
  
  
  
  
  //var latLng = Geolocation.latLng();
  
  latLng = {lat: location.latitude, lng: location.longitude}
  
  console.log(latLng);
  
  return latLng;
  
  },
  
  
  GPS: function() {
    
    //console.log(Geolocation.error());
    
    //if (Geolocation.error().code == 1) { return true } else { return false }
    
        //return !!Geolocation.error();
        
    //return Geolocation.error();
    
    }

,
   
   
  
   link : function() {

  
  idlink = Session.get('idlink')
  

//var url = "http://jariv.meteor.com/position?idlink=";

 
  //idlink = url.concat(idlink);
  
       if (! idlink)
        return;
        
         if (idlink)
	return idlink

   
  },
  
  });
  
  
 ////////////////////////////////////////////////////////////////////
 
  
  Template.index.events({
  
   'click .fa-question': function(){
  console.log("ok");
  Router.go('/slideBox');
    
  },
  
  'click #stop': function(){
  
  CombinedLocation.stopWatching();
 periodic.stop();
 
  Meteor.call("stop", idlink); 
 Session.set('idlink', null)
    
  },
  
  'click #testsms': function(){
  
  

        var number = "";
       
        var message = "Hi! Follow my position on Jariv by clicking on this link! \n \n" + "http://jariv.meteor.com/position?idlink=" + idlink 


        //CONFIGURATION
        var options = {
            replaceLineBreaks: true, // true to replace \n by a new line, false by default
            android: {
                intent: 'INTENT'  // send SMS with the native android SMS messaging
                //intent: '' // send SMS without open any other app
            }
        };

        var success = function () { 
        
         swal({   title: "SMS Sent!",   text: "Now sharing your position.",   timer: 2000,   showConfirmButton: false }, "success");
        
        
        };
        
        var error = function (e) { 
        
        swal({   title: "SMS not sent",   text: "No SMS has been sent.",   timer: 2000,   showConfirmButton: false });
        
        };
        
        if (idlink){
        
        sms.send(number, message, options, success, error);
        };
  },
  
  'click #create': function(){
  
    //alert(JSON.stringify(JSON.stringify(location)));
  
  
    CombinedLocation.startWatching( alert('c parti') );
  
  
  
  //var latLng = Geolocation.latLng();
  
  latLng = {lat: location.latitude, lng: location.longitude}
  
        if (! latLng){
        
 swal({   title: "Error",   text: "Device's GPS is not ready",   timer: 3000,   showConfirmButton: false });
        
        return;}
        
        
          idlink = Random.id();
  
  Session.set('idlink',idlink);
 
  trackings.insert({
  
  	idlink: idlink,
  	createdAt: new Date().valueOf(),
  	latitude: latLng.lat,
  	longitude: latLng.lng,
  	followers: 0,
  	lastview: new Date().valueOf()

  });
  
  date = new Date();
  
    stats.insert({
  
  	createdAt: date,
  	position: {lat: latLng.lat, lng: latLng.lng}
  	
  });
  
  
  
  
 //followers = trackings.findOne({idlink: idlink}); 
      
   //   if (followers.followers > 0 ){
  
    CombinedLocation.startWatching();
  
//Meteor.call("lastview", idlink);

console.log("ok c lance");

  //fires every 30 seconds 
periodic = new Timer(
  30000, // 30 seconds 
  function(data){
  
  
  console.log("yesh");
  
    var creation = trackings.findOne({idlink: idlink}).createdAt; 
    var lastview = trackings.findOne({idlink: idlink}).lastview;
    
    now = new Date().valueOf()
    
    var duree = now - lastview;

if (duree > 7000000) {
  CombinedLocation.stopWatching();
 periodic.stop();
 
  Meteor.call("stop", idlink); 
 Session.set('idlink', null)

} //end if

    
    
  }).startPeriodic();


  
 // }
   console.log( idlink );
   
},
  

});

////////////////////////////////////////////////////////////////////

Template.index.onCreated(function() {  






   var self = this;
   
    self.autorun(function() {
    
    latLng = {lat: location.latitude, lng: location.longitude}
    
 //  var latLng = Geolocation.latLng();
  
        if (! latLng)
        return;
  

   
   var idlink = Session.get('idlink');
   
      if (! idlink)
        return;

Meteor.call("updategps", latLng, idlink);

console.log("foregrounded");
	
}); 
  
 }); 

  
}
 

