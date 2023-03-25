var coordinates=[];
var trafficLights = [];
var errorCall = false;
var isCalling = false;

var app = new PageView(this.location.pathname, 'GET', '.app');
app.views = pages;
app.renderView('MainActivity');