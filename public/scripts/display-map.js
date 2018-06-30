var map;
arrayOfMarkers = []
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;

let markers = JSON.parse($('.markers-hidden').text());
markers.forEach((element) => {
 arrayOfMarkers.push(element)
 console.log("element",element)
})

function initDisplayMap() {
 map = new google.maps.Map(document.getElementById('map'), {
   zoom: 14,
   center: new google.maps.LatLng(arrayOfMarkers[0].latitude, arrayOfMarkers[0].longitude)
 });

 for (var i = 0; i < arrayOfMarkers.length; i++) {
   var coords = arrayOfMarkers;
   var latLng = new google.maps.LatLng(coords[i].latitude , coords[i].longitude);
   var marker = new google.maps.Marker({
     position: latLng,
     map: map,
     label: labels[labelIndex++ % labels.length],
     animation: google.maps.Animation.DROP
   });
 }
}


console.log("array of aids", )