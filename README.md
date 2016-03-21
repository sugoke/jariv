# meteor-combined-geolocation
A demo app to show how to use background and foreground geolocation together with meteor

The package combined-location does all the tracking work.
The package app-state handles the reactive variable that sets background / foreground states for cordova.

You can copy both of those packages to use in your own application if you wish. Then you can just run :

````

  CombinedLocation.startWatching(callback);
  
  CombinedLocation.stopWatching(callback);
  
````
