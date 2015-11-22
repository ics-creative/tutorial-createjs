(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 550,
	height: 400,
	fps: 24,
	color: "#FFFFFF",
	manifest: []
};



// symbols:



(lib.StarInside = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(15.6,1,1).p("AH1L3InylTIntFYICopCInflqIJZgTIDGo4IDKI2IJaANIncFvg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#FF0000","#FFFF00","#00FF00","#00FFFF","#0000FF","#FF00FF","#FF0000"],[0,0.165,0.365,0.498,0.667,0.831,1],-80.2,0,80.3,0).s().p("AlCC6InflqIJagTIDGo4IDJI2IJaANIncFuICvJBInzlTInsFYg");

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-88,-84.2,176.1,168.5);


(lib.Star = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.StarInside();

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:0.27,scaleY:0.27,rotation:135},28).to({scaleX:1,scaleY:1,rotation:0},31).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-88,-84.2,176.1,168.5);


// stage content:



(lib.StarAsset = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.Star();
	this.instance.setTransform(220.9,136.1);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(407.8,251.8,176.1,168.5);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;