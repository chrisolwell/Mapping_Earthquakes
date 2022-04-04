
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
// Create the map object with a center and zoom level.
let map = L.map("mapid", {
    center: [39.0, -98.5],
    zoom: 3,
    layers: [streets]
  });
//accessing the toronto airline routes GeoJSON URL
let torontoHoods = "https://raw.githubusercontent.com/chrisolwell/Mapping_Earthquakes/main/torontoNeighborhoods.json";
// //Pass out map layers into our laters control and add the layers control to the map.
// L.control.layers(baseMaps).addTo(map);
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
            fillColor: "#ffae42",
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
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
    style: styleInfo
    }).addTo(map);
});