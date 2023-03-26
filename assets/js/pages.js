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
        "name" : "DeleteActivity",
        "html" : `<div class="app-logo">TrafficLight</div>
                  <div class="app-action">
                    <a class="app-action btn btn-start-using">Continue using the app</a>
                  </div>
                  </div>`,
        "js" : `document.querySelector('.btn-start-using').onclick = function(){
            app.renderView('MapActivity');
        }`,
    },
    {
        "name" : "MapActivity",
        "html" : `<div class="app-nav"><a class="showWhereIAM"><svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path fill="currentColor" d="M272 464a16 16 0 0 1-16-16.42V264.13a8 8 0 0 0-8-8H64.41a16.31 16.31 0 0 1-15.49-10.65a16 16 0 0 1 8.41-19.87l384-176.15a16 16 0 0 1 21.22 21.19l-176 384A16 16 0 0 1 272 464Z"/></svg></a><a class="open-drawer-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path></svg></a>TrafficLight</div>
                  <div id="maps" class="map"></div>
                  <div class="drawer">
                    <button class="close-drawer-btn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/></svg></button>
                    <ul>
                    <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1a6.887 6.887 0 0 0 0 9.8c2.73 2.7 7.15 2.7 9.88 0c1.36-1.35 2.04-2.92 2.04-4.9h2c0 1.98-.88 4.55-2.64 6.29c-3.51 3.48-9.21 3.48-12.72 0c-3.5-3.47-3.53-9.11-.02-12.58a8.987 8.987 0 0 1 12.65 0L21 3v7.12M12.5 8v4.25l3.5 2.08l-.72 1.21L11 13V8h1.5Z"/></svg> Update traffic lights</a></li>
                    <li><a href="#" class="clickDeleteLights"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z"/></svg> Delete all traffic lights</a></li>
                    <li><a href="#" class="clickSaveLights"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16v-6H5l7-7l7 7h-4v6H9m-4 4v-2h14v2H5Z"/></svg> Upload traffic lights</a></li>
                    </ul>
                  </div>
                  <div class="overlay"></div>
                  <div class="bottomsheet">
                    
                  </div>
                  <div class="display-text geo-title" style="display: none;"></div>
                    </div>
                    <!--
                    <div class="header-box">
                        <div class="title">Add TrafficLight</div>
                        <div class="actions">
                        <button class="close-bottomsheet-btn" onclick="closeBottom();"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/></svg></button>
                        </div>
                    </div>
                    <form>
                    <div class="display-text geo-title"></div>
                    <div class="display-text greenLightTime"></div>
                    <div class="display-text redLightTime"></div>
                    <div class="app-action">
                        <a class="btn addGreenLightTime">SetGreenTime</a>
                        <a class="btn addRedLightTime">SetRedTime</a>
                    </div>
                    <button type="button" class="close-bottomsheet-btn" onclick="closeBottom()">Cancel</button>
                    </form>
                    -->`,
        "js" : `var temporaryLight = new TrafficLight();
                var markersBox = document.querySelector('.markers');
                // basic config map
                var pos = ol.proj.fromLonLat([16.3725, 48.208889]);
                var layer = new ol.layer.Tile({
                source: new ol.source.OSM()
                });
                map = new ol.Map({
                layers: [layer],
                target: 'maps',
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
                      zoom: 20
                    });
                  
                    // set the view as the map's current view
                    map.setView(view);
                };

                const errorCallback = (error) => {
                    alert('Error getting user position');
                    errorCall = true;
                    console.log(error);
                };

                const updateGeolocationInstantly = function(){
                    if (isCalling){
                        if (errorCall == false){
                            navigator.geolocation.getCurrentPosition(successCallback, errorCallback ,{ enableHighAccuracy: true });
                        }
                    }
                }

                navigator.geolocation.getCurrentPosition(successCallback, errorCallback ,{ enableHighAccuracy: true });
                document.querySelector('.showWhereIAM').addEventListener('click', function(){
                    if (isCalling = false){
                        isCalling = true;
                    }else{
                        isCalling = false;
                    }
                    navigator.geolocation.getCurrentPosition(successCallback, errorCallback ,{ enableHighAccuracy: true });
                });

                setInterval(updateGeolocationInstantly, 1000);

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
                console.log(LongLat)
                temporaryLight = new TrafficLight(coordinates[0], coordinates[1]);
                temporaryLight.cords = coordinates;
                document.querySelector('.bottomsheet').innerHTML = '<div class="mgff_close" onclick="closeBottom()"></div>' +
                                                                   '<div class="bottomSheetTitle">Create new traffic light</div>' +
                                                                   '<div class="bottomSheetText">Which light is now?</div>' +
                                                                   '<div class="bottomSheetImages">' +
                                                                   '    <img src="/assets/images/red-light-btn.svg" onclick="chooseGreenLight()"/>' +
                                                                   '    <img src="/assets/images/green-light-btn.svg" onclick="chooseRedLight()"/>' +
                                                                   '</div>';
                document.querySelector('.bottomsheet').classList.add('open');
                document.querySelector('.geo-title').innerText = 'Position: ' + String(evt.coordinate[0]) + ' , ' + String(evt.coordinate[1]);
                document.querySelector('.geo-title').setAttribute('latlong', String(evt.coordinate[0]) + ';' + String(evt.coordinate[1]));
                /*marker.setPosition(evt.coordinate);
                marker.set('dragging', false);*/
                });
                /*
                document.querySelector('.addGreenLightTime').onclick = function(){
                    let toGreen = temporaryLight.startGreen();
                    document.querySelector('.geo-title').innerText = 'Green time: '+toGreen.toLocaleDateString(undefined, options);
                }
                document.querySelector('.addRedLightTime').onclick = function(){
                    if (temporaryLight.greenStartTime){
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
                        bottomsheet.classList.remove('open');
                    }else{
                        alert('Start red light first!');
                    }
                }
                */
                const openDrawerBtn = document.querySelector('.open-drawer-btn');
                const closeDrawerBtn = document.querySelector('.close-drawer-btn');
                const drawer = document.querySelector('.drawer');
                const overlay = document.querySelector('.overlay');
                const clickSaveLights = document.querySelector('.clickSaveLights');
                const clickDeleteLights = document.querySelector('.clickDeleteLights');

                openDrawerBtn.addEventListener('click', function() {
                drawer.classList.add('open');
                overlay.classList.add('open');
                });
                closeDrawerBtn.addEventListener('click', function() {
                drawer.classList.remove('open');
                overlay.classList.remove('open');
                });
                overlay.addEventListener('click', function() {
                drawer.classList.remove('open');
                overlay.classList.remove('open');
                bottomsheet.classList.remove('open');
                });

                if (localStorage.trafficLights){
                    console.log(localStorage.trafficLights);
                    let traffic = JSON.parse(localStorage.trafficLights);
                    for (let t in traffic){
                        let traf = traffic[t];
                        console.log(traf);
                        let poss = (traf.cords);
                        temporaryLight = new TrafficLight(traf.cords[0],traf.cords[1]);
                        temporaryLight.startGreen();
                        temporaryLight.startRed();
                        temporaryLight.greenStartTime = traf.greenStartTime;
                        temporaryLight.redStartTime = traf.redStartTime;
                        temporaryLight.secondRedStartTime = traf.secondRedStartTime;
                        temporaryLight.secondGreenStartTime = traf.secondGreenStartTime;
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
                    }
                }

                const closeBottomsheetBtn = document.querySelector('.close-bottomsheet-btn');
                const bottomsheet = document.querySelector('.bottomsheet');

                closeBottomsheetBtn.addEventListener('click', function() {
                    bottomsheet.classList.remove('open');
                });
                
                clickSaveLights.addEventListener('click', function(){
                    let tr = convertTrafficLights(trafficLights);
                    localStorage.trafficLights = JSON.stringify(tr);
                });
                
                clickDeleteLights.addEventListener('click', function(){
                    localStorage.trafficLights = '';
                    app.renderView('DeleteActivity');
                });
                `,
    }
]


const redLightStep3 = function(){
    temporaryLight.startSecondRed();
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
    document.querySelector('.bottomsheet').classList.remove('open');
}

const redLightStep2 = function(){
    temporaryLight.startGreen();
    document.querySelector('.bottomsheet').classList.remove('open');
    document.querySelector('.bottomsheet').innerHTML = '<div class="mgff_close" onclick="closeBottom()"></div>' +
                                                                   '<div class="bottomSheetTitle">Step 3/3</div>' +
                                                                   '<div class="bottomSheetTitle">Create new traffic light</div>' +
                                                                   '<div class="bottomSheetText">Press red light started, when the traffic light becomes red</div>' +
                                                                   '<a class="bottomSheetButton" style="background: #FF5F5F;" onclick="redLightStep3()">Red light started</a>' +
                                                                   '<a class="bottomSheetButton" style="background: #000000;" onclick="makeInitialLights()">Start from beginning</a>';
    document.querySelector('.bottomsheet').classList.add('open');
}

const redLightStep = function(){
    temporaryLight.startRed();
    document.querySelector('.bottomsheet').classList.remove('open');
    document.querySelector('.bottomsheet').innerHTML = '<div class="mgff_close" onclick="closeBottom()"></div>' +
                                                                   '<div class="bottomSheetTitle">Step 2/3</div>' +
                                                                   '<div class="bottomSheetTitle">Create new traffic light</div>' +
                                                                   '<div class="bottomSheetText">Press green light started, when the traffic light becomes green</div>' +
                                                                   '<a class="bottomSheetButton" style="background: #00BD00;" onclick="redLightStep2()">Green light started</a>' +
                                                                   '<a class="bottomSheetButton" style="background: #000000;" onclick="makeInitialLights()">Start from beginning</a>';
    document.querySelector('.bottomsheet').classList.add('open');
}

const chooseRedLight = function(){
    temporaryLight = new TrafficLight(coordinates[0], coordinates[1]);
    temporaryLight.cords = coordinates;
    document.querySelector('.bottomsheet').classList.remove('open');
    document.querySelector('.bottomsheet').innerHTML = '<div class="mgff_close" onclick="closeBottom()"></div>' +
                                                                   '<div class="bottomSheetTitle">Step 1/3</div>' +
                                                                   '<div class="bottomSheetTitle">Create new traffic light</div>' +
                                                                   '<div class="bottomSheetText">Press red light started, when the traffic light becomes red</div>' +
                                                                   '<a class="bottomSheetButton" style="background: #FF5F5F;" onclick="redLightStep()">Red light started</a>' +
                                                                   '<a class="bottomSheetButton" style="background: #000000;" onclick="makeInitialLights()">Start from beginning</a>';
    document.querySelector('.bottomsheet').classList.add('open');
}

const makeInitialLights = function(){
    temporaryLight = new TrafficLight(coordinates[0], coordinates[1]);
    temporaryLight.cords = coordinates;
    document.querySelector('.bottomsheet').innerHTML = '<div class="mgff_close" onclick="closeBottom()"></div>' +
                                                       '<div class="bottomSheetTitle">Create new traffic light</div>' +
                                                       '<div class="bottomSheetText">Which light is now?</div>' +
                                                       '<div class="bottomSheetImages">' +
                                                       '    <img src="/assets/images/red-light-btn.svg" onclick="chooseGreenLight()"/>' +
                                                       '    <img src="/assets/images/green-light-btn.svg" onclick="chooseRedLight()"/>' +
                                                       '</div>';
}

const chooseGreenLight = function(){
    temporaryLight = new TrafficLight(coordinates[0], coordinates[1]);
    temporaryLight.cords = coordinates;
    document.querySelector('.bottomsheet').classList.remove('open');
    document.querySelector('.bottomsheet').innerHTML = '<div class="mgff_close" onclick="closeBottom()"></div>' +
                                                                   '<div class="bottomSheetTitle">Step 1/3</div>' +
                                                                   '<div class="bottomSheetTitle">Create new traffic light</div>' +
                                                                   '<div class="bottomSheetText">Press green light started, when the traffic light becomes green</div>' +
                                                                   '<a class="bottomSheetButton" style="background: #00BD00;" onclick="greenLightStep()">Green light started</a>' +
                                                                   '<a class="bottomSheetButton" style="background: #000000;" onclick="makeInitialLights()">Start from beginning</a>';
    document.querySelector('.bottomsheet').classList.add('open');
}

const greenLightStep = function(){
    temporaryLight.startGreen();
    document.querySelector('.bottomsheet').classList.remove('open');
    document.querySelector('.bottomsheet').innerHTML = '<div class="mgff_close" onclick="closeBottom()"></div>' +
                                                                   '<div class="bottomSheetTitle">Step 2/3</div>' +
                                                                   '<div class="bottomSheetTitle">Create new traffic light</div>' +
                                                                   '<div class="bottomSheetText">Press red light started, when the traffic light becomes red</div>' +
                                                                   '<a class="bottomSheetButton" style="background: #FF5F5F;" onclick="greenLightStep2()">Red light started</a>' +
                                                                   '<a class="bottomSheetButton" style="background: #000000;" onclick="makeInitialLights()">Start from beginning</a>';
    document.querySelector('.bottomsheet').classList.add('open');
}

const greenLightStep2 = function(){
    temporaryLight.startRed();
    document.querySelector('.bottomsheet').classList.remove('open');
    document.querySelector('.bottomsheet').innerHTML = '<div class="mgff_close" onclick="closeBottom()"></div>' +
                                                                   '<div class="bottomSheetTitle">Step 3/3</div>' +
                                                                   '<div class="bottomSheetTitle">Create new traffic light</div>' +
                                                                   '<div class="bottomSheetText">Press green light started, when the traffic light becomes green</div>' +
                                                                   '<a class="bottomSheetButton" style="background: #00BD00;" onclick="greenLightStep3()">Green light started</a>' +
                                                                   '<a class="bottomSheetButton" style="background: #000000;" onclick="makeInitialLights()">Start from beginning</a>';
    document.querySelector('.bottomsheet').classList.add('open');
}

const greenLightStep3 = function(){
    temporaryLight.startSecondGreen();
    let latlong = document.querySelector('.geo-title').getAttribute('latlong');
    let poss = coordinates;
    temporaryLight.markers = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
          image: new ol.style.Icon({
            anchor: [0.5, 1],
            src: '/assets/images/green-light.png'
          })
        })
    });
    map.addLayer(temporaryLight.markers);
    temporaryLight.marker = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat(poss)));
    temporaryLight.markers.getSource().addFeature(temporaryLight.marker);
    trafficLights[trafficLights.length] = temporaryLight;
    document.querySelector('.bottomsheet').classList.remove('open');
}