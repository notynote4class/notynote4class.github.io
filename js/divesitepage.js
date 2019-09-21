//this java script should get some data from database and apply information into a template in html file.

var map;

function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: 'hybrid',
        zoom: 10,
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

//divesite name from Title
var diveSiteName = document.getElementsByTagName("title")[0].innerHTML;
console.log(diveSiteName);

//get data from database
var dRef = ref.child(diveSiteName);

dRef.once('value', function(snapshot){

    //get information from database and put into local variable
    var lat_val = snapshot.child('lat').val();
    var lng_val = snapshot.child('lng').val();
    var desc_val = snapshot.child('diveSiteBio').val();
    var name_val = snapshot.child('diveSiteName').val();
    var dept_val = snapshot.child('diveSiteDepth').val();
    var coor_val = snapshot.child('diveSiteCoor').val();
    var type_val = snapshot.child('diveSiteType').val();
    var img_val = snapshot.child('image').val();

    //set information into html
    document.getElementById("diveSiteImg").src = img_val;
    document.getElementById("diveName").innerHTML = name_val;
    document.getElementById("diveType").innerHTML = type_val;
    document.getElementById("diveDept").innerHTML = dept_val;
    document.getElementById("diveCoor").innerHTML = coor_val;
    document.getElementById("diveDesc").innerHTML = desc_val;

    //define coordinate from data that we got from database
    var markLatLng = new google.maps.LatLng(lat_val,lng_val);

    map.setCenter(markLatLng);
    map.setTilt(45);

    var markIcon = "https://firebasestorage.googleapis.com/v0/b/diveatlas-project.appspot.com/o/diveatlaspin50x50.png?alt=media&token=17faf6e2-772f-4764-867d-6e3dad50ca26";

    //create marker
    var marker = new google.maps.Marker({
        position: markLatLng,
        map: map,
        title: name_val,
        icon: markIcon
    });
});
