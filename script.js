new Vue({
  el: "#app",
  data: function() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      isRunning: false,
      logs: []
    };
  },
  methods: {
    startGame() {
      this.isRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    attack() {
      let damage = this.damageCalculation(3, 10);
      this.monsterHealth -= damage;
      this.logs.unshift({
        isPlayer: true,
        message: "Player hits monster with damage " + damage
      });
      if (this.isWinning()) {
        return;
      }
      this.monsterAttack();
    },
    specialAttack() {
      let damage = this.damageCalculation(10, 20);
      this.monsterHealth -= damage;
      this.logs.unshift({
        isPlayer: true,
        message: "Player hits monster with damage " + damage
      });
      if (this.isWinning()) {
        return;
      }
      this.monsterAttack();
    },
    monsterAttack() {
      let damage = this.damageCalculation(5, 12);
      this.playerHealth -= damage;
      this.logs.unshift({
        isPlayer: false,
        message: "Monster hits player with damage " + damage
      });
      this.isWinning();
    },
    heal() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.monsterAttack();
    },
    giveUp() {
      this.isRunning = false;
    },
    damageCalculation(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    isWinning() {
      if (this.monsterHealth <= 0) {
        if (confirm("You won this game!New Game?")) {
          this.startGame();
        } else {
          this.isRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("You lost this game!New Game?")) {
          this.startGame();
        } else {
          this.isRunning = false;
        }
        return true;
      }
      return false;
    }
  }
});
