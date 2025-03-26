const words = [
    "chair", "table", "sofa", "bed", "desk", "lamp", "television", "refrigerator", "microwave", "toaster",
    "clock", "rug", "curtain", "window", "door", "knife", "fork", "spoon", "plate", "glass",
    "bowl", "basket", "bag", "suitcase", "coat", "shoe", "glove", "hat", "belt", "watch",
    "umbrella", "backpack", "keys", "wallet", "pen", "pencil", "eraser", "paper", "notebook", "book",
    "bottle", "jar", "basket", "pan", "frying pan", "reel", "sheet", "pillow", "blanket", "mattress",
    "shelf", "bookshelf", "wardrobe", "dresser", "coat rack", "basket", "drying rack", "broom", "vacuum cleaner",
    "mop", "garbage bin", "rake", "axe", "hammer", "screwdriver", "drill", "saw", "pliers",
    "clamp", "nail", "screw", "key", "crowbar", "scotch tape", "glue", "scissors", "hole punch", "stapler",
    "paper clips", "ribbon", "thread", "needle", "spool", "pair of scissors", "plant", "vase", "bucket", "basket",
    "mug", "water bottle", "thermos", "disk", "headset", "screen", "computer", "keyboard", "mouse", "tablet",
    "phone", "camera", "camcorder", "speaker", "microphone", "DVD player", "game console", "battery",
    "charger", "desk lamp", "nightstand lamp", "alarm clock", "heater", "fan", "air conditioning", "radiator",
    "toaster", "coffee maker", "kettle", "vacuum cleaner", "washing machine", "dishwasher", "blender", "juicer",
    "basketball hoop", "racket", "jump rope", "ball", "ski pole", "snowboard", "bicycle", "scooter",
    "skateboard", "slingshot", "sunshade", "deck chair", "barbecue", "tent", "sleeping bag", "camping mattress",
    "lantern", "backpack", "rope", "axe", "saw", "pan", "kitchen knife", "whisk", "grater", "mandolin",
    "pepper grinder", "citrus press", "coffee maker", "toaster", "blender", "pan", "pressure cooker", "basket",
    "pot", "basket", "laundry basket", "vegetable basket", "shopping basket", "wicker basket", "picnic basket",
    "deck chair", "trampoline", "rake", "dinghy", "bikes", "engine", "boat engine", "toolbox", "compass",
    "leashes", "lifejacket", "blankets", "vending machine", "stereo", "recorder", "remote control", "device",
    "folding chair", "pole", "ladder", "rope", "cordage", "jackhammer", "hand saw", "circular saw", "plane",
    "compressor", "vacuum cleaner", "lawn mower", "ironing board", "basketball hoop", "fruit basket", "windmill",
    "breadboard", "shopping basket", "cat basket", "dog basket", 
    "car", "bicycle", "phone", "painting", "knife", "lantern", "plant", "brush", "chair", "tree",
    "key", "screen", "bottle", "rug", "vase", "basket", "suitcase", "watch", "lamp", "pants",
    "shirt", "bag", "mouse", "hat", "guitar", "radio", "compass", "cards", "fan", "refrigerator",
    "vacuum cleaner", "television", "coffee maker", "sofa", "reel", "coat rack", "headphones", "tissue", "mountain",
    "laundry basket", "bath", "clogs", "display case", "mill", "stones", "bench", "deck chair", "house", "door",
    "wallet", "wallpaper", "fruit basket", "wicker basket", "backpack", "vacation", "wallpaper", "beach",
    "fireplace", "keychain", "shelf", "living room", "wallet", "canvas", "water bottle", "basketball hoop", "coffee",
    "small dish", "jacket", "shoe", "gloves", "mittens", "rope", "cord", "streamer", "purse", "candle",
    "sunshade", "periscope", "drill", "scissors", "screwdriver", "meter", "ladder", "padlock", "jacket", "kitchen glove",
    "picnic basket", "cooler", "refrigerator", "fridge", "wardrobe", "laundry basket", "cat basket", "garbage bin",
    "document holder", "remote control", "display case", "suitcase", "pencil case", "box", "ball", "pouch", "wallet",
    "jewelry box", "mailbox", "green plant", "poster", "spider web", "grocery basket", "toolbox",
    "crowbar", "nail", "screw", "wrench", "pliers", "spotlight", "saw", "compressor", "machete", "mill",
    "salad bowl", "basket", "vegetable basket", "pan", "stew pot", "whisk", "mandolin", "citrus press", "salad bowl",
    "spoon", "plate", "cutlery", "frying pan", "toaster", "blender", "pot", "jar", "container", "bread basket",
    "garden basket", "lawn mower", "watering can", "rake", "hoe", "pickaxe", "axe", "shovel", "wheelbarrow", "sleeping bag",
    "tent", "compass", "pan", "stove", "tank", "pump", "amp", "amplifier", "player", "disk", "cassette",
    "USB key", "cartridge", "point", "headphones", "height", "tarp", "metal", "sweatsuit", "protector", "scar",
    "comb", "hairbrush", "concrete", "sand", "gravel", "oil", "engine", "heat pump", "tricycle", "van",
    "coach", "machine", "cable", "height", "broom", "bath mat", "document holder", "carry-on suitcase", "safe",
    "bell", "cork", "lid", "fruit basket", "oil bottle", "vending machine", "wall clock",
    "dirty laundry basket", "basketball hoop", "box", "flower", "tulip", "button", "paper", "desk", "ruler", "compass",
    "calculator", "pencil", "paintbrush", "drill", "tweezers", "steam cleaner", "jar", "shopping cart", "hotel",
    "pool", "trailer", "calendar", "cutting board", "glass", "cookie jar", "cloth", "aluminum foil",
    "cat basket", "bread basket", "crate", "fruit basket", "grocery basket", "animal basket", "dirty laundry basket"
];

let currentWord = "";
let displayedWord = "";
let wordImageUrl = "";
let wordLetters = [];

const buzzerButton = document.getElementById("buzzer-btn");
const newWordButton = document.getElementById("new-word-btn");
const wordDisplay = document.getElementById("current-word");
const wordImage = document.getElementById("word-image");
const guessContainer = document.getElementById("guess-container");
const guessInput = document.getElementById("guess-input");
const checkBtn = document.getElementById("check-btn");

function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

function resetGame() {
    const word = getRandomWord();
    currentWord = word;
    wordLetters = word.split('');
    displayedWord = word.split('').map(() => '_').join(' ');
    wordDisplay.innerText = displayedWord;
    wordImageUrl = `https://api.pexels.com/v1/search?query=${word}&per_page=1`;  // Utiliser l'API pour récupérer l'image
    fetchImage();
}

function fetchImage() {
    fetch(wordImageUrl, {
        method: 'GET',
        headers: {
            'Authorization': 'hqpPkwEsVPGOmZt7TFlJMSRBv0PtDdjZtDwN2OMgxem3mPQ3ZkJgo4oN'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.photos && data.photos[0]) {
            wordImage.src = data.photos[0].src.medium;
        }
    })
    .catch(error => {
        console.error("Erreur lors de la récupération de l'image:", error);
    });
}

function revealLetter() {
    const randomIndex = Math.floor(Math.random() * wordLetters.length);
    displayedWord = displayedWord.split(' ');
    displayedWord[randomIndex] = wordLetters[randomIndex];
    displayedWord = displayedWord.join(' ');
    wordDisplay.innerText = displayedWord;
}

function checkAnswer() {
    const userAnswer = guessInput.value.trim().toLowerCase();
    if (userAnswer === currentWord) {
        alert("Bravo, vous avez deviné le mot !");
        resetGame();
    } else {
        revealLetter();
        guessInput.value = '';
    }
}

// Événements
buzzerButton.addEventListener('click', () => {
    guessContainer.style.display = 'block';
});

newWordButton.addEventListener('click', () => {
    resetGame();
});

checkBtn.addEventListener('click', checkAnswer);

// Initialisation du jeu
resetGame();
