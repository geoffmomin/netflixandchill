require('dotenv').load();
var dashButton = require('node-dash-button'),
    hue = require("node-hue-api"),
    open = require("open");

var dash = dashButton(process.env.DASH_MAC_ADDRESS),
    HueApi = hue.HueApi,
    hueIp = process.env.HUE_IP,
    hueUsername = process.env.HUE_USERNAME,
    lightState = hue.lightState,
    api = new HueApi(hueIp, hueUsername),
    state;

// Change color / brightness values of the lights
state = lightState.create().reset().on(true).hsl(350, 100, 20);

function fadeAndChangeLightColor() {
  // Applies lightState to group 0 (all lights)
  api.setGroupLightState(0, state, function(err, lights) {
      if (err) throw err;
      logHueResults(lights);
  });
}

function logHueResults(result) {
  console.log(JSON.stringify(result, null, 2));
}

dash.on("detected", function (){
  console.log("button press detected");
  fadeAndChangeLightColor();
  open(process.env.MEDIA_LOCATION);
});
