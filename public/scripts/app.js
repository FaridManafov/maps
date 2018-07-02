// const knexConfig = require('../../server/knexfile.js')
// const knex = require('knex')(knexConfig.development);

var map;
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
var marker;
var infowindow;
var messagewindow;
let stagedMarkers = []
let mapId = null;

function initMap() {

  $(document).ready(function() {
    let markers = JSON.parse($('.markers-hidden').text());
    markers.forEach((element) => {
      console.log(element.latitude);
      console.log(element.longitude);
    })
  });

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 43.6446, lng: -79.3950}
  });
  var geocoder = new google.maps.Geocoder;
  var infowindow = new google.maps.InfoWindow;

  //click listener to make a new marker
  google.maps.event.addListener(map, "click", function(event) {
    marker = new google.maps.Marker({
      position: event.latLng,
      map: map,
      animation: google.maps.Animation.DROP
    });

    //FETCH lat lng from click
    var markerLat = marker.getPosition().lat();
    var markerLng = marker.getPosition().lng();
    stagedMarkers.push({markerLat, markerLng});

    geocodeLatLng(geocoder, map, infowindow, markerLat, markerLng);

      google.maps.event.addListener(marker, 'click', function(event) {
      remove(stagedMarkers, marker)
      this.setMap(null);
     });

    function remove(array, element) {
      const index = array.indexOf(element);
      array.splice(index, 1);
    }

  });
}

function submitMarkerPayload(markerArray) {
  $.ajax({
    method: 'POST',
    url: '/maps/markers',
    data: markerArrayaddress
  }).done(function(){

  })
}

function appendStagedMarker(location) {
  let listItem = `<li class="list-group-item list-group-item-action">${location}</li>`;
  $("#newMapMarkers").append(listItem);
}

function sendMarkers(mapID) {
  var payload = {
    markers: stagedMarkersList,
    mapId: "asd"
  }
  var body = JSON.stringify(payload)
}

//reverse geocoding
function geocodeLatLng(geocoder, map, infowindow, lat, lng) {
  var location = {lat: lat, lng: lng}
  geocoder.geocode({'location': location}, function(results, status) {
    if (status === 'OK') {
      if (results[0]) {

        var address = results[0].formatted_address;
        appendStagedMarker(address)
        console.log(address);
        //Jquery into the html
        $('#result-address').text(address)
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}
//SUBMITTING WITH 'SAVE' BUTTON ON '/NEW'
$("#new-map-submission").on("submit", function (event) {

  if ($(this).children(".mapName").val().length === 0) {
    alert("Please enter a map name.")
  }
  if (stagedMarkers.length === 0) {
    alert("Please pick some locations.")
  }

  event.preventDefault();
  let mapName = $("input.mapName").val()

  $.ajax({
    method: "POST",
    url: "/maps",
    data: {mapName: mapName}
  }).done(function(data) {
    console.log(data);
    mapId = data.id;

    stagedMarkers.forEach(function(marker) {
      $.ajax({
        method: "POST",
        url: "/markers",
        data: {
          mapId: mapId,
          markerLat: marker.markerLat,
          markerLng: marker.markerLng
        }
      })
    })
  })
})

// SUBMITTING MAP TO A USER'S FAVORITES WITH 'FAVORITE' BUTTON ON '/MAPS/:ID' (WORK IN PROGRESS)
$("#favorite-map-submssion").on("submit", function (event) {
  event.preventDefault();

    let mapId = $('.map-info-hidden').text();

    $.ajax({
    method: "POST",
    url: "/favorites",
    data: { mapId: Number(mapId) }
    }).done(function(data, status) {
    console.log("Data from pushing 'favorite' button: ", data, "\nStatus: ", status)
  })
});
