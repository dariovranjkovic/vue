new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.gameIsRunning = true;
            this.turns = [];
        },
        attack: function () {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                text: 'Player hits Moster for ' + damage,
                isPlayer: true
            });
            if(this.checkWin()){
                return;
            }
            
            damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage
            this.turns.unshift({
                text: 'Moster hits Player for ' + damage,
                isPlayer: false
            });
            this.checkWin();
        },
        specialAttack: function () {
            this.monsterHealth -= this.calculateDamage(10, 20);
            if(this.checkWin()){
                return;
            }   
            this.playerHealth -= this.calculateDamage(5, 12);
            this.checkWin();
        },
        heal: function () {
            if(this.playerHealth <= 90){
                this.playerHealth += 10;
            }
            else{
                this.playerHealth = 100;
            }
        },
        giveUp: function () {
            this.gameIsRunning = false;
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New Game')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New Game')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});