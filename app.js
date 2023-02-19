function getRandomValue(min, max) {
    // random number from min to max
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logArr: []
        }
    },
    computed: {
        monsterBarWidth() { return this.monsterHealth > 0 ? { width: this.monsterHealth + '%' } : { width: '0%' } },
        playerBarWidth() { return this.playerHealth > 0 ? { width: this.playerHealth + '%' } : { width: '0%' } },
        specialAttackAvailable() { return this.currentRound % 3 !== 0 }
    },
    watch: {
        playerHealth(velue) {
            if (velue <= 0 && this.monsterHealth <= 0) this.winner = 'draw';
            else if (velue <= 0) this.winner = 'monster';
        },
        monsterHealth(velue) {
            if (velue <= 0 && this.playerHealth <= 0) this.winner = 'draw';
            else if (velue <= 0) this.winner = 'player';
        }
    },
    methods: {
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logArr = []
        },
        attackPlayer() {
            const damage = getRandomValue(8, 15);
            this.playerHealth -= damage;
            this.addLogMessage('Monster', 'attack', damage);
        },
        attackMonster() {
            this.currentRound++;
            const damage = getRandomValue(5, 12);
            this.monsterHealth -= damage;
            this.addLogMessage('Player', 'attack', damage);
            this.attackPlayer();
        },
        specialAttack() {
            this.currentRound++;
            const damage = getRandomValue(10, 25);
            this.monsterHealth -= damage;
            this.addLogMessage('Player', 'attack', damage);
            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++;
            const heal = getRandomValue(8, 20);
            if (this.playerHealth + heal > 100) this.playerHealth = 100;
            else this.playerHealth += heal;
            this.addLogMessage('Player', 'heal', heal);
            this.attackPlayer();
        },
        surrender() { this.winner = 'monster' },
        addLogMessage(who, what, value) {
            this.logArr.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    }
}).mount('#game')

