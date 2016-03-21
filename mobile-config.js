App.accessRule('*');

 //App.setPreference('AutoHideSplashScreen' ,true);
 
 
App.info({
  name: 'JARIV',
  description: 'Built by Michael Fiorentini',
  version: '1.0.1'
});


App.setPreference('android-targetSdkVersion', '23');


App.icons({
  // iOS
  'iphone': 'resources/icons/76.png',
  'iphone_2x': 'resources/icons/iconjariv120.png',
  'iphone_3x': 'resources/icons/iconjariv152.png',
  'ipad': 'resources/icons/iconjariv152.png',
  'ipad_2x': 'resources/icons/iconjariv152.png',

  // Android
  'android_ldpi': 'resources/icons/Icon-60.png',
  'android_mdpi': 'resources/icons/Icon-60.png',
  'android_hdpi': 'resources/icons/Icon-72.png',
  'android_xhdpi': 'resources/icons/Icon-72@2x.png'
});
/*
App.launchScreens({
  // iOS
  'iphone': 'resources/splash/Default-Portrait.png',
  'iphone_2x': 'resources/splash/Default-Portrait.png',
  'iphone5': 'resources/splash/Default-Portrait.png',
  'iphone6': 'resources/splash/Default-Portrait.png',
 'iphone6p_portrait': 'resources/splash/Default-568h@2x.png',
  'iphone6p_landscape': 'resources/splash/Default-568h@2x.png',

  'ipad_portrait': 'resources/splash/Default-Portrait@2x.png',
  'ipad_portrait_2x': 'resources/splash/Default-Portrait@2x.png',
  'ipad_landscape': 'resources/splash/Default-Landscape.png',
  'ipad_landscape_2x': 'resources/splash/Default-Landscape@2x.png',

  // Android
  'android_ldpi_portrait': 'resources/splash/Default-Portrait.png',
  'android_ldpi_landscape': 'resources/splash/Default-Landscape@2x.png',
  'android_mdpi_portrait': 'resources/splash/Default-Portrait.png',
  'android_mdpi_landscape': 'resources/splash/Default-Landscape@2x.png',
  'android_hdpi_portrait': 'resources/splash/Default-Portrait.png',
  'android_hdpi_landscape': 'resources/splash/Default-Landscape@2x.png',
  'android_xhdpi_portrait': 'resources/splash/Default-Portrait.png',
  'android_xhdpi_landscape': 'resources/splash/Default-Landscape@2x.png'
});

*/