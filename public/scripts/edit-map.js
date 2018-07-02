var map;
let arrayOfMarkers = [];
let pageMarkers = [];
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;

$(document).ready(function() {
  $('#save-edit').on('click', function(e){
    arrayOfMarkers.forEach((marker) => {
      console.log(marker.map_id);
      let whichMap = marker.map_id;
      $.ajax({
        method: "POST",
        url: "/maps/" + whichMap + "/edit",
        data: {
          mapId: marker.map_id,
          lat: marker.latitude,
          long: marker.longitude
        }
      })
    })
  })
})

function initDisplayMap() {
  function remove(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
  }

  let markers = JSON.parse($('.markers-hidden').text());

  markers.forEach((obj) => {
    arrayOfMarkers.push(obj);
  });
  let geocoder = new google.maps.Geocoder;

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: new google.maps.LatLng(arrayOfMarkers[0].latitude, arrayOfMarkers[0].longitude)
  });

  arrayOfMarkers.forEach((element) => {
    let latLng = new google.maps.LatLng(element.latitude, element.longitude);
    let marker = new google.maps.Marker({
      position: latLng,
      map: map,
      animation: google.maps.Animation.DROP
    });

    google.maps.event.addListener(marker, 'click', function(event) {
    remove(arrayOfMarkers, marker)
    this.setMap(null);
   });
    geocodeLatLng(geocoder, map, infowindow, element.latitude, element.longitude);
  })

  google.maps.event.addListener(map, "click", function(event) {
    marker = new google.maps.Marker({
      position: event.latLng,
      map: map,
      animation: google.maps.Animation.DROP

    });

    var latitude = marker.getPosition().lat();
    var longitude = marker.getPosition().lng();
    arrayOfMarkers.push({latitude, longitude});
    console.log("staged:", arrayOfMarkers)


    geocodeLatLng(geocoder, map, infowindow, latitude, longitude);

    google.maps.event.addListener(marker, 'click', function(event) {
    remove(arrayOfMarkers, marker)
    this.setMap(null);
   });

  })

}

function geocodeLatLng(geocoder, map, infowindow, lat, lng) {
  var location = {lat: lat, lng: lng}
  geocoder.geocode({'location': location}, function(results, status) {
    if (status === 'OK') {
      if (results[0]) {
        //here is where the info is relayed in formatted address style
        var address = results[0].formatted_address;
        appendMarkers(address);
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

function appendMarkers(location) {
  let listItem = `<li class="list-group-item list-group-item-action">${location}</li>`
  $(".listOfMarkers").append(listItem);
}