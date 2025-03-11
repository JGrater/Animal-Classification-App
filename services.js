"use strict";
// JavaScript and Computer Vision Teachable Machine,

var animalModelURL = 'https://teachablemachine.withgoogle.com/models/_yvYN5FuH/'; //path to the model

var vertebrateModelURL = 'https://teachablemachine.withgoogle.com/models/e3f91EDyv/';
var invertebrateModelURL = 'https://teachablemachine.withgoogle.com/models/csbJVmpOC/'; 

var amphibiaModelURL = 'https://teachablemachine.withgoogle.com/models/QW3F9onaO/';
var arachnidaModelURL = 'https://teachablemachine.withgoogle.com/models/goyzPnce-/';
var avesModelURL = 'https://teachablemachine.withgoogle.com/models/IVE2-bKy1/';
var cephalopodaModelURL = 'https://teachablemachine.withgoogle.com/models/cvrdfMxe2/';
var cnidariaModelURL = 'https://teachablemachine.withgoogle.com/models/UucHvyXNh/';
var crustaceaModelURL = 'https://teachablemachine.withgoogle.com/models/L6kqRLrwZ/';
var echinodermataModelURL = 'https://teachablemachine.withgoogle.com/models/41fn1cPYe/';
var fishModelURL = 'https://teachablemachine.withgoogle.com/models/e-XIvAU-i/';
var insectaModelURL = 'https://teachablemachine.withgoogle.com/models/XDwQKUO9o/';
var mammaliaModelURL = 'https://teachablemachine.withgoogle.com/models/OWkYKwRbM/';
var reptiliaModelURL = 'https://teachablemachine.withgoogle.com/models/fhMqxqc6E/';

var animal_classifier
var vertebrate_classifier, invertebrate_classifier;
var amphibia_classifier, aves_classifier, fish_classifier, mammalia_classifier, reptilia_classifier;
var arachnida_classifier, cephalopoda_classifier, cnidaria_classifier, crustacea_classifier, echinodermata_classifier, insecta_classifier;

var userImage;
var inputElement;

let input;
let img;

var animal_label = "", animal_confidence = 0;
var class_label = "", class_confidence = 0;
var order_label = "", order_confidence = 0;

var vertebrate_orders = {}

var invertebrate_orders = {}

function preload() {
	//p5 function
    try {
        vertebrate_orders = loadJSON('vertebrate_orders.json');
        invertebrate_orders = loadJSON('invertebrate_orders.json');
    } catch (error) {
        console.error(error);
    }

	animal_classifier = ml5.imageClassifier(animalModelURL + 'model.json');

	vertebrate_classifier = ml5.imageClassifier(vertebrateModelURL + 'model.json');
	invertebrate_classifier = ml5.imageClassifier(invertebrateModelURL + 'model.json');

	amphibia_classifier = ml5.imageClassifier(amphibiaModelURL + 'model.json');
	arachnida_classifier = ml5.imageClassifier(arachnidaModelURL + 'model.json');
	aves_classifier = ml5.imageClassifier(avesModelURL + 'model.json');	
	cephalopoda_classifier = ml5.imageClassifier(cephalopodaModelURL + 'model.json');
	cnidaria_classifier = ml5.imageClassifier(cnidariaModelURL + 'model.json');
	crustacea_classifier = ml5.imageClassifier(crustaceaModelURL + 'model.json');
	echinodermata_classifier = ml5.imageClassifier(echinodermataModelURL + 'model.json');
	fish_classifier = ml5.imageClassifier(fishModelURL + 'model.json');
	insecta_classifier = ml5.imageClassifier(insectaModelURL + 'model.json');
	mammalia_classifier = ml5.imageClassifier(mammaliaModelURL + 'model.json');
	reptilia_classifier = ml5.imageClassifier(reptiliaModelURL + 'model.json');	
}


function setup() {
    //p5 function to create a p5 canvas 
    var viewport = createCanvas(500, 400);
	viewport.parent('image_container'); //attach the p5 canvas to the target html div
    input = createFileInput(handleFile);
}


function classifyImage() {
	//ml5, classify current information stored in the camera object
	animal_classifier.classify(img, processAnimalResults);
	if (animal_label == "Vertebrate") {
		vertebrate_classifier.classify(img, processClassResults)
		if (class_label == "Amphibia") { amphibia_classifier.classify(img, processOrderResults) }
		else if (class_label == "Aves") { aves_classifier.classify(img, processOrderResults) }
		else if (class_label == "Fish") { fish_classifier.classify(img, processOrderResults) }
		else if (class_label == "Mammalia") { mammalia_classifier.classify(img, processOrderResults) }
		else if (class_label == "Reptilia") { reptilia_classifier.classify(img, processOrderResults) }
	} 
	else if (animal_label == "Invertebrate") {
		invertebrate_classifier.classify(img, processClassResults)
		if (class_label == "Arachnida") { arachnida_classifier.classify(img, processOrderResults) }
		else if (class_label == "Cephalopoda") { cephalopoda_classifier.classify(img, processOrderResults) }
		else if (class_label == "Cnidaria") { cnidaria_classifier.classify(img, processOrderResults) }
		else if (class_label == "Crustacea") { crustacea_classifier.classify(img, processOrderResults) }
		else if (class_label == "Echinodermata") { echinodermata_classifier.classify(img, processOrderResults) }
		else if (class_label == "Insecta") { insecta_classifier.classify(img, processOrderResults) }
	}
}


function processAnimalResults(error, results) {
	if (error) {
		console.error("classifier error: " + error);
	} else { //if no errors, grab the label and execute the classify function again
		animal_label = results[0].label; animal_confidence = results[0].confidence;
	}
}
function animalResults() {
	let result = "Please wait...";
	if(animal_label.length > 0) {
		if((animal_confidence*100).toFixed(0) >= 80) {
			result = "Animal is a " + animal_label + " (" + (animal_confidence*100).toFixed(0) + "%),"
		} else if ((animal_confidence*100).toFixed(0) >= 50) {
			result = "Animal is likely a " + animal_label + " (" + (animal_confidence*100).toFixed(0) + "%),"
		}

	}
	return result;
}


function processClassResults(error, results) {
	if (error) {
		console.error("classifier error: " + error);
	} else {
		class_label = results[0].label; class_confidence = results[0].confidence;
	}
}
function classResults() {
	let result = "Please wait...";
	if(class_label.length > 0) {
		if((class_confidence*100).toFixed(0) >= 80) {
			result = "it is a part of the " + class_label + " class (" + (class_confidence*100).toFixed(0) + "%),"
		} else if ((class_confidence*100).toFixed(0) >= 50) {
			result = "it is likely a part of the " + class_label + " class (" + (class_confidence*100).toFixed(0) + "%),"
		}

	}
	return result;
}


function processOrderResults(error, results) {
	if (error) {
		console.error("classifier error: " + error);
	} else {
		order_label = results[0].label; order_confidence = results[0].confidence;
	}
}
function orderResults() {
	let result = "Please wait...";
	if(order_label.length > 0) {
        if (order_label.includes("...")) {
            let shortened_label = order_label.replace("...", "");
            order_label = getFullOrderName(shortened_label);
        }

		if((order_confidence*100).toFixed(0) >= 80) {
			result = "and belongs to the " + order_label + " order/group (" + (order_confidence*100).toFixed(0) + "%)."
		} else if ((order_confidence*100).toFixed(0) >= 50) {
			result = "and likely belongs to the " + order_label + " order/group (" + (order_confidence*100).toFixed(0) + "%)."
		}

	}
	return result;
}


function getFullOrderName(shortened_label) {
    let fullOrderName = "Please wait...";
    if (animal_label == "Vertebrate") {
        const group = vertebrate_orders[class_label];
        const animal = group ? group.find(animal => animal.name.includes(shortened_label)) : null;
		fullOrderName = animal ? animal.name : "Order not found.";
    } else if (animal_label == "Invertebrate") {
        const group = invertebrate_orders[class_label];
        const animal = group ? group.find(animal => animal.name.includes(shortened_label)) : null;
		fullOrderName = animal ? animal.name : "Order not found.";
    }
    return fullOrderName;
}

async function descriptionResult() {
	let result = "Please wait...";
	if(class_label.length > 0 && order_label.length > 0) {
		let animal_order;
		animal_order = animal_label == "Vertebrate" ? vertebrate_orders : invertebrate_orders;
		try {
			result = await getDescription(animal_order, class_label, order_label);
		} catch (error) {
			console.error(error);
		}
	}
	document.getElementById("description").innerHTML = result;
}


function getDescription(animal_orders, animal_class, animal_order) {
	const group = animal_orders[animal_class];
    console.log("ANIMAL ORDER: ", animal_order)
	if (group) {
		const animal = group.find(animal => animal.name === animal_order);
		const animalDescription = animal ? animal.description : "Order not found.";
		return animalDescription;
	} else {
		throw new Error(`Group '${groupName}' not found.`);
	}
}


function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
  } else {
    img = null;
  }
}


function draw() {
  background(255);
  if (img) {
    image(img, 0, 0, width, height);
    classifyImage();
  }
  document.getElementById("animal_results").innerHTML = animalResults(); //update result string
  document.getElementById("class_results").innerHTML = classResults();
  document.getElementById("order_results").innerHTML = orderResults(); 
  descriptionResult();
}
