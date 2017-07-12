var words = ["Albarino", "Barbera", "Blush", "Bordeaux", "Carmenere", "Chambourcin", "Champagne", "Chardonnay", "Chianti", "Eiswein", "Gewurztraminer", "Grappa", "Grenache", "Lambrusco", "Malbec", "Marsala", "Meritage", "Merlot", "Moscato", "Muscat", "Pinotage", "Prosecco", "Sangiovese", "Schiava", "Shiraz", "Semillon", "Sherry", "Soave", "Tannat", "Tempranillo", "Torrontes", "Trebbiano", "Valpolicella", "Verdejo", "Verdicchio", "Viognier", "Zinfandel", "grapes", "blend", "varietals", "barrels", "bottle", "cellar", "vineyard", "California", "France", "Italy", "Spain", "Argentina", "Australia", "corkscrew", "sangria", "tannins", "vermouth", "vintage", "sommelier", "tasting"];
var hiddenWord;
var guesses;
var score = 0;
var chosenWord;
var hiddenArray
var usedLetters;

//how the game starts - reset guesses, choose a random word, present its hashed value to the user
function gameStart() {
    usedLetters = [];
    guesses = 12;
    document.getElementById("guesses-remaining").innerHTML = guesses;
    document.getElementById("guessed").innerHTML = usedLetters;
    var wordIndex = Math.floor(Math.random() * words.length + 1);
    chosenWord = words[wordIndex].toLowerCase().split("");
    var hideWord = "_ ";
    hiddenWord = hideWord.repeat(chosenWord.length).split(" ");
    document.getElementById("hiddenWord").innerHTML = hiddenWord.join(" ");
}

//executes the main plays and rules of the game
function gamePlay() {
    var letterIndex = [];


    //when a user inputs a letter, find all of its occurrences 
    document.onkeyup = function(event) {

        //clear letter indexes for next guess	
        letterIndex = [];

        //if the guessed letter is not in the word, and there are remaining guesses, display in used letter array
        if (chosenWord.indexOf(event.key) === -1 && (event.keyCode >= 65 && event.keyCode <= 90)) {
            // if there are no guesses left, end the game 
            if (guesses <= 0) {
                alert("You lose!");
                document.getElementById("hiddenWord").innerHTML = chosenWord.join(" ").toUpperCase();
                gameStart();
                gamePlay();

            }
            //if there are, add them to the array
            else if (guesses > 0 && usedLetters.indexOf(event.key.toUpperCase()) === -1) {
                usedLetters.push(event.key.toUpperCase());
                document.getElementById("guessed").innerHTML = usedLetters.join(", ");
                guesses--
                document.getElementById("guesses-remaining").innerHTML = guesses;
            } else if (guesses > 0 && usedLetters.indexOf(event.key.toUpperCase()) >= 0) {
                alert("You already guessed this letter!")
            }
        }
        //if the letter is in the word, find the indexes of everywhere it appears in the word, then place those into the word	
        //find indexes
        else if (chosenWord.indexOf(event.key >= 0)) {
            for (var i = 0; i < chosenWord.length; i++) {
                if (chosenWord[i] === event.key) {
                    letterIndex.push(i);
                }
            }
        }
        //replace the dash with the letter where it appears in the word
        for (var i = 0; i < letterIndex.length; i++) {
            hiddenWord[letterIndex[i]] = event.key.toUpperCase();
            document.getElementById("hiddenWord").innerHTML = hiddenWord.join(" ");
        }

        if (hiddenWord.indexOf("_") === -1 && usedLetters.length < 12) {
            document.getElementById("hiddenWord").innerHTML = hiddenWord.join(" ");

            score++;
            document.getElementById("score").innerHTML = score;

            gameStart();
            gamePlay();

        }
    }
}

//starting and playing the game
if (document.getElementById("hiddenWord").innerHTML === "Press any key to start") {
    document.onkeyup = function(event) {
        gameStart();
        gamePlay();
    }
} else if (document.getElementById("hiddenWord").innerHTML !== "Press any key to start") {
    gamePlay();
}

//press any key to start
//fix bug where the last letter doesn't display before ending thegame
//