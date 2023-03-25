// Constants
const GREEN_TIME = 30; // seconds
const RED_TIME = 30; // seconds

class TrafficLight {
  constructor(lattitude, longtitude) {
    this.lattitude = lattitude;
    this.longtitude = longtitude;
    this.isGreenLight = false;
    this.nextIntervals = [];
    this.greenStartTime = null;
    this.redStartTime = null;
    this.elementID = null;
    this.marker = null;
    this.markers = null;
    this.vectorLayer = null;
    this.cords = [];
  }

  updateLight(color) {
    switch (color) {
      case 'red':
        try{
          let newStyle = new ol.style.Style({
            image: new ol.style.Icon({
              anchor: [0.5, 1],
              src: '/assets/images/red-light.png'
            })
          });
          this.marker.setStyle(newStyle);
        }catch (e){console.log(e)}
        break;
      case 'yellow':
        try{
          let newStyle = new ol.style.Style({
            image: new ol.style.Icon({
              anchor: [0.5, 1],
              src: '/assets/images/yellow-light.png'
            })
          });
          this.marker.setStyle(newStyle);
        }catch (e){console.log(e)}
        break;
      case 'green':
        try{
          let newStyle = new ol.style.Style({
            image: new ol.style.Icon({
              anchor: [0.5, 1],
              src: '/assets/images/green-light.png'
            })
          });
          this.marker.setStyle(newStyle);
        }catch (e){console.log(e)}
        break;
    }
  }

  calculateTimeLeft(startTime, colorTime) {
    const now = Date.now();
    const elapsedTime = Math.floor((now - startTime) / 1000); // in seconds
    const timeLeft = colorTime - elapsedTime;
    return timeLeft;
  }

  setColor() {
    const now = Date.now();
    if (this.isGreenLight) {
      const timeLeft = this.calculateTimeLeft(this.greenStartTime, GREEN_TIME);
      if (timeLeft <= 0) {
        this.isGreenLight = false;
        this.updateLight('yellow');
        setTimeout(() => {
          this.startRed();
        }, 2000);
      } else {
        this.updateLight('green');
      }
    } else {
      const timeLeft = this.calculateTimeLeft(this.redStartTime, RED_TIME);
      if (timeLeft <= 0) {
        this.isGreenLight = true;
        let nextIntervals = [];
        this.greenStartTime = Date.now();
        this.updateLight('green');
      } else if (timeLeft <= 5) {
        this.updateLight('yellow');
      } else {
        this.updateLight('red');
      }
    }
  }

  startGreen() {
    this.isGreenLight = true;
    this.greenStartTime = Date.now();
    this.setColor();
    setInterval(() => {
      this.setColor();
    }, 1000);
    return this.greenStartTime;
  }

  startRed() {
    this.isGreenLight = false;
    this.redStartTime = Date.now();
    this.setColor();
    setInterval(() => {
      this.setColor();
    }, 1000);
    return this.redStartTime;
  }
}

function convertTrafficClass(classObject){
  let jsonObject = {
      lattitude: classObject.lattitude,
      longtitude: classObject.longtitude,
      isGreenLight: classObject.isGreenLight,
      nextIntervals: classObject.nextIntervals,
      greenStartTime: classObject.greenStartTime,
      redStartTime: classObject.redStartTime,
      elementID: classObject.elementID,
      cords: classObject.cords,
  };
  return jsonObject;
}

function convertTrafficLights(lights){
  let arrayJSON = [];
  for (let l in lights){
    let light = lights[l];
    arrayJSON[arrayJSON.length] = convertTrafficClass(light);
  }
  return arrayJSON;
}

function closeBottom(){
  document.querySelector('.bottomsheet').classList.remove('open');
}