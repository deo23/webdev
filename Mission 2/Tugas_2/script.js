const rhino = document.getElementById("rhino");
function jump() {
  if (rhino.classList != "jump") {
    rhino.classList.add("jump");
  }

  setTimeout(function () {
    rhino.classList.remove("jump");
  }, 300);
}

let isAlive = setInterval(function () {
  // get current rhino Y position
  let rhinoTop = parseInt(window.getComputedStyle(rhino).getPropertyValue("top"));

  // get current cactus X position
  let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

  // detect collision
  if (cactusLeft < 50 && cactusLeft > 0 && rhinoTop >= 140) {
    // collision
    alert("Game Over!");
  }
}, 10);

document.addEventListener("keydown", function (event) {
  jump();
});
