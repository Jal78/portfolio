window.onload = function(){
    // Cette fonction s'exécute lorsque la page HTML est entièrement chargée.

    // Déclaration des variables pour les dimensions du canvas, la taille des blocs, le contexte, le délai, le serpent, la pomme, la largeur en blocs et la hauteur en blocs.
    let canvasWidth = 900; // Largeur du canvas en pixels.
    let canvasHeight = 600; // Hauteur du canvas en pixels.
    let blockSize = 30; // Taille d'un bloc en pixels.
    let ctx; // Le contexte de rendu du canvas.
    let delay = 500; // Délai de rafraîchissement en millisecondes (pour le déplacement du serpent).
    let snakee; // Variable pour stocker le serpent.
    let applee; // Variable pour stocker la pomme.
    let widthInBlock = canvasWidth/blockSize; // Calcul de la largeur en nombre de blocs.
    let heightInBlock = canvasHeight/blockSize; // Calcul de la hauteur en nombre de blocs.
    let score; // Variable pour stocker le score du joueur.

    // Appel de la fonction d'initialisation du jeu.
    init();

    // Cette fonction initialise le jeu.
    function init(){
        // Création d'un élément canvas et définition de ses propriétés.
        let canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "3px solid white"; // Bordure blanche du canvas.
        canvas.style.borderRadius = "18px"; // Bordure arrondie du canvas.
        canvas.style.backgroundColor = "rgb(14, 52, 121)"; // Couleur de fond du canvas.
        document.body.appendChild(canvas); // Ajout du canvas au corps de la page HTML.
        ctx = canvas.getContext('2d'); // Obtention du contexte de rendu en 2D du canvas.

        // Initialisation du serpent, de la pomme et du score.
        snakee = new Snake([[6,4],[5,4],[4,4],[3,4],[2,4]], "right"); // Création d'un serpent initial avec une direction vers la droite.
        applee = new Apple([15, 9]); // Création d'une pomme avec des coordonnées initiales.
        score = 0; // Initialisation du score à zéro.

        // Appel de la fonction de rafraîchissement du canvas.
        refreshCanvas();
    };

    function refreshCanvas(){
        // Fait avancer le serpent.
        snakee.advance();
    
        // Vérifie si le serpent entre en collision avec un mur ou avec lui-même.
        if(snakee.checkColision()){
            // En cas de collision, affiche l'écran de fin de jeu.
            gameOver();
        }else{
            // Si le serpent ne collisionne pas, vérifie s'il mange une pomme.
            if(snakee.isEatingApple(applee)){
                // Incrémente le score lorsque le serpent mange une pomme.
                score++;
    
                // Marque que le serpent a mangé une pomme et génère une nouvelle position pour la pomme.
                snakee.eatApple = true;
                do{
                    applee.setNewPosition();
                }
                while(applee.isOnSnake(snakee));
                
                // Le serpent a mangé la pomme.
            };
            
            // Efface le canvas pour préparer le prochain rendu.
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
            // Dessine le score actuel à l'écran.
            drawScore();
    
            // Dessine le serpent sur le canvas.
            snakee.draw();
    
            // Dessine la pomme sur le canvas.
            applee.draw();
    
            // Programme une prochaine exécution de cette fonction après un délai (rafraîchissement du jeu).
            setTimeout(refreshCanvas, delay);
        };
    };

        // Fonction pour gérer la fin de partie
    function gameOver(){
        ctx.save(); // Sauvegarde l'état du contexte de dessin

        // Définit la police de caractères pour le texte de fin de partie
        ctx.font = "40px serif";
        
        // Définit la couleur du texte en blanc
        ctx.fillStyle = "white";
        
        // Définit l'alignement horizontal du texte au centre
        ctx.textAlign = "center";
        
        // Définit l'alignement vertical du texte au milieu
        ctx.textBaseline = "middle";
        
        // Définit la couleur de contour du texte en or
        ctx.strokeStyle = "#DAA520";
        
        // Définit l'épaisseur de la ligne de contour du texte
        ctx.lineWidth = 2;

        // Calcule les coordonnées du centre du canvas
        var centerX = canvasWidth / 2;
        var centerY = canvasHeight / 2;

        // Dessine le texte de fin de partie avec contour
        ctx.strokeText("Vous avez perdu", centerX, centerY - 60);
        ctx.fillText("Vous avez perdu", centerX, centerY - 60);

        // Dessine le texte de recommencement du jeu avec contour
        ctx.strokeText("Si tu souhaite rejouer appuis sur la touche espace", centerX, centerY + 40);
        ctx.fillText("Si tu souhaite rejouer appuis sur la touche espace", centerX, centerY + 40);

        ctx.restore(); // Restaure l'état du contexte de dessin précédemment sauvegardé
    };

    // Cette fonction dessine un bloc sur le canvas.
    function drawBlock(ctx, position){
        let x = position[0] * blockSize; // Calcule la position X du bloc.
        let y = position[1] * blockSize; // Calcule la position Y du bloc.
        ctx.fillRect(x, y, blockSize, blockSize); // Remplit un rectangle aux coordonnées calculées.
    }

    // Définition de l'objet Snake (serpent) en utilisant une fonction constructeur.
    function Snake(body, direction){
        // Le corps du serpent (tableau de positions) et sa direction.
        this.body = body;
        this.direction = direction;
        this.eatApple = false; // Un indicateur si le serpent a mangé une pomme.

        // Cette méthode dessine le serpent sur le canvas.
        this.draw = function(){
            ctx.save(); // Enregistre le contexte du canvas.
            ctx.fillStyle = "#DAA520"; // Remplit le serpent avec une couleur dorée.
            for(let i = 0; i < this.body.length; i++){
                drawBlock(ctx, this.body[i]); // Dessine chaque bloc du serpent.
            }
            ctx.restore(); // Restaure le contexte du canvas.
        }

        // Cette méthode fait avancer le serpent d'une case.
        this.advance = function(){
            let nextPosition = this.body[0].slice(); // Copie la position de la tête du serpent.
            switch(this.direction){
                case "left":
                    nextPosition[0]--; // Déplace la tête vers la gauche.
                    break;
                case "right":
                    nextPosition[0]++; // Déplace la tête vers la droite.
                    break;
                case "down":
                    nextPosition[1]++; // Déplace la tête vers le bas.
                    break;
                case "up":
                    nextPosition[1]--; // Déplace la tête vers le haut.
                    break;
                default:
                    throw("Invalid direction"); // Lève une erreur si la direction n'est pas valide.
            }

            this.body.unshift(nextPosition); // Ajoute la nouvelle position à la tête du serpent.
            if(!this.eatApple)
                this.body.pop(); // Si le serpent n'a pas mangé de pomme, retire la dernière position pour simuler le mouvement.
            else
                this.eatApple = false; // Réinitialise l'indicateur de manger une pomme.
        };

        // Cette méthode permet de changer la direction du serpent.
        this.setDirection = function(newDirection){
            let allowedDirections;
            switch(this.direction){
                case "left":
                case "right":
                    allowedDirections = ["up", "down"]; // Le serpent ne peut pas faire demi-tour.
                    break;
                case "down":
                case "up":
                    allowedDirections = ["left", "right"]; // Le serpent ne peut pas faire demi-tour.
                    break;
                default:
                    throw("Invalid direction"); // Lève une erreur si la direction n'est pas valide.
            }

            if(allowedDirections.indexOf(newDirection) > -1){
                this.direction = newDirection; // Change la direction si elle est autorisée.
            }
        }

        // Cette méthode vérifie si le serpent entre en collision avec un mur ou lui-même.
        this.checkColision = function(){
            let wallColision = false;
            let snakeColision = false;
            let head = this.body[0]; // Obtient la position de la tête du serpent.
            let rest = this.body.slice(1); // Copie le reste du corps.
            let snakeX = head[0];
            let snakeY = head[1];
            let minX = 0;
            let minY = 0;
            let maxX = widthInBlock - 1;
            let maxY = heightInBlock - 1;
            let isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX; // Vérifie la collision avec les murs horizontaux.
            let isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY; // Vérifie la collision avec les murs verticaux.
            if(isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls){
                wallColision = true;
            }

            for(let i = 0; i < rest.length; i++){
                if(snakeX === rest[i][0] && snakeY === rest[i][1] ){
                    snakeColision = true
                }
            }

            return wallColision || snakeColision; // Retourne vrai si le serpent entre en collision.
        };

        // Cette méthode vérifie si le serpent a mangé une pomme.
        this.isEatingApple = function(appleToEat){
            let head = this.body[0]; // Obtient la position de la tête du serpent.
            if(head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
                return true; // Retourne vrai si la tête du serpent est sur la position de la pomme.
            else
                return false; // Sinon, retourne faux.
        };
    };

    // Définition de l'objet Apple (pomme) en utilisant une fonction constructeur.
    function Apple(position){
        // Position de la pomme.
        this.position = position;

        // Cette méthode dessine la pomme sur le canvas.
        this.draw = function(){
            ctx.save(); // Enregistre le contexte du canvas.
            ctx.fillStyle = "rgb(210, 210, 210)"; // Remplit la pomme avec une couleur grise.
            ctx.beginPath();
            var radius = blockSize/2;
            var x = this.position[0] * blockSize + radius;
            var y = this.position[1] * blockSize + radius;
            ctx.arc (x, y, radius, 0, Math.PI * 2, true); // Dessine un cercle pour représenter la pomme.
            ctx.fill();
            ctx.restore(); // Restaure le contexte du canvas.
        }

        // Cette méthode génère une nouvelle position pour la pomme.
        this.setNewPosition = function(){
            let newX = Math.round(Math.random() * (widthInBlock - 1)); // Génère une nouvelle position X aléatoire.
            let newY = Math.round(Math.random() * (heightInBlock - 1)); // Génère une nouvelle position Y aléatoire.
            this.position = [newX, newY]; // Met à jour la position de la pomme.
        };


    };


    // Cette méthode vérifie si la position de la pomme est sur le serpent.
this.isOnSnake = function(snakeToCheck){
    let isOnSnake = false;

    // Parcours le corps du serpent.
    for(let i = 0; i < snakeToCheck.body.length; i++){
        // Si la position de la pomme correspond à une position du corps du serpent, met isOnSnake à vrai.
        if(this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]){
            isOnSnake = true;
        }
    }
    return isOnSnake; // Retourne vrai si la pomme est sur le serpent, sinon retourne faux.
};

// Cette fonction permet de redémarrer le jeu.
function rejouer() {
    console.log("Restarting the game...");
    snakee = new Snake([[6,4],[5,4],[4,4],[3,4],[2,4]], "right"); // Réinitialise le serpent avec une nouvelle position initiale.
    applee = new Apple([10, 10]); // Génère une nouvelle position pour la pomme.
    score = 0; // Réinitialise le score.
    refreshCanvas(); // Actualise le canvas pour recommencer le jeu.
};

// Cette fonction dessine le score sur le canvas.
function drawScore(){
    ctx.save(); // Enregistre le contexte du canvas.
    ctx.fillStyle = "#DAA520"; // Remplit le score avec une couleur dorée.
    ctx.font = " 40px serif"; // Définit la police et la taille du texte.
    ctx.fillText(score.toString(), 5, canvasHeight - 5); // Affiche le score en bas à gauche du canvas.
    ctx.restore(); // Restaure le contexte du canvas.
}

// Cette fonction gère les événements lorsque l'utilisateur appuie sur une touche du clavier.
document.onkeydown = function handleKeyDown(event){
    let pressedKey = event.key;

    switch(pressedKey){
        case "ArrowLeft":
            snakee.setDirection("left"); // Change la direction du serpent vers la gauche.
            break;
        case "ArrowRight":
            snakee.setDirection("right"); // Change la direction du serpent vers la droite.
            break;
        case "ArrowDown":
            snakee.setDirection("down"); // Change la direction du serpent vers le bas.
            break;
        case "ArrowUp":
            snakee.setDirection("up"); // Change la direction du serpent vers le haut.
            break;
        default:
            return; // Sort de la fonction si la touche pressée n'est pas prise en compte.
    }
};

// Ajoute un événement d'écoute pour la touche espace.
document.addEventListener("keydown", function(event) {
    if (event.key === " ") {
        rejouer(); // Appelle la fonction rejouer() lorsque la touche espace est pressée.
    }
});

// Configure la direction initiale du serpent.
snakee.setDirection();
};