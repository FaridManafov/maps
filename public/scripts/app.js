var map;
var toronto = {lat: 43.6532, lng: -79.3832};

function initMap() {
  map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 4,
      center: toronto
  });

  function placeMarker(location) {
    marker = new google.maps.Marker({
      position: location,
      map: map,
      title: 'Toronto',
      draggable: true
    });
  }

placeMarker(toronto);

}