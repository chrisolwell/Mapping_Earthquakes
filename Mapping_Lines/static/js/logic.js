// Add console.log to check to see if our code is working
console.log("working");
//create the map object with a center and zoom level
let map = L.map('mapid').setView([37.6213, -122.3790], 5);
//Get data from cities.js
// let cityData = cities;
// // Loop throough the cities array and create a marker for each city.
// cityData.forEach(function(city) {
//   console.log(city)
//   L.circleMarker(city.location, {
//     radius: city.population/200000,
//     color: "black",
//     weight: 4,
//     fillColor: "darkorange"
//   })
//   .bindPopup("<h2>" + city.city + ", " +city.state + "</h2> <hr> <h3>Population " +city.population + "</h3>")
//   .addTo(map);
// });
//Coordinate for each point to be used in the line
let line = [
  [37.6213, -122.3790],
  [30.1975, -97.6664],
  [43.6777, -79.6248],
  [40.6413, -73.7781],
  [44.8848, -93.2223]
];
// Create a polyline using the line coordinates and make it red.
L.polyline(line, {
  color: "blue",
  dashArray: "5,10",
  weight: 4,
  opacity: 0.5
}).addTo(map);
//create the tile layer that will be the background of our map
let streets =  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
});
//then we add out "graymap" tile layer to the map.
streets.addTo(map);
