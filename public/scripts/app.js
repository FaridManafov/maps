var map;
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;

      var toronto = {lat: 43.6532, lng: -79.3832};

      function initMap() {
        map = new google.maps.Map(
          document.getElementById('map'), {
            zoom: 14,
            center: toronto,
        });

      function placeMarker(location) {
        marker = new google.maps.Marker({
          position: location,
          map: map,
          title: 'The 6ix',
          draggable: true,
          animation: google.maps.Animation.DROP,
          label: labels[labelIndex++ % labels.length]
        });

      // on click listener pin which shows information of the pin
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });

      //lines below is the info for when you press the pin, place this into the database for when the user inputs
        //information into a new pin

        var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
        '<div id="bodyContent">'+
        '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        'sandstone rock formation in the southern part of the '+
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
        'south west of the nearest large town, Alice Springs; 450&#160;km '+
        '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
        'features of the Uluru - Kata Tjuta National Park. Uluru is '+
        'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
        'Aboriginal people of the area. It has many springs, waterholes, '+
        'rock caves and ancient paintings. Uluru is listed as a World '+
        'Heritage Site.</p>'+
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
        'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
        '(last visited June 22, 2009).</p>'+
        '</div>'+
        '</div>';



        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

      }







      placeMarker(toronto);
      }
