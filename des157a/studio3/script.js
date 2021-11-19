(function() {
    'use strict';
    console.log('reading js');

    window.addEventListener('load', function() {

        function Player(className) {
            let element = document.querySelector(`.${className}`);
            let score = 0;
            return {
                element: element,
                score: score,
                scoreElement: element.querySelector('.pscore'),
                getName: function() {
                    return this.element.querySelector('.pname').innerText;
                },
                addPoints: function(points) {
                    this.score += points;
                    this.scoreElement.innerText = `${this.score}`;
                },
                setPoints: function(points) {
                    this.score = points;
                    this.scoreElement.innerText = `${this.score}`;
                },
                toggleActivity: function() {
                    this.element.classList.toggle('inactive');
                }
            };
        }

        function Dice(element, value = 0) {
            return {
                element: element,
                value: value,
                shake: function() {
                    this.element.classList.add('shake');
                    setTimeout(() => {this.element.classList.remove('shake');}, 250);
                },
                checkOne: function() {
                    if(this.value == 1) {
                        this.element.classList.add('one');
                    }
                },
                roll: function(toShake = false, detectOne = false) {
                    this.element.classList.remove('one');
                    this.value = Math.floor(Math.random() * 6) + 1;
                    this.element.innerText = `${this.value}`;
                    if(detectOne) {
                        this.checkOne();
                    }
                    if(toShake) {
                        this.shake();
                    }
                    return this.value;
                },
            }
        }

        let turn = 0;
        const winningThreshold = 30;
        const player = [new Player('p1'), new Player('p2')]
        const msg = document.querySelector('.turn h4');
        const dice = document.querySelectorAll('.dice');
        const die1 = Dice(dice[0]);
        const die2 = Dice(dice[1]);
        const actions = this.document.getElementById('actions');
        const roll = document.getElementById("roll");
        const pass = document.getElementById("pass");
        const restart = document.getElementById("restart");
        const actionAudio = new Audio('audio/mixkit-game-ball-tap-2073.wav');
        const badRollAudio = new Audio('audio/mixkit-negative-guitar-tone-2324.wav');
        const snakeEyesAudio = new Audio('audio/mixkit-retro-arcade-game-over-470.wav');
        const winAudio = new Audio('audio/mixkit-bonus-extra-in-a-video-game-2064.wav');

        function playAudio(sound) {
            sound.pause();
            sound.currentTime = 0;
            sound.play();
        }

        function switchTurns() {
            turn = (turn + 1) % 2;
            msg.innerText = `Player ${turn + 1}'s Turn`;
            player[0].toggleActivity();
            player[1].toggleActivity();
        }

        function checkWinner() {
            if(player[turn].score >= winningThreshold) {
                playAudio(winAudio);
                actions.removeChild(roll);
                actions.removeChild(pass);
                msg.innerText = `Player ${turn + 1} Wins!!! ＼(^o^)／`;
            }
        }
        
        let rolling = false;
        let rollingInterval;
        roll.addEventListener('click', function() {
            playAudio(actionAudio);
            if(rolling) {
                clearInterval(rollingInterval);
                roll.innerText = 'Roll';
                die1.checkOne();
                die1.shake();
                die2.checkOne();
                die2.shake();
                if(die1.value == 1 && die2.value == 1) {
                    playAudio(snakeEyesAudio);
                    player[turn].setPoints(0);
                    switchTurns();
                } else if(die1.value == 1 || die2.value == 1) {
                    playAudio(badRollAudio);
                    switchTurns();
                } else {
                    player[turn].addPoints(die1.value + die2.value);
                    checkWinner();
                }
            } else {
                roll.innerText = 'Stop';
                rollingInterval = setInterval(function() {
                    die1.roll();
                    die2.roll();
                }, 100);
            }
            rolling = !rolling;
        });

        pass.addEventListener('click', function() {
            playAudio(actionAudio);
            switchTurns();
        });

        restart.addEventListener('click', function() {
            playAudio(actionAudio);
            location.reload();
            turn = 0;
        })

    });

}());