if (Meteor.isClient) {

////////////////////////////////////////////////////////////////////


  Template.map.helpers({  
  geolocationError: function() {
    var error = Geolocation.error();
    return error && error.message;
  },
  mapOptions: function() {
    var latLng = Geolocation.latLng();
    // Initialize the map once we have the latLng.
    if (GoogleMaps.loaded() && latLng) {
      return {
      
        
        
        
        center: new google.maps.LatLng(latLng.lat, latLng.lng),
        zoom: 14
      };
    }
  }
});
  
////////////////////////////////////////////////////////////////////  
  
Template.map.onCreated(function() {  
  var self = this;

  GoogleMaps.ready('map', function(map) {
    var marker;

    // Create and move the marker when latLng changes.
    self.autorun(function() {
      var latLng = Geolocation.latLng();
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
      map.instance.setZoom(14);
    });
  });
});
  
////////////////////////////////////////////////////////////////////  
  
  
 Template.layout.helpers({  
  
  distance: function() {
   idlink = Router.current().params.query.idlink;
 position = trackings.findOne({idlink: idlink}); 
 
 
  //var latLng = Geolocation.latLng();
  
  latLng = {lat: location.latitude, lng: location.longitude}
  
        if (! latLng) return;
        if (! position) return;
 
    lat1 = latLng.lat;
	lon1 = latLng.lng;

	lat2 = position.latitude;
	lon2 = position.longitude;
	

 
 var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var radlon1 = Math.PI * lon1/180
	var radlon2 = Math.PI * lon2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515

	dist = dist * 1.609344 
	//if (unit=="N") { dist = dist * 0.8684 }

	dist = dist.toFixed(3) + " km";



	return dist;
 

 },
 
  idlink: function ()
  { 
  
  idlink = Session.get("idlink")
  
  return idlink
  }
  ,
  
   followers: function ()
  { 
  idlink = Session.get("idlink")
  
  followers = trackings.findOne({idlink: idlink}); 
  
  return followers.followers
  
  }
  
  
   });

////////////////////////////////////////////////////////////////////   
   
   Template.position.rendered = function(){

    idlink = Router.current().params.query.idlink;
    
    Meteor.call("follow", idlink);


};

////////////////////////////////////////////////////////////////////

Template.position.onDestroyed = function(){

    idlink = Router.current().params.query.idlink;
    
    Meteor.call("unfollow", idlink);


};

}