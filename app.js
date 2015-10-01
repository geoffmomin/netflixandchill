require('dotenv').load();
var childProcess = require('child_process'),
    dashButton = require('node-dash-button'),
    hue = require("node-hue-api");

var dash = dashButton(process.env.DASH_MAC_ADDRESS),
    HueApi = hue.HueApi,
    hueIp = process.env.HUE_IP,
    hueUsername = process.env.HUE_USERNAME,
    lightState = hue.lightState,
    api = new HueApi(hueIp, hueUsername),
    startCommand = 'open "'+ process.env.CHROME_PATH + '" --args "--kiosk" ' + process.env.MEDIA_LOCATION,
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
  console.log("Hue command result: " + JSON.stringify(result, null, 2));
}

function runCommands() {
  console.log("Changing lights and starting player");
  childProcess.exec(startCommand);
  setTimeout(fadeAndChangeLightColor, 3000);
}

dash.on("detected", function (){
  console.log("Button press detected");
  // Quits Chrome app so that it can reopen in kiosk mode
  childProcess.exec("osascript -e 'quit app \"Chrome\"'");

  // Waits to make sure Chrome is closed before running the commands
  setTimeout(runCommands, 3000);
});
