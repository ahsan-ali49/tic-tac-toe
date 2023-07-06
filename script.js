const Gameboard = (() => {
  const gameboard = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = 0;
  const players = [];

  const render = () => {
    let innerDivs = "";
    gameboard.forEach((value, index) => {
      innerDivs += `<div class="box" id=${index}></div>`;
    });
    document.querySelector(".main-container").innerHTML = innerDivs;

    addEventHandler();
  };

  const addEventHandler = () => {
    const boxes = document.querySelectorAll(".box");
    console.log(boxes);
    boxes.forEach((box) => {
      box.addEventListener("click", handleEvent);
    });
  };

  const handleEvent = (event) => {
    if (event.target.textContent === "") {
      event.target.textContent = players[currentPlayer].mark;
      gameboard[event.target.id] = players[currentPlayer].mark;
      currentPlayer == 0 ? (currentPlayer = 1) : (currentPlayer = 0);
    }
  };

  return { render, players };
})();

const Game = (() => {
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

  return { start };
})();

const Player = (name, mark) => {
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
