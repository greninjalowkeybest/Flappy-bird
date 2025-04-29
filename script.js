// sesssion 2
let gravity= 0.25;
let bird_dy = 0;
let score= 0;
let game_state = "start";


 // interval
let gameInterval =null;
// session 2 
let bird= document.getElementById('bird')
let score_display =document.getElementById("score")
let game_container = document.getElementById("game_container")
let start_btn= document.getElementById("start-btn")






// session 2
function applyGravity()  {
  let  bird_dy = bird.offsetTop + bird_dy
  birdTop = Math.max(birdTop, 0);
  // above code -> if (birdtop < 0) {birdTop = 0;}
birdTop = Math.min(bird.Top, gamne_container.offseHeight - bird.offsetHeight);
bird.style.top = birdTop + "px";
}
//session 2
function startGame() {
  if (gameInterval !== null) return; // Prevent multiple Intervals
  gameInterval = setInterval(() => {
    //session 2
    applyGravity();
  }, 10);
}
//session 2 
// Start button (optional extra)
function onStartButtonClick() {
    if (game_state !== "Play") {
        game_state ="Play";
            startGame();
    }
}
document.addEventListener("keydown" , (e) => {
   if (e.code === "Space" ||  e.code === "ArrowUp") {
    if (game_state !== "Play") {
        game_state ="Play";
            startGame();
    }   
        bird_dy = -7;
}
});
function startGame(){

}
   

