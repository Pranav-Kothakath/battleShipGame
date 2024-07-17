let countOfRevealedCells = 0;
let countOfBattleShipCells = 0;
let revealedCells = new Set();
let battleShipCells = new Set();
let savedRevealedCells = new Set();

const btnReset = document.querySelector("button");
const cells = document.querySelectorAll(".entire-box-section > div");

// Function to reveal cells and check game status
const revealCellAndCheckGameStatus = (cell) => {
  // Check if cell has already been revealed
  if (revealedCells.has(cell.id)) {
    return; // Exit the function if the cell is already revealed
  }

  // Add cell to revealed set
  revealedCells.add(cell.id);

  // Revealing cells
  if (battleShipCells.has(cell.id)) {
    cell.style.backgroundImage =
      "url('https://ik.imagekit.io/d9mvewbju/Course/BigbinaryAcademy/battleship-image_e6bWCZ1w4.png')";
    cell.style.backgroundSize = "cover";
    countOfBattleShipCells++;
  } else {
    cell.style.backgroundImage =
      "url('https://ik.imagekit.io/d9mvewbju/Course/BigbinaryAcademy/seamless-pattern-waves-various-shades-blue-vector-underwater-design-96891651_aSd5pmbaM.webp')";
    cell.style.backgroundSize = "cover";
  }
  countOfRevealedCells++;
  // Save game state to local storage
  saveGameState();
  // Checking game status
  if (countOfBattleShipCells === 5) {
    setTimeout(() => alert("Congratulations! You won🤩"), 500);
    setTimeout(resetFunction, 500);
  } else if (countOfRevealedCells === 8) {
    setTimeout(() => alert("You Lost...😌"), 500);
    setTimeout(resetFunction, 500);
  }
};

// Reset function
const resetFunction = () => {
  countOfRevealedCells = 0;
  countOfBattleShipCells = 0;
  revealedCells.clear();
  savedRevealedCells.clear();
  battleShipCells = getBattleShipCells(5, 1, 16);
  cells.forEach((cell) => {
    cell.style.backgroundImage = "";
  });
  // Clear game state from local storage
  localStorage.removeItem("revealedCells");
  localStorage.removeItem("battleShipCells");
  // Save game state to local storage
  saveGameState();
};
// Function to save game state to local storage
const saveGameState = () => {
  if (revealedCells.size > 0) {
    localStorage.setItem("revealedCells", [...revealedCells].join(","));
  }
  localStorage.setItem("battleShipCells", [...battleShipCells].join(","));
};
// Function to load game state from local storage
const loadGameState = () => {
  savedRevealedCells = new Set(
    localStorage.getItem("revealedCells").split(",")
  );
  battleShipCells = new Set(localStorage.getItem("battleShipCells").split(","));
};

// Attach the event listener to each cell
cells.forEach((cell) => {
  cell.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent event propagation
    revealCellAndCheckGameStatus(cell);
  });
});
// Attach the event listener to the reset button
btnReset.addEventListener("click", resetFunction);

// function to randomizing the game by selectiing 5 random cells for battle ships
const getBattleShipCells = (count, min, max) => {
  const battleShipCells = new Set();
  while (battleShipCells.size < count) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    const idOfCell = `cell-${randomNum}`;
    battleShipCells.add(idOfCell);
  }
  return battleShipCells;
};

// Load game state from local storage
loadGameState();
if (savedRevealedCells.size > 0 && battleShipCells.size > 0) {
  //since we have cell id we have to pass the cell instance to revealCellAndCheckGameStatus function
  savedRevealedCells.forEach((cellId) => {
    const cell = document.getElementById(cellId);
    revealCellAndCheckGameStatus(cell);
  });
} else {
  // Initialize battleship cells
  battleShipCells = getBattleShipCells(5, 1, 16);
  // Save initial game state to local storage
  saveGameState();
}
