
var geojsonMarkerOptions = {
    radius: 8,
    // fillColor: getColor(),
    // color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};


/////////
d3.json(url, function(data){

		var quakes = data
		console.log(data)
		// return data
		var map = L.geoJson(quakes, {
            style: styles,
            onEachFeature: onEachFeature,
            pointToLayer: function (feature, latlng) {
            	var val = feature.properties.mag
        		return L.circleMarker(latlng, geojsonMarkerOptions);
    		}
         })
        .addTo(myMap) 
})
/////////

function createMap(myMap) {
	var baseMaps = {
		"Dark Map": darkmap
	};
	// var legend = L.control({position: 'bottomright'});

	// L.control.layers(baseMaps).addTo(myMap);

}
///////
	
// L.control.layers(baseMaps).addTo(myMap);

////////

var legend = L.control({position: 'bottomright'});

////////

legend.onAdd = function (myMap) {
 	var div = L.DomUtil.create('div', 'info legend');
     grades = [1, 2, 3, 4, 5, 6, 7]
	 labels = ['<b id="legend-head">Magnitude</b>'];
	for (var i = 0; i < grades.length; i++) {

            div.innerHTML += 
            labels.push(
                '<li style="background:' + getColor(grades[i]) + '">' + grades[i] + " + " + "</li>");

        }
        div.innerHTML = labels.join('<li>');
    return div;
    };

legend.addTo(myMap);

function getColor(d) {
	return d > 6 ? 'rgb(260,0,0)':
		d > 5 ? 'rgb(177,0,38)':
		d > 4.5 ? 'rgb(227,26,28)':
		d > 4 ? 'rgb(252,78,42)':
		d > 3.5 ? 'rgb(253,141,60)':
		d > 3 ? 'rgb(254,178,76)':
		d > 2.5 ? 'rgb(254,217,118)':
		d > 2 ? 'rgb(255,237,160)':
		'rgb(255,255,204)';
}


function styles(feature) {
	// console.log('is this being called at all?')
	var val = feature.properties.mag
            return {
            	radius: getSize(val),
                fillColor: getColor(val),
                weight: 2,
                opacity: 1,
                color: getColor(val),
                fillOpacity: 0.7
              };
   }


function getSize(d){
	var size = (d*d)
	// var size = (d*d+5)
	return size 
}

function onEachFeature(feature, layer){
	var popupContent = "<h2>" + feature.properties.place + "</h2>" + "<h3>" + "Magnitude: " + feature.properties.mag + "</h3>" + "<lb>" + feature.properties.url
	layer.bindPopup(popupContent)
}

createMap(myMap)