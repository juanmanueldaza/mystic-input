import "./style.css";

document.querySelector("#app").innerHTML = `
  <div>
    <input id="mysticInput" type="text" placeholder="Type here" />
    <button id="mysticButton">Mistify</button>
  </div>
  <div>
    <p id="mysticText"></p>
`;
let counter = localStorage.length;
const mysticInput = document.querySelector("#mysticInput");
const mysticText = document.querySelector("#mysticText");
const mysticButton = document.querySelector("#mysticButton");
mysticText.innerHTML = getAllFromStorage();
mysticInput.onkeyup = event => {
  if (event.keyCode === 13) {
    saveToStorage(counter.toString(), JSON.stringify(event.target.value));
    mysticText.innerHTML += getFromStorage(counter.toString());
    mysticInput.value = "";
    counter++;
  }
};
mysticButton.onclick = () => {
  translateToItalian(mysticText.innerHTML).then(res => {
    mysticText.innerHTML = res.text;
  });
};

function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

function getFromStorage(key) {
  return capitalize(addSpace(addDot(removeQuotes(localStorage.getItem(key)))));
}

function getAllFromStorage() {
  let result = "";
  for (let i = 0; i < localStorage.length; i++) {
    result += getFromStorage(i.toString());
  }
  return result;
}

function removeQuotes(str) {
  return str.replace(/['"]+/g, "");
}

function addDot(str) {
  return str + ".";
}

function addSpace(str) {
  return str + " ";
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function translateToItalian(str) {
  return translate(str, { from: "en", to: "it" });
}
