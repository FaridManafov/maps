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
   var markerLat = coords[i].latitude;
   var markerLng = coords[i].longitude;
   var geocoder = new google.maps.Geocoder;
   geocodeLatLng(geocoder, map, infowindow, markerLat, markerLng);
 }
}


function geocodeLatLng(geocoder, map, infowindow, lat, lng) {
  var location = {lat: lat, lng: lng}
  geocoder.geocode({'location': location}, function(results, status) {
    if (status === 'OK') {
      if (results[0]) {
        //here is where the info is relayed in formatted address style

        var address = results[0].formatted_address;
        appendStagedMarker(address);
        // infowindow.setContent(address);//disabled as this is the infowindow bubble on marker that doesnt exist

        console.log(address);
        //Jquery into the html
        $('#result-address').text(address)

        // infowindow.open(map, marker);//disabled as this is the infowindow bubble click listener on marker that doesnt exist
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}

function appendStagedMarker(location) {
  let listItem = `<li class="list-group-item list-group-item-action">${location}</li>`
  $("#displayMapMarkers").append(listItem);
}
console.log("array of aids", )