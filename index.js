
var myGeometry = new ol.geom.Point(ol.proj.fromLonLat([139.759023, 35.684861]));

var probe = new ol.Feature({
    geometry: myGeometry
});

probe.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
        //color: '#4271AE',
        //crossOrigin: 'anonymous',        
        src: 'gopher.png',
        scale: 0.03
    })
}));

var vectorSource = new ol.source.Vector({
    features: [probe]
});

var vectorLayer = new ol.layer.Vector({
    source: vectorSource
});

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }),
        //        vectorLayer
    ],
    view: new ol.View({
        //tokyo st 139.766944,35.680833
        //tokyo 皇居 139.754023, 35.684861 
        center: ol.proj.fromLonLat([139.754023, 35.684861]),
        zoom: 15
    })
});

$('#btn01').click(function (e) {
    console.log('btn01 start');
    vectorLayer.setMap(map);
});
$('#btn02').click(function (e) {
    console.log('btn02 start');

    let myGeometry1 = new ol.geom.Point(ol.proj.fromLonLat([139.750023, 35.684861]));
    let probe1 = new ol.Feature({
        geometry: myGeometry1
    });
    
    probe1.setStyle(new ol.style.Style({
        image: new ol.style.Icon({
            //color: '#4271AE',
            //crossOrigin: 'anonymous',        
            src: 'gopher.png',
            scale: 0.03
        })
    }));
    
    let vectorSource1 = new ol.source.Vector({
        features: [probe1]
    });
    
    let vectorLayer1 = new ol.layer.Vector({
        source: vectorSource1
    });
    vectorLayer1.setMap(map);    
});

function putIconOnMap(lon,lat){
    let myGeometry1 = new ol.geom.Point(ol.proj.fromLonLat([lon, lat]));
    let probe1 = new ol.Feature({
        geometry: myGeometry1
    });
    
    probe1.setStyle(new ol.style.Style({
        image: new ol.style.Icon({
            //color: '#4271AE',
            //crossOrigin: 'anonymous',        
            src: 'gopher.png',
            scale: 0.03
        })
    }));
    
    let vectorSource1 = new ol.source.Vector({
        features: [probe1]
    });
    
    let vectorLayer1 = new ol.layer.Vector({
        source: vectorSource1
    });
    vectorLayer1.setMap(map);
};

$('#btn03').click(function (e) {
    console.log('btn03 start');
    axios.get('https://c33j30cy6j.execute-api.ap-northeast-1.amazonaws.com/dev/probe/latest-list')
        .then(response => {
            console.log('status:', response.status); // 200
            console.log('body:', response.data);     // response body.

            let data = response.data;
            //let probe = JSON.parse(data);
            if ( data.body.Count > 0 ){
                let probe = data.body.Items[0];
                console.log('probe:', probe);
                putIconOnMap(probe.lon, probe.lat);
            }
            //vectorLayer.setMap(map);

        }).catch(err => {
            console.log('err:', err);
        });
});

//setInterval(() => {
// setTimeout(() => {
//     console.log('start...');
//     axios.get('https://c33j30cy6j.execute-api.ap-northeast-1.amazonaws.com/dev/probe/latest-list')
//         .then(response => {
//             console.log('status:', response.status); // 200
//             console.log('body:', response.data);     // response body.

//             //vectorLayer.setMap(map);

//         }).catch(err => {
//             console.log('err:', err);
//         });
// }, 5000);
