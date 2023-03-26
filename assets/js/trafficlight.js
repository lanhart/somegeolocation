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
    this.secondGreenStartTime = null;
    this.secondRedStartTime = null;
    this.elementID = null;
    this.marker = null;
    this.markers = null;
    this.vectorLayer = null;
    this.cords = [];
  }

  updateLight(color) {
      try{
        let newStyle = new ol.style.Style({
          image: new ol.style.Icon({
            anchor: [0.5, 1],
            src: `/assets/images/${color}-light.png`
          })
        });
        this.marker.setStyle(newStyle);
      }catch (e){console.log(e)}
  }

  /*
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
  */

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
      let timeLeft = this.calculateTimeLeft(this.redStartTime, RED_TIME);
      if (timeLeft <= 0) {
        this.isGreenLight = true;
        this.greenStartTime = Date.now();
        this.updateLight('green');
        timeLeft = GREEN_TIME;
        if (this.secondGreenStartTime !== null) {
          const secondTimeLeft = this.calculateTimeLeft(this.secondGreenStartTime, GREEN_TIME);
          if (secondTimeLeft > 0 && secondTimeLeft < timeLeft) {
            this.isGreenLight = false;
            this.secondGreen();
            return;
          }
        }
        let nextIntervals = [];
        if (this.secondRedStartTime !== null) {
          const timeSinceLastRed = Math.floor((this.greenStartTime - this.secondRedStartTime) / 1000);
          if (timeSinceLastRed <= GREEN_TIME) {
            const timeLeft = GREEN_TIME - timeSinceLastRed;
            nextIntervals.push(timeLeft);
          }
        }
        this.greenStartTime = Date.now();
        this.isGreenLight = true;
        this.setColor();
        setInterval(() => {
          this.setColor();
        }, 1000);
        return this.greenStartTime;
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

  secondGreen() {
    this.isGreenLight = true;
    this.greenStartTime = this.secondGreenStartTime;
    this.secondGreenStartTime = null;
    this.updateLight('green');
  }

  startSecondGreen() {
    this.secondGreenStartTime = Date.now();
    this.setColor();
  }

  startSecondRed() {
    this.secondRedStartTime = Date.now();
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
      secondGreenStartTime : classObject.secondGreenStartTime,
      secondRedStartTime: classObject.secondRedStartTime,
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