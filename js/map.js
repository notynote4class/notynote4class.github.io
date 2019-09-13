var map;

function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 12.0917, lng: 101.6822},
        zoom: 8,
styles: [
        {
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#f5f5f5"
            }
            ]
        },
        {
            "elementType": "labels.icon",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#616161"
            }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
            {
                "color": "#f5f5f5"
            }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#bdbdbd"
            }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#eeeeee"
            }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#757575"
            }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#e5e5e5"
            }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#9e9e9e"
            }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#ffffff"
            }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#757575"
            }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#dadada"
            }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#616161"
            }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#9e9e9e"
            }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#e5e5e5"
            }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#eeeeee"
            }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#c9c9c9"
            }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
            {
                "color": "#164d7a"
            }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#9e9e9e"
            }
            ]
        }
    ]
    });
}

//Database Variable
var database = firebase.database();
var ref = database.ref('Divesites');

//array for each marker
var diveSitesName = ["Pak-1", "Hardeep Wreck", "Koh Rang", "Hin Luk Bat", "HTMS Chang Wreck"];


//create marker according to size of array above
//while getting information of each marker from firebase database which link to android application
for (i=0; i < diveSitesName.length; i++){

    var names = diveSitesName[i];
    console.log(names);

    var dRef = ref.child(names);

    dRef.once('value', function(snapshot){

        //get information from database and put into local variable
        var lat_val = snapshot.child('lat').val();
        var lng_val = snapshot.child('lng').val();
        var desc_val = snapshot.child('diveSiteBio').val();
        var name_val = snapshot.child('diveSiteName').val();

        //create url link to use in infowindows so it can redirect to pages according to the name
        var url_val = "/DiveSite/"+name_val+".html";

        //define coordinate from data that we got from database
        var markLatLng = new google.maps.LatLng(lat_val,lng_val);

        var markIcon = "https://firebasestorage.googleapis.com/v0/b/diveatlas-project.appspot.com/o/diveatlaspin50x50.png?alt=media&token=17faf6e2-772f-4764-867d-6e3dad50ca26";

        //content inside infowindows
        var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">'+name_val+'</h1>'+
        '<div id="bodyContent">'+
        '<p>'+desc_val+'</p>'+
        '<p>Link: <a href="'+url_val+'">'+
        name_val+'</a>'+'</p>'+
        '</div>'+
        '</div>';

        //create infowindows
        var infowindow = new google.maps.InfoWindow({
            content: contentString
          });

        //create marker
        var marker = new google.maps.Marker({
            position: markLatLng,
            map: map,
            title: name_val,
            icon: markIcon
        });

        //open infowindows when click on marker
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });

        //close infowindows when click on maps
        google.maps.event.addListener(map, "click", function(event) {
            infowindow.close();
        });
        

    });

}