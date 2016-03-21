
if (Meteor.isClient) {

 Template.position.helpers({
  
 position: function() {
   idlink = Router.current().params.query.idlink;
 position = trackings.findOne({idlink: idlink}); 
 
 return position;
 
 },
 
  geolocationError: function() {
    var error = Geolocation.error();
    return error && error.message;
  },
  
  exampleMapOptions: function() {
  
   

        
        
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
        //position = {latitude: 49.62382, longitude: 6.168807}
        idlink = Router.current().params.query.idlink;
    position = trackings.findOne({idlink: idlink}); 
    
    //console.log(position);
    
        
        return {
      

        center: new google.maps.LatLng(position.latitude, position.longitude),
        

        zoom: 14
      };
    }
 
 
  }
  

});
  
  //////////////////////////////////////////////////////////////////////////
  
  Template.position.onCreated(function() {  
  
   idlink = Router.current().params.query.idlink;
  
  //fires every 30 seconds 
var periodic = new Timer(
  30000, // 30 seconds 
  function(data){
  
  
  Meteor.call("ping", idlink);
    
    
  }).startPeriodic();
  
  
  var self = this;

  GoogleMaps.ready('exampleMap', function(map) {
    var marker;




    // Create and move the marker when latLng changes.
    self.autorun(function() {
    
    idlink = Router.current().params.query.idlink;

position = trackings.findOne({idlink: idlink}); 
    
          //console.log(latLng);
      if (! position)
        return;
    
      var latLng = {lat: position.latitude, lng: position.longitude};
      
      //console.log(latLng);
      if (! latLng)
        return;

      // If the marker doesn't yet exist, create it.
      if (! marker) {
      
      var image = 'http://i.stack.imgur.com/orZ4x.png';
      
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(latLng.lat, latLng.lng),
          map: map.instance,
          icon:image
        });
      }
      // The marker already exists, so we'll just change its position.
      else {
        marker.setPosition(latLng);
      }

      // Center and zoom the map view onto the current position.
      map.instance.setCenter(marker.getPosition());
      //map.instance.setZoom(8);
    });
  });
});


}
   