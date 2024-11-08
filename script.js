const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const selectedCategory = document.getElementById("selected-category");
const gameStatus = document.getElementById("game-status");
const newGameButton = document.getElementById("new-game-button");

let options = {
  fruits: ["Apple", "Kiwi", "Banana", "Pineapple", "Pomegranate", "Watermelon"],
  animals: ["Elephant", "Rhinoceros", "Squirrel", "Panther", "Walrus", "Zebra"],
  countries: ["India", "France", "America", "Switzerland", "Zimbabwe", "Pakistan"],
};

let winCount = 0;
let count = 0;
let chosenWord = "";

const displayOptions = () => {
  optionsContainer.innerHTML = `<h3>Choose a Category</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });
  letterButtons.forEach((button) => {
    button.disabled = true;
  });
  gameStatus.classList.remove("hide");
  newGameButton.classList.remove("hide");
};

const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";
  selectedCategory.innerText = `Selected Category: ${optionValue}`;

  let optionArray = options[optionValue];
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');
  userInputSection.innerHTML = displayItem;
};

const initializer = () => {
  winCount = 0;
  count = 0;

  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  gameStatus.classList.add("hide");
  selectedCategory.innerText = "";
  letterContainer.innerHTML = "";
  document.getElementById("lifelines").innerText = "6";
  newGameButton.classList.add("hide");

  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    button.innerText = String.fromCharCode(i);
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          if (char === button.innerText) {
            dashes[index].innerText = char;
            winCount += 1;
            if (winCount == charArray.length) {
              gameStatus.innerHTML = `<h2 class='win-msg'>You Win!</h2><p>The word was <span>${chosenWord}</span></p>`;
              blocker();
            }
          }
        });
      } else {
        count += 1;
        updateLifelines(count);
      }
      button.disabled = true;
    });
    letterContainer.append(button);
  }

  displayOptions();
};

const updateLifelines = (count) => {
  const lifelines = document.getElementById("lifelines");
  lifelines.innerText = 6 - count;

  if (count == 6) {
    gameStatus.innerHTML = `<h2 class='lose-msg'>You Lose!</h2><p>The word was <span>${chosenWord}</span></p>`;
    blocker();
  }
};

newGameButton.addEventListener("click", initializer);

window.onload = initializer;
