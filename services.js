"use strict";
// Ada Boilerplate - JavaScript and Computer Vision Teachable Machine,
// Machine Learning & Teachable Machine Models

//for easy lets setup some quick global variables
var animalModelURL = 'https://teachablemachine.withgoogle.com/models/_yvYN5FuH/';

var vertebrateModelURL = 'https://teachablemachine.withgoogle.com/models/e3f91EDyv/';
var invertebrateModelURL = 'https://teachablemachine.withgoogle.com/models/csbJVmpOC/'; //variable used to hold path to the model

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
var vertebrate_classifier, invertebrate_classifier; //variable used to hold the classifier object
var amphibia_classifier, aves_classifier, fish_classifier, mammalia_classifier, reptilia_classifier;
var arachnida_classifier, cephalopoda_classifier, cnidaria_classifier, crustacea_classifier, echinodermata_classifier, insecta_classifier;

var userImage; //variable used to hold the image object
var inputElement;

let input;
let img;

var animal_label = "", animal_confidence = 0; //for ease and just because we're only demo'ing with two classes
var class_label = "", class_confidence = 0;
var order_label = "", order_confidence = 0;

var vertebrate_orders = {
    "Amphibia": [
        {
            "name": "Anura",
            "description": "The Anura include all modern frogs and any fossil species that fit within the anuran definition."
        },
        {
            "name": "Caudata",
            "description": "The Caudata are a group of amphibians containing the extant salamanders."
        }
    ],
    "Aves":[
        {
            "name": "Accipitriformes",
            "description": "The Accipitriformes are an order of birds that includes most of the diurnal birds of prey, including hawks, eagles, vultures, and kites, but not falcons."
        },
        {
            "name": "Anseriformes",
            "description": "Anseriformes is an order of birds also known as waterfowl that comprises about 180 living species of birds in three families, including ducks, geese, and swans."
        },
        {
            "name": "Apodiformes",
            "description": "Apodiformes contains three living families: the swifts (Apodidae), the treeswifts (Hemiprocnidae), and the hummingbirds (Trochilidae)."
        },
        {
            "name": "Charadriiformes",
            "description": "Charadriiformes is a diverse order of small to medium-large birds that live near water, includes waders, gulls, and auks."
        },
        {
            "name": "Columbiformes",
            "description": "Columbidae is a bird family consisting of doves and pigeons. It is the only family in the order Columbiformes."
        },
        {
            "name": "Falconiformes",
            "description": "The order Falconiformes is represented by the extant family Falconidae (falcons and caracaras) and a handful of enigmatic Paleogene species."
        },
        {
            "name": "Galliformes",
            "description": "Galliformes is an order of heavy-bodied ground-feeding birds that includes turkeys, chickens, quail, and other landfowl."
        },
        {
            "name": "Passeriformes",
            "description": "Passeriformes are the most familiar, typical birds and the term can be applied to more than half the world's unique bird species, including all the classic songbirds, sparrows, and finches."
        },
        {
            "name": "Pelecaniformes",
            "description": "The Pelecaniformes are an order of medium-sized and large waterbirds found worldwide, they encompass all birds that have feet with all four toes webbed."
        },
        {
            "name": "Phoenicopteriformes",
            "description": "Phoenicopteriformes is a group of water birds which comprises flamingos and their extinct relatives. "
        },
        {
            "name": "Piciformes",
            "description": "Piciformes is a group of largely arboreal birds, which includes the woodpeckers and close relatives, and toucans. They have zygodactyl feet."
        },
        {
            "name": "Procellariiformes",
            "description": "Procellariiformes is an order of seabirds that comprises four families: the albatrosses, the petrels and shearwaters, and two families of storm petrels."
        },
        {
            "name": "Psittaciformes",
            "description": "Parrots are birds of the roughly 398 species in 92 genera comprising the order Psittaciformes, found mostly in tropical and subtropical regions."
        },
        {
            "name": "Sphenisciformes",
            "description": "Penguins, order Sphenisciformes, are a group of aquatic flightless birds."
        },
        {
            "name": "Strigiformes",
            "description": "Owls are birds from the order Strigiformes, mostly solitary and nocturnal birds of prey typified by an upright stance, a large, broad head, binocular vision, binaural hearing, sharp talons, and feathers adapted for silent flight."
        },
        {
            "name": "Struthioniformes",
            "description": "Struthioniformes is an order of birds with only a single extant family, Struthionidae, containing the ostriches."
        }
    ],
    "Fish": [
        {
            "name": "Ray-Finned Fish",
            "description": "Actinopterygii, members of which are known as ray-finned fishes, is a class of bony fish. They comprise over 50% of living vertebrate species."
        },
        {
            "name": "Rays",
            "description": "Rays are the largest group of cartilaginous fishes, with well over 600 species in 26 families. Rays are distinguished by their flattened bodies, enlarged pectoral fins that are fused to the head, and gill slits that are placed on their ventral surfaces."
        },
        {
            "name": "Sharks",
            "description": "Sharks are a group of elasmobranch fish characterized by a cartilaginous skeleton, five to seven gill slits on the sides of the head, and pectoral fins that are not fused to the head."
        }
    ],
    "Mammalia": [
        {
            "name": "Artiodactyla",
            "description": "Artiodactyla, or cloven-hooved mammals, include such familiar animals as sheep, goats, camels, pigs, cows, deer, giraffes, and antelopes — most of the world's species of large land mammals are artiodactyls."
        },
        {
            "name": "Carnivora",
            "description": "Carnivora is an order of placental mammals that have specialized in primarily eating flesh, whose members are formally referred to as carnivorans. The order Carnivora is the fifth largest order of mammals, comprising at least 279 species."
        },
        {
            "name": "Cetacea",
            "description": "Cetaceans are an infraorder of aquatic mammals that includes whales, dolphins, and porpoises."
        },
        {
            "name": "Chiroptera",
            "description": "Bats are mammals of the order Chiroptera. With their forelimbs adapted as wings, they are the only mammals capable of true and sustained flight."
        },
        {
            "name": "Edentata",
            "description": "Edentata is a major clade of placental mammals native to the Americas. There are 31 living species: the anteaters, tree sloths, and armadillos."
        },
        {
            "name": "Eulipotyphia",
            "description": "Eulipotyphla comprises the hedgehogs and gymnures, solenodons, the desmans, moles, and shrew-like moles and true shrews."
        },
        {
            "name": "Lagomorpha",
            "description": "Lagomorpha, any member of the mammalian order made up of the relatively well-known rabbits and hares and also the less frequently encountered pikas."
        },
        {
            "name": "Marsupials",
            "description": "Marsupials are the group of mammals commonly thought of as pouched mammals."
        },
        {
            "name": "Monotremata",
            "description": "Monotremata, are egg-laying mammals, which includes the amphibious platypus and the terrestrial echidnas."
        },
        {
            "name": "Perissodactyla",
            "description": "Perissodactyls are odd-toed ungulates. Includes about 17 species including horses, asses, zebras, rhinoceroses, and tapirs."
        },
        {
            "name": "Pinnipedia",
            "description": "Pinnipeds commonly known as seals, are a widely distributed and diverse clade of carnivorous, fin-footed, semiaquatic, mostly marine mammals."
        },
        {
            "name": "Primates",
            "description": "A primate is any mammal of the group that includes lemurs, lorises, tarsiers, monkeys, apes, and humans."
        },
        {
            "name": "Proboscidea",
            "description": "The Proboscidea are a taxonomic order of afrotherian mammals containing one living Elephant family and several extinct families."
        },
        {
            "name": "Rodentia",
            "description": "Rodentia are characterized by a single pair of continuously growing incisors in each of the upper and lower jaws. Include mice, rats, squirrels, prairie dogs, porcupines, beavers, guinea pigs, and hamsters."
        },
        {
            "name": "Sirenia",
            "description": "The Sirenia, commonly referred to as sea cows or sirenians, are an order of fully aquatic, herbivorous mammals that inhabit swamps, rivers, estuaries, marine wetlands, and coastal marine waters."
        }
    ],
    "Reptilia": [
        {
            "name": "Crocodilia",
            "description": "Crocodilia is an order of mostly large, predatory, semiaquatic reptiles, known as crocodilians. They first appeared 95 million years ago in the Late Cretaceous period and are the closest living relatives of birds."
        },
        {
            "name": "Squamata",
            "description": "Squamata is the largest order of reptiles, comprising lizards, snakes, and worm lizards, which are collectively known as squamates or scaled reptiles."
        },
        {
            "name": "Testudines",
            "description": "The order testudines is a monophyletic clade containing 260 species of extant turtles, terrapins and tortoises in 13 families."
        }
    ]
}

var invertebrate_orders = {
    "Arachnida": [
        {
            "name": "Araneae",
            "description": "Spiders are air-breathing arthropods that have eight legs, chelicerae with fangs generally able to inject venom, and spinnerets that extrude silk. They are the largest order of arachnids and rank seventh in total species diversity among all orders of organisms."
        },
        {
            "name": "Scorpiones",
            "description": "Scorpions are predatory arachnids. They have eight legs, and are easily recognized by a pair of grasping pincers and a narrow, segmented tail, often carried in a characteristic forward curve over the back and always ending with a stinger."
        }
    ],
    "Cnidaria":[
        {
            "name": "Anthozoa",
            "description": "Anthozoa is a class of marine invertebrates which includes the sea anemones, stony corals and soft corals. Adult anthozoans are almost all attached to the seabed, while their larvae can disperse as part of the plankton."
        },
        {
            "name": "Medusozoa",
            "description": "Medusozoa is a clade in the phylum Cnidaria. Medusozoans are distinguished by having a medusa stage in their often complex life cycle, a medusa typically being an umbrella-shaped body with stinging tentacles around the edge."
        }
    ],
    "Crustacea": [
        {
            "name": "Crab",
            "description": "Crabs are decapod crustaceans. They live in all the world's oceans, in freshwater, and on land, are generally covered with a thick exoskeleton, and have a single pair of pincers. They first appeared during the Jurassic Period."
        },
        {
            "name": "Crayfish",
            "description": "Crayfish are freshwater crustaceans belonging to the clade Astacidea, which also contains lobsters. Some species are found in brooks and streams, where fresh water is running, while others thrive in swamps, ditches, and paddy fields."
        },
        {
            "name": "Lobster",
            "description": "Lobsters are a family of marine crustaceans. They have long bodies with muscular tails and live in crevices or burrows on the sea floor. Three of their five pairs of legs have claws, including the first pair, which are usually much larger than the others."
        }
    ],
    "Echinodermata": [
        {
            "name": "Asterozoa",
            "description": "The Asterozoa are a subphylum in the phylum Echinodermata. Characteristics include a star-shaped body and radially divergent axes of symmetry. Includes the starfish, the brittle stars, and basket stars."
        },
        {
            "name": "Echinozoa",
            "description": "Echinozoa is a subphylum of free-living echinoderms in which the body is or originally was a modified globe with meridional symmetry. Echinozoans lack arms, brachioles, or other appendages, and do not at any time exhibit pinnate structure. Their two extant classes are the sea urchins and the sea cucumbers. "
        }
    ],
    "Insecta": [
        {
            "name": "Blattodea",
            "description": "Blattodea is an order of insects that contains cockroaches and termites."
        },
        {
            "name": "Coleoptera",
            "description": "Beetles are insects that form the order Coleoptera. Their front pair of wings are hardened into wing-cases, elytra, distinguishing them from most other insects."
        },
        {
            "name": "Diptera",
            "description": "Flies are insects of the order Diptera. Insects of this order use only a single pair of wings to fly, the hindwings having evolved into advanced mechanosensory organs known as halteres, which act as high-speed sensors of rotational movement and allow dipterans to perform advanced aerobatics."
        },
        {
            "name": "Hymenoptera",
            "description": "Hymenoptera is a large order of insects, comprising the sawflies, wasps, bees, and ants. Over 150,000 living species of Hymenoptera have been described, in addition to over 2,000 extinct ones. Many of the species are parasitic."
        },
        {
            "name": "Larvae",
            "description": "Larvae is the active immature form of an insect, especially one that differs greatly from the adult and forms the stage between egg and pupa, for example a caterpillar or grub."
        },
        {
            "name": "Lepidoptera",
            "description": "Lepidoptera is an order of insects that includes butterflies and moths. About 180,000 species of the Lepidoptera are described, in 126 families and 46 superfamilies, 10 percent of the total described species of living organisms. It is one of the most widespread and widely recognizable insect orders in the world."
        },
        {
            "name": "Odonata",
            "description": "Odonata is an order of flying insects that includes the dragonflies and damselflies. The adults are easily recognized by their two pairs of narrow, transparent wings, sloping thorax, and long, usually slender body; the abdomen is almost always longer than any of the wings."
        },
        {
            "name": "Orthoptera",
            "description": "Orthoptera is an order of insects that comprises the grasshoppers, locusts, and crickets. The insects in the order have incomplete metamorphosis, and produce sound by rubbing their wings against each other or their legs, the wings or legs containing rows of corrugated bumps"
        }
    ],
    "Cephalopoda": [
        {
            "name": "Decapodiformes",
            "description": "Decapodiformes is a superorder comprising all cephalopod species with ten limbs, specifically eight short arms and two long tentacles. Made up of squids and cuttlefish."
        },
        {
            "name": "Nautilida",
            "description": "The nautilus is a pelagic marine mollusc of the cephalopod family Nautilidae. Nautilidae, both extant and extinct, are characterized by involute or more or less convolute shells that are generally smooth, with compressed or depressed whorl sections, straight to sinuous sutures, and a tubular, generally central siphuncle."
        },
        {
            "name": "Octopoda",
            "description": "An octopus is a soft-bodied, eight-limbed mollusc of the order Octopoda. The order consists of some 300 species. An octopus is bilaterally symmetric with two eyes and a beaked mouth at the center point of the eight limbs. The soft body can radically alter its shape, enabling octopuses to squeeze through small gaps."
        }
    ]
}

// START SERVER TO USE ---> http-server -c-1

function getDescription(animal_orders, animal_class, animal_order) {
	console.log(animal_orders)
	const group = animal_orders[animal_class];
	if (group) {
		const animal = group.find(animal => animal.name === animal_order);
		const animalDescription = animal ? animal.description : "Order not found.";
		return animalDescription;
	} else {
		throw new Error(`Group '${groupName}' not found.`);
	}
}

function preload() {
	//p5 function - this function is automatically called by the p5 library, once only
	animal_classifier = ml5.imageClassifier(animalModelURL + 'model.json'); //load the model!

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
    var viewport = createCanvas(500, 400);//p5 function to create a p5 canvas 
	viewport.parent('image_container'); //attach the p5 canvas to the target html div

    input = createFileInput(handleFile);
}

function classifyImage() {
	//ml5, classify the current information stored in the camera object
	animal_classifier.classify(img, processAnimalResults); //once complete execute a callback to the processresults function
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
	//a simple way to return the current classification details
	if (error) { //something seems to have gone wrong
		console.error("classifier error: " + error);
	} else { //no errors detected, so lets grab the label and execute the classify function again
		animal_label = results[0].label; animal_confidence = results[0].confidence;
	}
}

function animalResults() {
	//a simple way to return the current classification details
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
	//a simple way to return the current classification details
	if (error) { //something seems to have gone wrong
		console.error("classifier error: " + error);
	} else { //no errors detected, so lets grab the label and execute the classify function again
		class_label = results[0].label; class_confidence = results[0].confidence;
	}
}

function classResults() {
	//a simple way to return the current classification details
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
	//a simple way to return the current classification details
	if (error) { //something seems to have gone wrong
		console.error("classifier error: " + error);
	} else { //no errors detected, so lets grab the label and execute the classify function again
		order_label = results[0].label; order_confidence = results[0].confidence;
	}
}

function orderResults() {
	//a simple way to return the current classification details
	let result = "Please wait...";
	if(order_label.length > 0) {
		if((order_confidence*100).toFixed(0) >= 80) {
			result = "and belongs to the " + order_label + " order/group (" + (order_confidence*100).toFixed(0) + "%)."
		} else if ((order_confidence*100).toFixed(0) >= 50) {
			result = "and likely belongs to the " + order_label + " order/group (" + (order_confidence*100).toFixed(0) + "%)."
		}

	}
	return result;
}

async function descriptionResult() {
	//a simple way to return the current classification details
	let result = "Please wait...";
	if(class_label.length > 0 && order_label.length > 0) {
		let animal_order;
		animal_label == "Vertebrate" ? animal_order = vertebrate_orders : animal_order = invertebrate_orders;
		try {
			result = await getDescription(animal_order, class_label, order_label);
		} catch (error) {
			console.error(error);
		}
	}
	document.getElementById("description").innerHTML = result;
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
  document.getElementById("animal_results").innerHTML = animalResults(); //update the result string
  document.getElementById("class_results").innerHTML = classResults(); //update the result string
  document.getElementById("order_results").innerHTML = orderResults(); //update the result string
  descriptionResult();
}
