const DEFAULT_SIZE = 16;
const MAX_SIZE = 100;

const container = document.querySelector("#container");
const newGridButton = document.querySelector("#new-grid");

// Build a size x size grid inside the container.
// The container has a fixed total width, so each square takes 1/size of it.
function createGrid(size) {
  container.replaceChildren(); // remove the old grid, if any

  const squareBasis = `calc(100% / ${size})`;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.flex = `0 0 ${squareBasis}`;
    container.appendChild(square);
  }
}

// Hover effect: one listener on the container covers every square,
// including the ones created later by "New grid".
container.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("square")) {
    event.target.classList.add("drawn");
  }
});

// Ask for a new grid size and rebuild the pad.
function promptForGridSize() {
  const answer = prompt(`Squares per side? (1 to ${MAX_SIZE})`, DEFAULT_SIZE);

  if (answer === null) return; // user pressed Cancel

  const size = Number(answer);

  if (!Number.isInteger(size) || size < 1 || size > MAX_SIZE) {
    alert(`Please enter a whole number from 1 to ${MAX_SIZE}.`);
    return;
  }

  createGrid(size);
}

newGridButton.addEventListener("click", promptForGridSize);

createGrid(DEFAULT_SIZE);
