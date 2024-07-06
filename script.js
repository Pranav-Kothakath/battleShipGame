let countOfRevealedCells = 0;
let countOfBattleShipCells = 0;
const revealedCells = new Set();
let battleShipCells = new Set();

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
  // Checking game status
  if (countOfBattleShipCells === 5) {
    alert("Congratulations! You won🤩");
    resetFunction();
  } else if (countOfRevealedCells === 8) {
    alert("You Lost...😌");
    resetFunction();
  }
};

// Reset function
const resetFunction = () => {
  countOfRevealedCells = 0;
  countOfBattleShipCells = 0;
  revealedCells.clear();
  battleShipCells = getBattleShipCells(5, 1, 16);
  cells.forEach((cell) => {
    cell.style.backgroundImage = "";
  });
};

// Attach the event listener to each cell
cells.forEach((cell) => {
  cell.addEventListener("click", () => revealCellAndCheckGameStatus(cell));
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
// Initialize battleship cells
battleShipCells = getBattleShipCells(5, 1, 16);
