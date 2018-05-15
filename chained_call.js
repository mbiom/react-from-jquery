// Below is a tr object with six methods.
// Each method takes a callback and after some amount of time will execute that callback 
// For ease of testing, it will also console.log a value.

// At the bottom of the page the expected output is logged.
// We invoke the chained call of the tr object. 
// However the tr object does not yet have a chained api.

// Add a chained api to the tr object by only modifying the code in the middle of the page.

// A good answer should include the following criteria.
// 1. Code was only added between the below comments.
// 2. Each method in the chain executes only after the previous method has resolved
// 3. Your solution should be flexible to rearranging the methods or changing the timeouts.
// 4. Your solution should not change the behavior/side affects of the original methods. 

// You should assume that you don't know how the methods on the tr object are implemented. 
// Only that they may or may not be asynchronous and and that they take a callback
// that will be called when the action is completed.

function Tr(){};

Tr.prototype.takeoff = function takeoff(callback) {
 setTimeout(function() {
   callback()
   console.log('Took off');
 }, 600);
};
Tr.prototype.turnOnCamera = function turnOnCamera(callback) {
 setTimeout(function() {
   callback()
   console.log('Camera turned on');
 }, 1000);
};
Tr.prototype.pointDownGimbal = function pointDownGimbal(callback) {
 setTimeout(function() {
   callback()
   console.log('Gimbal pointing down');
 }, 750);
};
Tr.prototype.flyToMission = function FlyToMission(callback) {
 setTimeout(function() {
   callback()
   console.log('Flown to mission');
 }, 2000);
};
Tr.prototype.takePhoto = function takePhoto(callback) {
 setTimeout(function() {
   callback()
   console.log('Photo taken');
 }, 500);
};
Tr.prototype.land = function land(callback) {
 setTimeout(function() {
   callback()
   console.log('Landed');
 }, 3000);
};
// DON'T MODIFY ANYTHING ABOVE HERE

// START ADD YOUR CODE HERE

var tr = new Tr();

var promisedFunction = function (fn) {
 return new Promise(resolve => fn(resolve));
};

var asyncfunction = async function (fn) {
 try {
  await promisedFunction(fn);
    return this;
  }
  catch (e) {
   throw(e);
  }
}

tr.takeoff = function () {
 this.mypromise = asyncfunction(Tr.prototype.takeoff);
 return this;
}

tr.turnOnCamera = function () {
 this.mypromise = this.mypromise.then(() => asyncfunction(Tr.prototype.turnOnCamera))
 return this;
}

tr.pointDownGimbal = function () {
 this.mypromise = this.mypromise.then(() => asyncfunction(Tr.prototype.pointDownGimbal))
 return this;
}
tr.flyToMission = function () {
 this.mypromise = this.mypromise.then(() => asyncfunction(Tr.prototype.flyToMission))
 return this;
}
tr.takePhoto = function () {
 this.mypromise = this.mypromise.then(() => asyncfunction(Tr.prototype.takePhoto))
 return this;
}
tr.land = function () {
 this.mypromise = this.mypromise.then(() => asyncfunction(Tr.prototype.land))
 return this;
}



// END ADD YOUR CODE HERE

//DONT MODIFY ANYTHING BELOW HERE
console.log("Expected Output:")
console.log("Took off");
console.log("Camera turned on");
console.log("Gimbal pointing down");
console.log("Flown to mission");
console.log("Photo taken");
console.log("Landed");

console.log("\n\nActual Output:");
tr.takeoff().turnOnCamera().pointDownGimbal().flyToMission().takePhoto().land(); 