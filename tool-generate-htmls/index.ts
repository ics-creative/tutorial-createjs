///<reference path="typings/bundle.d.ts" />

var fs = require("fs");
var path = require("path");
var childProcess = require("child_process");
var marked = require("marked");
var hilight = require("highlight");
var mkdirp = require("mkdirp");
var promises: any = [];
let githubUrl = "https://github.com/ics-creative/tutorial-createjs/"
var samplesUrl = "https://ics-creative.github.io/tutorial-createjs/";
var samplesHtmlUrl = "https://github.com/ics-creative/tutorial-createjs/blob/master/";

var renderer = new marked.Renderer();

renderer.link = ( href:string,  title:string,  text:string) =>{
	console.log("href:" + href);
	
	var sampledIndex = href.indexOf("samples/");
	var absolutePass = href.indexOf("http") == 0;
	if(!absolutePass && sampledIndex >= 0){
		href = samplesHtmlUrl + href.slice( sampledIndex);
	} else {
		if( !absolutePass && href.indexOf( "md")) {
			href=href.replace("md","html");
		}
	}
	
	var htmlHref = (href != null && href != "") ? " href=\"" +href+ "\" " : "";
	var htmlTitle = (title != null && title != "") ? " title=\"" +title+ "\" " : "";
	
	return "<a" + htmlHref + htmlTitle + ">" + text + "</a>";
};


renderer.image = ( href:string,  title:string,  text:string) =>{
	console.log("imgs:" + href);
	
	var absolutePass = href.indexOf("http") == 0;
	var sampledIndex = href.indexOf("../imgs/");
	if(!absolutePass && sampledIndex >= 0){
		href = samplesUrl + href.slice( sampledIndex + "../".length);
	}
	
	var htmlHref = (href != null && href != "") ? " src=\"" +href+ "\" " : "";
	var htmlTitle = (title != null && title != "") ? " title=\"" +title+ "\" " : "";
	
	return "<img" + htmlHref + htmlTitle + ">" + text + "</a>";
};

marked.setOptions({
	/*highlight: (code: string) => {
		return hilight.hilight(code).value;
	}*/
	renderer:renderer
});


var generateHTML = (dirName:string, fileName: string, resolve: Function) => {
	fs.readFile("../" + dirName + fileName, "utf8", (error: any, text: string) => {

		if (error) {
			return;
		}
		let textValue = marked(text);
	
		fs.writeFile("../html/" + dirName + fileName.replace("md", "html"), textValue, (error: any) => {
			console.log(fileName + "- maked");
			if (error) {
				return;
			}
			resolve();
		});
	});
};

fs.readdir("../docs", (err: NodeJS.ErrnoException, files: string[]): void => {

	promises.push(new Promise((resolve: Function) => {

		mkdirp("../html/docs/", function(err: any) {
			if (err) {
				console.error("mkdir-error" + err);
			} else {
				resolve();
			}
		});

	}))

	promises.push( new Promise((resolve: Function) => {
		console.log("Readme.md");
		generateHTML("","ReadMe.md", resolve);
	}));
	
	for (var i = 0; i < files.length; i++) {
		var filename = files[i];

		let childPromise = new Promise((resolve: Function) => {
			generateHTML("docs/", filename, resolve);
		});

		promises.push(childPromise);
	}

	Promise
		.all(promises)
		.then((results) => {
			console.log("finish!!!");
		});
});
