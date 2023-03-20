var coordinates=[];
var trafficLights = [];

var app = new PageView(this.location.pathname, 'GET', '.app');
app.views = pages;
app.renderView('MainActivity');