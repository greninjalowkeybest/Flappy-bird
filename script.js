// Game variables
let gravity = 0.25;
let bird_dy = 0;
let score = 0;
let highScore = 0; // New variable to track the high score
let frame = 0;
let game_state = "Start";
let gameInterval = null;
const frame_time = 150;
let pipes = [];
let pipe_gap = 250;
let pipeSpeed = 3; // Default speed
let difficultySet = false; // Flag to lock difficulty once set

// DOM elements 
let bird = document.getElementById("bird");
let score_display = document.getElementById("score");
let high_score_display = document.getElementById("high-score"); // New element for high score
let game_container = document.getElementById("game_container");
let start_btn = document.getElementById("start-btn");

// Event listener for keydown
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "ArrowUp") {
    if (game_state !== "Play") {
      game_state = "Play";
      startGame();
    }
    bird_dy = -7;
  }
});

// Apply gravity
function applyGravity() {
  bird_dy += gravity;
  let birdTop = bird.offsetTop + bird_dy;

  birdTop = Math.max(birdTop, 0);
  birdTop = Math.min(birdTop, game_container.offsetHeight - bird.offsetHeight);

  bird.style.top = birdTop + "px";

// session 4
// Add rotation: tilt up when rising down, down when falling
let angle = Math.min(Math.max(bird_dy * 2, -30), 90); //Clamp between -30 and 90 degrees
bird.style.transform = `rotate(${angle})deg)`; 

}

// Start game
function startGame() {
  if (gameInterval !== null) return; // Prevent multiple intervals
    // session 4
    backgroundMusic.play();

  getDifficultySettings(); // Set difficulty only at the start of the game

  gameInterval = setInterval(() => {
    applyGravity();
    movePipes();
    checkCollision();
    frame++;

    // Every 200 frames (~2 seconds), create new pipe
    if (frame % frame_time === 0) {
      createPipe();
    }
  }, 10);
}

// Create pipe
function createPipe() {
  let pipe_position =
    Math.floor(Math.random() * (game_container.offsetHeight - pipe_gap - 100)) +
    50;

  // Top pipe
  let top_pipe = document.createElement("div");
  top_pipe.className = "pipe";
  top_pipe.style.height = pipe_position + "px";
  top_pipe.style.top = "0px";
  top_pipe.style.left = "100%";
  game_container.appendChild(top_pipe);

  // Bottom pipe
  let bottom_pipe = document.createElement("div");
  bottom_pipe.className = "pipe";
  bottom_pipe.style.height =
    game_container.offsetHeight - pipe_gap - pipe_position + "px";
  bottom_pipe.style.bottom = "0px";
  bottom_pipe.style.left = "100%";
  game_container.appendChild(bottom_pipe);

  pipes.push(top_pipe, bottom_pipe);
}

// Move pipes
function movePipes() {
  for (let pipe of pipes) {
    pipe.style.left = pipe.offsetLeft - pipeSpeed + "px";

    // Remove pipes off screen
    if (pipe.offsetLeft < -pipe.offsetWidth) {
      pipe.remove();
    }
  }

  // Remove old pipes from the array
  pipes = pipes.filter((pipe) => pipe.offsetLeft + pipe.offsetWidth > 0);
}

// Check collision
function checkCollision() {
  let birdRect = bird.getBoundingClientRect();
  for (let pipe of pipes) {
    let pipeRect = pipe.getBoundingClientRect();

    if (
      birdRect.left < pipeRect.left + pipeRect.width &&
      birdRect.left + birdRect.width > pipeRect.left &&
      birdRect.top < pipeRect.top + pipeRect.height &&
      birdRect.top + birdRect.height > pipeRect.top
    ) {
      endGame();
      return;
    }
  }
  // Collision with top and bottom
  if (
    bird.offsetTop <= 0 ||
    bird.offsetTop >= game_container.offsetHeight - bird.offsetHeight
  ) {
    endGame();
  }
  // Increase score when bird passes pipes (pipes are paired)
  pipes.forEach((pipe, index) => {
    if (index % 2 === 0) {
      // Only check once for each top-bottom pair
      if (
        pipe.offsetLeft + pipe.offsetWidth < bird.offsetLeft &&
        !pipe.passed
      ) {
        pipe.passed = true;
        setScore(score + 1);
      }
    }
  });
}

// Set score
function setScore(newscore) {
  score = newscore;
  score_display.textContent = "Score: " + score;

  // Update high score if the current score exceeds it
  if (score > highScore) {
    highScore = score;
    high_score_display.textContent = "High Score: " + highScore;
  }
}

// End game
function endGame() {
  clearInterval(gameInterval);
  gameInterval = null;
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
  alert("Game Over! Your Score: " + score);
  resetGame();
}


// Reset game
function resetGame() {
  bird.style.top = "50%";
  bird_dy = 0;
  for (let pipe of pipes) {
    pipe.remove();
  }
  pipes = [];
  setScore(0);
  frame = 0;
  game_state = "Start";
  score_display.textContent = "";
  difficultySet = false; // Allow difficulty to be changed for the next game
}

// Get difficulty settings
function getDifficultySettings() {
  if (!difficultySet) { // Only set difficulty if it hasn't been set yet
    const selected = document.getElementById("difficulty-select").value;

    if (selected === "Easy") {
      pipeSpeed = 3;
    }  if (selected === "Medium") {
      pipeSpeed = 5;
    }  if (selected === "Hard") {
      pipeSpeed = 7;
    }

  let  difficultySet = true;
  }
}






// Load background music
const backgroundMusic = new Audio("Assets/01 World Music.mp3");
backgroundMusic.loop = true; // music should keep playing
backgroundMusic.volume = 0.5; // adjust volume
