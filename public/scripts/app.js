var map;
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
var toronto = {lat: 43.6446, lng: -79.3950};
var marker;
var infowindow;
var messagewindow;

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: 40.731, lng: -73.997}
  });
  var geocoder = new google.maps.Geocoder;
  var infowindow = new google.maps.InfoWindow;

  geocodeLatLng(geocoder, map, infowindow);
}

function geocodeLatLng(geocoder, map, infowindow) {
  // var input = document.getElementById('latlng').value;
  // var latlngStr = input.split(',', 2);
  // var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
  geocoder.geocode({'location': toronto}, function(results, status) {
    if (status === 'OK') {
      if (results[0]) {
        map.setZoom(11);
        var marker = new google.maps.Marker({
          position: toronto,
          map: map
        });
        //here is where the info is relayed in formatted address style

        var address = results[0].formatted_address;
        infowindow.setContent(address);
        console.log(address); 
        $('#result-address').text(address)

        infowindow.open(map, marker);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}

      // //this is what marker info we should pull from the database, just the lat: latitudeDB and lng:LongitudeDB,
      // //the information of the location will be fetched by reverse geocoding


      // //this initializes the map, the only thing to remember is zoom and centre,
      // //zoom zooms closer to the map the higher the number, 14 is a good num
      // //centre is where the map will be centered
      // function initMap() {
      //   map = new google.maps.Map(
      //     document.getElementById('map'), {
      //       zoom: 14,
      //       center: toronto,
      //   });

      //   //this places the marker on the location that is entered, you can run this multiple times for different places
      // function placeMarker(location) {
      //   marker = new google.maps.Marker({
      //     position: location,
      //     map: map,
      //     title: 'The 6ix',
      //     draggable: true,
      //     animation: google.maps.Animation.DROP,
      //     label: labels[labelIndex++ % labels.length]
      //   });

      // // on click listener pin which shows information of the pin above it
      // marker.addListener('click', function() {
      //   infowindow.open(map, marker);
      // });

      // //lines below is the info for when you press the pin, place this into the database for when the user inputs
      // //information into the new pin

      //   var contentString = '<div id="content">'+
      //   '<div id="siteNotice">'+
      //   '</div>'+
      //   '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      //   '<div id="bodyContent">'+
      //   '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      //   'sandstone rock formation in the southern part of the '+
      //   'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      //   'south west of the nearest large town, Alice Springs; 450&#160;km '+
      //   '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      //   'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      //   'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      //   'Aboriginal people of the area. It has many springs, waterholes, '+
      //   'rock caves and ancient paintings. Uluru is listed as a World '+
      //   'Heritage Site.</p>'+
      //   '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      //   'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      //   '(last visited June 22, 2009).</p>'+
      //   '</div>'+
      //   '</div>';


      //   //this initializes the window when the click listener is activated on the ping, which pulls up content above,
      //   //decide if we need info boxes or not
      //   var infowindow = new google.maps.InfoWindow({
      //     content: contentString
      //   });

      // }

      // function geocodePlaceId(geocoder, map, infowindow) {
      //   var placeId = document.getElementById('place-id').value;
      //   geocoder.geocode({'placeId': placeId}, function(results, status) {
      //     if (status === 'OK') {
      //       if (results[0]) {
      //         map.setZoom(11);
      //         map.setCenter(results[0].geometry.location);
      //         var marker = new google.maps.Marker({
      //           map: map,
      //           position: results[0].geometry.location
      //         });
      //         infowindow.setContent(results[0].formatted_address);
      //         infowindow.open(map, marker);
      //       } else {
      //         window.alert('No results found');
      //       }
      //     } else {
      //       window.alert('Geocoder failed due to: ' + status);
      //     }
      //   });
      // }

      
      
      // placeMarker(toronto);
      // geocodePlaceId(toronto)
      // }
