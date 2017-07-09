var words = ["Albarino", "Barbera", "Blush", "Bordeaux", "Cabernet Franc", "Cabernet Sauvignon", "Carmenere", "Chambourcin", "Champagne", "Chardonnay", "Chenin Blanc", "Chianti", "Eiswein", "Gewurztraminer", "Grappa", "Grenache", "Lambrusco", "Malbec",  "Marsala", "Meritage", "Merlot","Moscato", "Muscat","Petit Verdot", "Petite Sirah", "Pinot Blanc", "Pinot Grigio", "Pinot Noir", "Pinotage", "Prosecco", "Sangiovese", "Sauvignon Blanc", "Schiava", "Shiraz", "Semillon", "Sherry", "Soave", "Tannat", "Tempranillo", "Torrontes", "Trebbiano", "Valpolicella", "Verdejo", "Verdicchio", "Vinho Verde", "Viognier", "Zinfandel", "grapes", "blend", "varietals", "barrels", "bottle", "cellar", "vineyard", "California", "France", "Italy", "Spain", "Argentina", "Australia", "corkscrew", "sangria", "tannins", "vermouth", "vintage", "sommelier", "tasting"];
var hiddenWord;
var guesses;
var score;
var chosenWord;
var hiddenArray

//how the game starts - reset guesses, choose a random word, present its hashed value to the user
function gameStart() {
	guesses = 20;
	var wordIndex = Math.floor(Math.random() * words.length + 1);
	chosenWord = words[wordIndex].toLowerCase().split("");
	var hideWord = "_ ";
	hiddenWord = hideWord.repeat(chosenWord.length).split(" ");
	hiddenArray = hiddenWord;
	document.getElementById("hiddenWord").innerHTML = hiddenWord.join(" ");
}


function gamePlay() {
	var letterIndex = [];
	var usedLetters = [];

	//when a user inputs a letter, find all of its occurrences 
	document.onkeyup = function(event){

		//clear letter indexes for next guess	
		letterIndex = [];


		if (chosenWord.indexOf(event.key) === -1 && (event.keyCode >= 65 && event.keyCode <=90)) {
			usedLetters.push(event.key.toUpperCase());
			console.log(usedLetters);
        	document.getElementById("guessed").innerHTML = usedLetters.join(", ");

		}

		else if (chosenWord.indexOf(event.key >= 0)){
			for (var i = 0; i < chosenWord.length; i++) {
					if (chosenWord[i] === event.key) {
					letterIndex.push(i);
					console.log(letterIndex);
				}
			}
		}

		for (var i = 0; i < letterIndex.length; i++) {
			hiddenWord[letterIndex[i]] = event.key.toUpperCase();
			document.getElementById("hiddenWord").innerHTML = hiddenWord.join(" ");
 
		}

	}	
}




		gameStart();
		gamePlay();





// function gamePlay()
// each time a letter is pressed, if it matches a letter in hidden word, display that letter at the right index in the word
// if it does not match, add it to alreadyGuessed
// decrement guesses for both of these 
// do this until all of the letters have been guessed, or until guesses = 0
// if there are no more letters to be guessed increment score by 1
// if guesses = 0 or there are no more letters in the word to guess, call game start()