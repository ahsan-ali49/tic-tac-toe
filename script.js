const Gameboard = (() => {
  const gameboard = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = 0;
  const players = [];
  const container = document.querySelector(".main-container");

  const render = () => {
    let innerDivs = "";
    gameboard.forEach((value, index) => {
      innerDivs += `<div class="box" id=${index}></div>`;
    });
    container.innerHTML = innerDivs;

    addEventHandler();
  };

  const addEventHandler = () => {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
      box.addEventListener("click", handleEvent);
    });
  };

  const checkForWin = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < 8; i++) {
      const [a, b, c] = winningCombinations[i];
      if (
        gameboard[a] &&
        gameboard[a] === gameboard[b] &&
        gameboard[a] === gameboard[c]
      )
        return true;
    }
    return false;
  };

  const handleEvent = (event) => {
    if (event.target.textContent === "" && !Game.gameOver) {
      event.target.textContent = players[currentPlayer].mark;
      gameboard[event.target.id] = players[currentPlayer].mark;

      if (checkForWin()) {
        document.querySelector(
          "#result"
        ).textContent = `${players[currentPlayer].name} Wins!`;
        Game.gameOver = !Game.gameOver;
      }
      currentPlayer == 0 ? (currentPlayer = 1) : (currentPlayer = 0);
    }
  };

  return { render, players };
})();

const Game = (() => {
  let gameOver = false;

  const start = () => {
    createPlayer();
    createPlayer();
    Gameboard.render();
  };

  const createPlayer = () => {
    let playerName = prompt("Player Name: ");
    let PlayerMark = prompt("Player Mark: ");
    const player = Player(playerName, PlayerMark);
    Gameboard.players.push(player);
  };

  return { start, gameOver };
})();

const Player = (name, mark) => {
  this.name = name;
  this.mark = mark;

  return {
    name,
    mark,
  };
};

const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", (event) => {
  Game.start();
  startBtn.style.display = "none";
});
