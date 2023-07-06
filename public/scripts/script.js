class Game {
  constructor() {
    // Player Variables
    this.playerRock = document.getElementById("rockplayer");
    this.playerPaper = document.getElementById("paperplayer");
    this.playerScissors = document.getElementById("scissorplayer");
    this.playerFinal = "";

    // CPU Variables
    this.cpuRock = document.getElementById("rockcom");
    this.cpuPaper = document.getElementById("papercom");
    this.cpuScissors = document.getElementById("scissorcom");
    this.cpuFinal = "";

    // Result
    this.results = document.getElementById("result");
    this.paragraphElement = document.getElementById("playerid");
    this.inputValue = this.paragraphElement.textContent;
    this.activePort = window.location.port || 8080;

    // Reset
    let refresh = document.getElementById("refresh");
    refresh.addEventListener("click", () => {
      this.reset();
    });

    this.playerRock.onclick = () => {
      this.selectPlayer(0);
    };
    this.playerPaper.onclick = () => {
      this.selectPlayer(1);
    };
    this.playerScissors.onclick = () => {
      this.selectPlayer(2);
    };
  }

  selectPlayer(p) {
    if (p === 0) {
      this.playerFinal = "Rock";
      this.playerRock.style.backgroundColor = "#C4C4C4";
      this.playerRock.style.padding = "10px";
      this.playerRock.style.borderRadius = "10px";
    } else if (p === 1) {
      this.playerFinal = "Paper";
      this.playerPaper.style.backgroundColor = "#C4C4C4";
      this.playerPaper.style.padding = "10px";
      this.playerPaper.style.borderRadius = "10px";
    } else if (p === 2) {
      this.playerFinal = "Scissors";
      this.playerScissors.style.backgroundColor = "#C4C4C4";
      this.playerScissors.style.padding = "10px";
      this.playerScissors.style.borderRadius = "10px";
    }
    this.selectCPU();
  }

  selectCPU() {
    let c = Math.floor(Math.random() * 3);
    if (c === 0) {
      this.cpuFinal = "Rock";
      this.cpuRock.style.backgroundColor = "#C4C4C4";
      this.cpuRock.style.padding = "10px";
      this.cpuRock.style.borderRadius = "10px";
    } else if (c === 1) {
      this.cpuFinal = "Paper";
      this.cpuPaper.style.backgroundColor = "#C4C4C4";
      this.cpuPaper.style.padding = "10px";
      this.cpuPaper.style.borderRadius = "10px";
    } else if (c === 2) {
      this.cpuFinal = "Scissors";
      this.cpuScissors.style.backgroundColor = "#C4C4C4";
      this.cpuScissors.style.padding = "10px";
      this.cpuScissors.style.borderRadius = "10px";
    }
    this.playGame();
  }

  playGame() {
    if (
      (this.playerFinal === "Rock" && this.cpuFinal === "Paper") ||
      (this.playerFinal === "Paper" && this.cpuFinal === "Scissors") ||
      (this.playerFinal === "Scissors" && this.cpuFinal === "Rock")
    ) {
      this.results.innerHTML = `<span class="winner">Computer<br>Win</span>`;
      fetch('http://localhost:'+this.activePort+'/user/update/lose/'+this.inputValue, { method: 'PUT' })
         .then(response => response.json())
         .then(data => console.log(data))
         .catch(error => console.error(error));
    } else if (
      (this.playerFinal === "Rock" && this.cpuFinal === "Scissors") ||
      (this.playerFinal === "Paper" && this.cpuFinal === "Rock") ||
      (this.playerFinal === "Scissors" && this.cpuFinal === "Paper")
    ) {
      this.results.innerHTML = `<span class="winner">Player Win</span>`;
      fetch('http://localhost:'+this.activePort+'/user/update/lose/'+this.inputValue, { method: 'PUT' })
         .then(response => response.json())
         .then(data => console.log(data))
         .catch(error => console.error(error));
    } else {
      this.results.innerHTML = `<span class="draw">DRAW</span>`;
    }

    this.playerRock.onclick = null;
    this.playerPaper.onclick = null;
    this.playerScissors.onclick = null;
  }

  reset() {
    this.results.innerHTML = "VS";
    this.cpuRock.style.backgroundColor = "transparent";
    this.cpuPaper.style.backgroundColor = "transparent";
    this.cpuScissors.style.backgroundColor = "transparent";
    this.playerRock.style.backgroundColor = "transparent";
    this.playerPaper.style.backgroundColor = "transparent";
    this.playerScissors.style.backgroundColor = "transparent";

    this.playerRock.onclick = () => {
      this.selectPlayer(0);
    };
    this.playerPaper.onclick = () => {
      this.selectPlayer(1);
    };
    this.playerScissors.onclick = () => {
      this.selectPlayer(2);
    };
  }
}

// Create an instance of the Game class
const game = new Game();
