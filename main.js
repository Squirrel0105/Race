const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div');

car.classList.add('car')

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false,
    w: false,
    s: false,
    d: false,
    a: false
};

const setting = {
    start: false,
    score: 0,
    speed: 2,
    traffic: 3
};

function getQuantityElements(heightElement) {
    return document.documentElement.clientHeight / heightElement + 1;
}


function startGame() {
    start.classList.add('hide');
    gameArea.innerHTML = '';


    for (let i = 0; i < getQuantityElements(100); i++) {
        const line1 = document.createElement('div');
        const line2 = document.createElement('div');
        const line3 = document.createElement('div');
        line1.classList.add('line1');
        line2.classList.add('line2');
        line3.classList.add('line3');
        line1.style.top = (i * 100) + 'px';
        line2.style.top = (i * 100) + 'px';
        line3.style.top = (i * 100) + 'px';
        line1.y = i * 100;
        line2.y = i * 100;
        line3.y = i * 100;
        gameArea.appendChild(line1);
        gameArea.appendChild(line2);
        gameArea.appendChild(line3);
    }

    for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = "transparent url('./enemy.png') center / cover no-repeat";
        gameArea.appendChild(enemy);
    }
    setting.score = 0;
    setting.start = true;
    gameArea.appendChild(car);
    car.style.left = '275px';
    car.style.top = 'auto';
    car.style.bottom = '10px'
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);

}



function playGame() {
    if (setting.start) {
        setting.score += setting.speed;
        score.innerHTML = 'ОЧКИ<br> ' + setting.score;
        moveRoad();
        moveEnemy();
        if ((keys.ArrowLeft || keys.a) && setting.x > 0) {
            setting.x -= setting.speed;
        }
        if ((keys.ArrowRight || keys.d) && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
            setting.x += setting.speed;
        }
        if ((keys.ArrowUp || keys.w) && setting.y > 0) {
            setting.y -= setting.speed;
        }
        if ((keys.ArrowDown || keys.s) && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
            setting.y += setting.speed;
        }
        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';

        requestAnimationFrame(playGame);

    }
}

function startRun(event) {
    event.preventDefault()
    keys[event.key] = true;


}

function stopRun(event) {
    event.preventDefault()
    keys[event.key] = false;
}

function moveRoad() {
    let lines = document.querySelectorAll('.line1,.line2,.line3');
    lines.forEach(function (line) {
        line.y += setting.speed;
        line.style.top = line.y + 'px';

        if (line.y >= document.documentElement.clientHeight) {
            line.y = -100;
        }
    })
}

function moveEnemy() {
    let enemy = document.querySelectorAll('.enemy');

    enemy.forEach(function (item) {
        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();

        if (carRect.top <= enemyRect.bottom &&
            carRect.right >= enemyRect.left &&
            carRect.left <= enemyRect.right &&
            carRect.bottom >= enemyRect.top) {
            setting.start = false;
            console.log("ДТП");
            start.classList.remove('hide');
            start.style.top = '100px';
        }

        item.y += setting.speed / 2;
        item.style.top = item.y + 'px';

        if (item.y >= document.documentElement.clientHeight) {
            item.y = -100 * setting.traffic;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }

    })
}
