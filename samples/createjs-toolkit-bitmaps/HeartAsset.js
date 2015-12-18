(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 550,
	height: 400,
	fps: 24,
	color: "#FFFFFF",
	manifest: [
		{src:"images/hoge.png", id:"hoge"},
		{src:"images/piyo.png", id:"piyo"}
	]
};



// symbols:



(lib.hoge = function() {
	this.initialize(img.hoge);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,145,88);


(lib.piyo = function() {
	this.initialize(img.piyo);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,98,100);


// stage content:
(lib.HeartAsset = function() {
	this.initialize();

	// piyo
	this.instance = new lib.piyo();
	this.instance.setTransform(115.2,108.8);

	// hoge
	this.instance_1 = new lib.hoge();
	this.instance_1.setTransform(221,137);

	this.addChild(this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(390.2,308.8,250.8,116.3);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;