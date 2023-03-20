// координаты начальной точки
var startCoords = [63.81847, 67.272628];

// координаты конечной точки
var endCoords = [36.2827372, 93.4836472];

// создаем карту
var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat(startCoords),
    zoom: 4
  })
});

// добавляем маршрут на карту
var routeLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: [
      new ol.Feature({
        geometry: new ol.geom.LineString([
          ol.proj.fromLonLat(startCoords),
          ol.proj.fromLonLat(endCoords)
        ])
      })
    ]
  }),
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      width: 3,
      color: [255, 0, 0, 1]
    })
  })
});

map.addLayer(routeLayer);
