/* PageView Pages */
const pages = [
    {
        "name" : "MainActivity",
        "html" : `<div class="app-logo">TrafficLight</div>
                  <div class="app-action">
                    <a class="app-action btn btn-start-using">Start using the app</a>
                  </div>
                  </div>`,
        "js" : `document.querySelector('.btn-start-using').onclick = function(){
            app.renderView('MapActivity');
        }`,
    },
    {
        "name" : "MapActivity",
        "html" : `<div class="app-nav">TrafficLight</div>
                  <div id="map" class="map"></div>
                  <div class="hidden bottom-sheet frame">
                    <div class="header-box">
                        <div class="title">Add TrafficLight</div>
                        <div class="actions">
                            <a class="closeFrame" onclick="document.querySelector('.frame').classList.add('hidden')">X</a>
                        </div>
                    </div>
                    <div class="form">
                        <div class="display-text geo-title"></div>
                        <div class="display-text greenLightTime"></div>
                        <div class="display-text redLightTime"></div>
                        <div class="app-action">
                            <a class="btn addGreenLightTime">SetGreenTime</a>
                            <a class="btn addRedLightTime">SetRedTime</a>
                        </div>
                    </div>`,
        "js" : `var temporaryLight = new TrafficLight();
                var markersBox = document.querySelector('.markers');
                // basic config map
                var pos = ol.proj.fromLonLat([16.3725, 48.208889]);
                var layer = new ol.layer.Tile({
                source: new ol.source.OSM()
                });
                var map = new ol.Map({
                layers: [layer],
                target: 'map',
                view: new ol.View({
                    center: pos,
                    zoom: 4
                })
                });
                const successCallback = (position) => {
                    console.log(position);
                    let userLocation = ol.proj.fromLonLat([position.coords.longitude, position.coords.latitude]);
                    
                    // create a new view centered on the user's location
                    let view = new ol.View({
                      center: userLocation,
                      zoom: 10
                    });
                  
                    // set the view as the map's current view
                    map.setView(view);
                };

                const errorCallback = (error) => {
                    alert('Error getting user position');
                    console.log(error);
                };
                navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
                /*var marker_el = document.getElementById('marker');
                var marker = new ol.Overlay({
                position: pos,
                positioning: 'center-center',
                element: marker_el,
                stopEvent: false,
                dragging: false
                });
                map.addOverlay(marker);
                */
                
                // drag action
                var dragPan;
                map.getInteractions().forEach(function(interaction){
                    if (interaction instanceof ol.interaction.DragPan) {
                        dragPan = interaction;  
                }
                });

                // drag pin
                /*marker_el.addEventListener('mousedown', function(evt) {
                dragPan.setActive(false);
                marker.set('dragging', true);
                console.info('start dragging');
                });
                */

                /*map.on('pointermove', function(evt) {
                    /*if (marker.get('dragging') === true) {
                    marker.setPosition(evt.coordinate);
                }
                });*/

                /*map.on('pointerup', function(evt) {
                    /*if (marker.get('dragging') === true) {
                    dragPan.setActive(true);
                    marker.set('dragging', false);
                    
                    temporaryLight = new TrafficLight(evt.coordinate[0], evt.coordinate[1]);
                    
                    document.querySelector('.frame').classList.remove('hidden');
                    document.querySelector('.geo-title').innerText = 'Position: ' + String(evt.coordinate[0]) + ' , ' + String(evt.coordinate[1]);
                    document.querySelector('.geo-title').setAttribute('latlong', String(evt.coordinate[0]) + ';' + String(evt.coordinate[1]));
                }
                });
                */
                var markerSwitchId=false;
                const options = { year: "numeric", month: "long", day: "numeric" };
                // onclick ma
                map.on('click', function(evt){
                var LongLat = ol.proj.toLonLat(evt.coordinate);
                coordinates=LongLat;
                temporaryLight = new TrafficLight(evt.coordinate[0], evt.coordinate[1]);
                document.querySelector('.frame').classList.remove('hidden');
                document.querySelector('.geo-title').innerText = 'Position: ' + String(evt.coordinate[0]) + ' , ' + String(evt.coordinate[1]);
                document.querySelector('.geo-title').setAttribute('latlong', String(evt.coordinate[0]) + ';' + String(evt.coordinate[1]));
                /*marker.setPosition(evt.coordinate);
                marker.set('dragging', false);*/
                });
                document.querySelector('.addGreenLightTime').onclick = function(){
                    let toGreen = temporaryLight.startGreen();
                    document.querySelector('.geo-title').innerText = 'Green time: '+toGreen.toLocaleDateString(undefined, options);
                }
                document.querySelector('.addRedLightTime').onclick = function(){
                    if (temporaryLight.greenStartTime){
                        let marker = document.createElement('div');
                        let createNewId = randomId();
                        marker.classList.add('marker');
                        marker.id = createNewId;
                        temporaryLight.elementID = createNewId;
                        document.body.querySelector('.markers').append(marker);
                        marker.style = "url('/assets/images/red-light.png') no-repeat top center;";
                        let latlong = document.querySelector('.geo-title').getAttribute('latlong');
                        let poss = coordinates;
                        temporaryLight.markers = new ol.layer.Vector({
                            source: new ol.source.Vector(),
                            style: new ol.style.Style({
                              image: new ol.style.Icon({
                                anchor: [0.5, 1],
                                src: '/assets/images/red-light.png'
                              })
                            })
                        });
                        map.addLayer(temporaryLight.markers);
                        temporaryLight.marker = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat(poss)));
                        temporaryLight.markers.getSource().addFeature(temporaryLight.marker);
                        trafficLights[trafficLights.length] = temporaryLight;
                        temporaryLight.startRed();
                        document.querySelector('.frame').classList.add('hidden');
                    }else{
                        alert('Start red light first!');
                    }
                }`,
    }
]