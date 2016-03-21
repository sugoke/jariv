if (Meteor.isServer) {

Meteor.methods({

ping: function(idlink) {

trackings.update({idlink:idlink}, { $set: { lastview : new Date().valueOf() }});

},

updategps: function (latLng, idlink) {

trackings.update({idlink:idlink}, 
	
        {$set: {latitude: latLng.lat, longitude: latLng.lng}}
        
      );

},



lastview: function(idlink){

  var everyMinute = new Cron(function() {
    
    
    var creation = trackings.findOne({idlink: idlink}).createdAt; 
    var lastview = trackings.findOne({idlink: idlink}).lastview;
    
    
    
    
    console.log(creation); 
    
     }, {});

},

follow: function(idlink)
    
    {
trackings.update({idlink:idlink},{ $inc: { followers: 1 } });

trackings.update({idlink:idlink}, { $set: { lastview : new Date().valueOf() }});

    },
    
    unfollow: function(idlink)
    
    {
trackings.update({idlink:idlink},{ $inc: { followers: -1 } });

console.log("destroy");

    },

    addPosition: function(pos) {
        console.log("SERVER POSITION", pos);
    },
    
    stop: function(idlink)
    
    {

trackings.remove({idlink:idlink});


   
    }
    
})




}
