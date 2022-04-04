
// Add console.log to check to see if our code is working
console.log("working");
// create the tile layer that will be the background of our map
let streets =  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
});
//create the dark view tile layer that will be an option for our map
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
//create a base layer that holds both maps
let baseMaps = {
    "Streets": streets,
    "Satellight Streets": satelliteStreets
};
//create athe quake layer
let earthquakes = new L.layerGroup();
//define an object that contains the overlays
//this overlay will be visible all the time
let overlays = {
    Earthquakes: earthquakes
};
// Create the map object with a center and zoom level.
let map = L.map("mapid", {
    center: [39.0, -98.5],
    zoom: 3,
    layers: [streets]
  });
// //Pass out map layers into our laters control and add the layers control to the map.
L.control.layers(baseMaps, overlays).addTo(map);
// //accessing the airport geoJSON URL
// let airportData = "https://raw.githubusercontent.com/chrisolwell/Mapping_Earthquakes/main/majorAirports.json";
//Create a style for the lines
let myStyle = {
    color: "#ffffa1",
    weight:2
};
//Grabbing our geoJSON data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    // console.log(data);
    //This function returns the style data for each of the quakes we plot
    //the map. we pass the mag of the quake into a funtion 
    //to calculate the radius.
    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }
    //this function determinest the color of the circle based on the magnitude of the quake.
    function getColor(magnitude) {
        if (magnitude >5) {
            return "#ea2c2c";
        }
        if (magnitude > 4) {
            return "#ea822c";
        }
        if (magnitude >3) {
            return "#ee9c00";
        }
        if (magnitude > 2) {
            return "#eecc00";
        }
        if (magnitude > 1) {
            return "#d4ee00";
        }
        return "#98ee00";
    }
    //this function determines the radius of the earthquake marker based on
    //its magnitude. Quakes with a mag of 0 will be plotted with a radius of 1.
    function getRadius(magnitude){
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
    }
    //creating a geoJSON layer with the retrieved data.
    L.geoJSON(data, {

        //we turn each layer into a circleMarker on the map.
        pointToLayer: function(feature, latlng) {
                console.log(data);
                return L.circleMarker(latlng);
            },
        //set the style for each circleMarker using our stylInfo fucntion.
        style: styleInfo,
        //creat a popup for each circlemarker to display the mag and
        //location of the earthquake after the marker has been created and styled.
        onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    }).addTo(earthquakes);

        //then we add the quake layer to the map
        earthquakes.addTo(map);
});



