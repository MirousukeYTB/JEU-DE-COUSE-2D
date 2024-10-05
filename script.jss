// Sélection des éléments
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 600;

// Variables du jeu
let player, obstacles = [];
let score = 0;
let gameSpeed = 5;

// Création du joueur
function createPlayer() {
    player = {
        x: canvas.width / 2 - 25,
        y: canvas.height - 100,
        width: 50,
        height: 100,
        color: "#00ff00"
    };
}

// Création des obstacles
function createObstacle() {
    const obstacleWidth = Math.random() * 100 + 50;
    const obstacleX = Math.random() * (canvas.width - obstacleWidth);
    const obstacle = {
        x: obstacleX,
        y: 0,
        width: obstacleWidth,
        height: 20,
        color: "#ff0000"
    };
    obstacles.push(obstacle);
}

// Mise à jour des positions des obstacles
function updateObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].y += gameSpeed;
        if (obstacles[i].y > canvas.height) {
            obstacles.splice(i, 1);
            score++;
        }
    }
}

// Détection de collision
function detectCollision() {
    for (let obstacle of obstacles) {
        if (
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y
        ) {
            return true;
        }
    }
    return false;
}

// Affichage des éléments
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner le joueur
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Dessiner les obstacles
    for (let obstacle of obstacles) {
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }

    // Afficher le score
    ctx.fillStyle = "#ffffff";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 20);
}

// Boucle principale du jeu
function gameLoop() {
    updateObstacles();
    draw();

    if (detectCollision()) {
        alert("Game Over! Votre score : " + score);
        document.location.reload();
    }

    requestAnimationFrame(gameLoop);
}

// Gestion des déplacements du joueur
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && player.x > 0) {
        player.x -= 20;
    }
    if (event.key === "ArrowRight" && player.x < canvas.width - player.width) {
        player.x += 20;
    }
});

// Démarrer le jeu
createPlayer();
setInterval(createObstacle, 1000); // Crée un nouvel obstacle toutes les secondes
gameLoop();
