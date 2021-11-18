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
                roll: function() {
                    this.element.classList.remove('one');
                    let rolled = Math.floor(Math.random() * 6) + 1;
                    if(rolled == 1) {
                        this.element.classList.add('one');
                    }
                    this.value = rolled;
                    this.element.innerText = `${this.value}`;
                    return rolled;
                }
            }
        }

        let turn = true;
        const player1 = new Player('p1');
        const player2 = new Player('p2');
        const turnMsg = document.querySelector('.turn h4');
        const dice = document.querySelectorAll('.dice');
        const die1 = Dice(dice[0]);
        const die2 = Dice(dice[1]);
        const roll = document.getElementById("roll");
        const pass = document.getElementById("pass");
        const restart = document.getElementById("restart");

        function switchTurns() {
            turn = !turn;
            if(turn) {
                turnMsg.innerText = "Player 1's Turn";
            } else {
                turnMsg.innerText = "Player 2's Turn";
            }
            player1.toggleActivity();
            player2.toggleActivity();
        }

        function currentPlayer() {
            if(turn)
                return player1;
            else
                return player2;
        }
        
        roll.addEventListener('click', function() {
            let curPlayer = currentPlayer();
            die1.roll();
            die2.roll();
            if(die1.value == 1 && die2.value == 1) {
                curPlayer.setPoints(0);
                switchTurns();
            } else if(die1.value == 1 || die2.value == 1) {
                switchTurns();
            } else {
                curPlayer.addPoints(die1.value + die2.value);
            }
        });

        pass.addEventListener('click', function() {
            switchTurns();
        });

        restart.addEventListener('click', function() {
            location.reload();
        })

    });

}());