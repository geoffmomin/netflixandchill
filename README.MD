# netflixandchill

Inspired by Netflix's "The Switch" aka the [netflix and chill button](https://makeit.netflix.com/the-switch) as well as [Brody Berson (@brody_berson's)](https://medium.com/@brody_berson/hacking-amazon-s-5-dash-button-to-order-domino-s-pizza-9d19c9d04646) and [Ted Benson's (@edwardbenson)](https://medium.com/@edwardbenson/how-i-hacked-amazon-s-5-wifi-button-to-track-baby-data-794214b0bdd8) posts on messing with the Amazon Dash button, I created a quick node app that turns down the Phillips Hue lights and fires up Netflix.

It uses a few (great) libraries that do most of the heavy lifting:

  - node-dash-button - for interacting with the Amazon Dash button
  - node-hue-api - for interacting with hue lights
  - open - for opening Netflix or whatever streaming service / media application

### Version
0.0.1

### Setup

You're going to need Philips Hue Lights and an Amazon Dash button.

I used an env file to house my variables, but you can just hardcode them in. An example can be found in the root of the project. You need:

 - DASH_MAC_ADDRESS - The MAC address of your dash button. There are a few ways of finding this, I used wireshark since I already had it installed. The aforementioned articles also have tips on finding this address.
 - HUE_IP - The IP address of your hue bridge. Similar to finding the Dash MAC address. You probably want to assign your bridge a static IP.
 - HUE_USERNAME - The username you receive after registering a new app to your hue bridge via the [hue API](http://www.developers.meethue.com/documentation/getting-started). The node-hue-api library has the ability to do this, or you can use the hue api directly.
 - MEDIA_LOCATION - Either the file location of the software, or the URL of the site (e.g. netflix.com) you want to open.

### Running This App
```
node app.js
```

License
----

MIT
