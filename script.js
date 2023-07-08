const Gameboard = (() => {
  const gameboard = ["", "", "", "", "", "", "", "", ""];
  let players = [];
  let currentPlayer = 0;
  const resultMessage = document.createElement("div");
  const bodyTag = document.querySelector("body");
  resultMessage.classList = "resultMessage";

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

  const handleEvent = (event) => {
    if (event.target.textContent === "" && !Game.gameOver) {
      event.target.textContent = players[currentPlayer].mark;
      gameboard[event.target.id] = players[currentPlayer].mark;

      if (checkForWin()) {
        showMessage(`${players[currentPlayer].name} Wins!`);
        restartGame();
      }
      currentPlayer == 0 ? (currentPlayer = 1) : (currentPlayer = 0);
    }
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

  const showMessage = (message) => {
    resultMessage.textContent = message;
    bodyTag.appendChild(resultMessage);
  };

  const restartGame = () => {
    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Restart";
    container.appendChild(restartBtn);
    Game.gameOver = !Game.gameOver;

    restartBtn.addEventListener("click", () => {
      container.innerHTML = "";
      resultMessage.textContent = "";
      Game.gameOver = false;
      currentPlayer = 0;
      gameboard.forEach((value, index) => {
        gameboard[index] = "";
      });

      Gameboard.players.pop();
      Gameboard.players.pop();
      window.onload = setTimeout(function () {
        Game.start();
      }, 15);
    });
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
    Gameboard.players.push(Player(playerName, PlayerMark));
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
