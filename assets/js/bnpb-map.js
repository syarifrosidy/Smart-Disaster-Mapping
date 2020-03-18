var defaultMapFill    = '#fafafa';
var polyOpacity       = .6;
var polyHoverOpacity  = 1;

var googleMap;
var myLatLng = null;
var mapTypeId = 'satellite';

var geoXml = null;
var geoXmlDoc = null;

var mapId = 'bnpb-map';

var idToIdx = {};

function initializeMap(kmlSrc, lat, lng, zoom, afterMapRender) {
  myLatLng = new google.maps.LatLng(lat, lng);
  var myOptions = {
      center: myLatLng,
      zoom: parseInt(zoom),
      mapTypeId: mapTypeId,
      panControl: false,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      overviewMapControl: false,
      rotateControl: false,
  };
  googleMap = new google.maps.Map(document.getElementById(mapId), myOptions);

  geoXml = new geoXML3.parser({
      map: googleMap,
      singleInfoWindow: true,
      afterParse: function(doc){
        useData(doc, afterMapRender)
      },
      zoom : false,
  });
  geoXml.parse(kmlSrc);
}
function useData(doc, afterMapRender){
  geoXmlDoc = doc[0];
  var marker = null;
  var placemark = null;
  for (var i=0;i<geoXmlDoc.markers.length;i++) {
    marker = geoXmlDoc.markers[i];
    marker.setVisible(false);

    idToIdx[marker.id] = i;

    setPolyColor(marker.id, defaultMapFill);
    highlightPoly(marker.id);

    placemark = geoXmlDoc.placemarks[i];
    setPolyInfo(marker.id, placemark.description);
  }

  if(typeof afterMapRender == 'function')
    afterMapRender();
}
function highlightPoly(id) {
    var idx = idToIdx[id];
    var poly = geoXmlDoc.gpolygons[idx];

    poly.setOptions({fillOpacity : polyOpacity});
    google.maps.event.addListener(poly,"mouseover",function(evt) {
      poly.setOptions({fillOpacity : polyHoverOpacity});
      polyMouseover(id, idx, poly, evt);
    });
    google.maps.event.addListener(poly,"mouseout",function(evt) {
      poly.setOptions({fillOpacity : polyOpacity});
      polyMouseout(id, idx, poly, evt);
    });
}  
function setPolyColor(id, fill){
  if(typeof idToIdx[id] != 'undefined'){
    var idx = idToIdx[id];
    if(typeof geoXmlDoc.gpolygons[idx] != 'undefined'){
      var poly = geoXmlDoc.gpolygons[idx];
      poly.setOptions({fillColor: fill})
    }
  }
}
function polyMouseover(id, idx, poly, evt){
  // console.log(id, idx, poly, evt);
  google.maps.event.trigger(geoXmlDoc.markers[idx],"click");
}
function polyMouseout(id, idx, poly, evt){
  // console.log(id, idx, poly, evt);
  var marker = geoXmlDoc.markers[idx];
      marker.infoWindow.close();
}
function setPolyInfo(id, info){
  if(typeof idToIdx[id] != 'undefined'){
    var idx = idToIdx[id];
    if(typeof geoXmlDoc.gpolygons[idx] != 'undefined'){
      var poly = geoXmlDoc.gpolygons[idx];
      var marker = geoXmlDoc.markers[idx];
      
      poly.infoWindowOptions.content = info;
      marker.infoWindowOptions.content = info;
    }
  }
}

// ini sample functions yang sering dipanggil
  jQuery(function(){
      // var kmlSrc = 'kml/geonode-dki_kecamatan.kml';
      //     // kmlSrc = 'kml/us_states.xml';
      // var zoom = 11;
      // var lat = -6.2312416035297815;
      //     // lat = 37.422104808;
      // var lng = 106.83020622484533;
      //     // lng = -122.0838851;
      // initializeMap(kmlSrc, lat, lng, zoom);
  })
// ini sample functions yang sering dipanggil




