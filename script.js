const Gameboard = (() => {
  const gameboard = ["", "", "", "", "", "", "", "", ""];

  const render = () => {
    let innerDivs = "";
    gameboard.forEach((value, index) => {
      innerDivs += `<div class="box" id=${index}></div>`;
    });
    document.querySelector(".main-container").innerHTML = innerDivs;
  };

  return { render };
})();

const Game = (() => {
  const players = [];

  const start = () => {
    createPlayer();
    createPlayer();
    Gameboard.render();
  };

  const createPlayer = () => {
    let playerName = prompt("Player Name: ");
    let PlayerMark = prompt("Player Mark: ");
    const player = Player(playerName, PlayerMark);
    players.push(player);
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
