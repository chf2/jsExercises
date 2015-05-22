Function.prototype.myBind = function (context) {
  var fn = this;
  return function () {
    fn.apply(context);
  };
};

function UFCFighter(name) {
  this.name = name,
  this.smack = function () {
    console.log("I AM " + this.name);
  };
}

var charles = new UFCFighter("charles");
charles.smack();
setTimeout(charles.smack.myBind(charles), 2000);
