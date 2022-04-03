import {Scene, Math as pMath} from 'phaser';

class GameScene extends Scene {
  constructor() {
    super("scene-game");
  }

  create() {
    this.prevStockPrice = 100;
    this.currentStockPrice = 100;
    this.money = 5000;
    this.stocks = 0;
    this.graphX = 0;

    this.bg3 = this.add.tileSprite(0, window.innerHeight - 750, window.innerWidth, 750, 'bg3');
    this.bg3.setOrigin(0, 0);
    this.bg3.setScrollFactor(0);

    this.bg2 = this.add.tileSprite(0, window.innerHeight - 600, window.innerWidth, 600, 'bg2');
    this.bg2.setOrigin(0, 0);
    this.bg2.setScrollFactor(0);

    this.bg1 = this.add.tileSprite(0, window.innerHeight - 300, window.innerWidth, 300, 'bg1');
    this.bg1.setOrigin(0, 0);
    this.bg1.setScrollFactor(0);
    
    this.candleGfx = this.add.graphics();

    this.stockText = this.add.text(window.innerWidth / 2, 40, `$${this.currentStockPrice.toFixed(2)}`, {
      color: '#000',
      fontFamily: 'monospace',
      fontSize: 42,
      align: 'center',
      wordWrap: {
        width: window.innerWidth - 40
      }
    });
    this.stockText.setOrigin(0.5, 0);
    this.stockText.setScrollFactor(0);

    this.sfxHype = this.sound.add('crowd-hype');
    this.sfxSad = this.sound.add('crowd-sad');

    this.stockTick = this.time.addEvent({
      delay: 2500,
      repeat: -1,
      callback: () => {
        this.sfxHype.stop();
        this.sfxSad.stop();

        const negativity = (pMath.Between(0, 1) === 0 ? -1 : 1);
        const stockDelta = (negativity * this.currentStockPrice * Math.random());

        this.currentStockPrice += stockDelta;

        this.stockText.setText(`$${this.currentStockPrice.toFixed(2)}`);

        let graphNegativity = 1;

        if (this.currentStockPrice > this.prevStockPrice) {
          this.candleGfx.fillStyle(0x00FF00, 1);

          this.broker1.play({
            key: 'broker1-hype',
            repeat: 0
          });
          this.broker2.play({
            key: 'broker2-hype',
            repeat: 0
          });
          // const seekTo = pMath.Between(3000, this.sfxHype.duration);
          // this.sfxHype.setSeek(seekTo);
          this.sfxHype.play();
        }
        else if (this.currentStockPrice < this.prevStockPrice) {
          this.candleGfx.fillStyle(0xFF0000, 1);
          graphNegativity = -1;

          this.broker1.play({
            key: 'broker1-sad',
            repeat: 0
          });
          this.broker2.play({
            key: 'broker2-sad',
            repeat: 0
          });
          // const seekTo = pMath.Between(3000, this.sfxSad.duration);
          // this.sfxSad.setSeek(seekTo);
          this.sfxSad.play();
        }

        const percentageDelta = (this.prevStockPrice / this.currentStockPrice);
        const candleHeight = (50 * percentageDelta * graphNegativity * -1);

        this.candleGfx.fillRect(this.graphX, -this.currentStockPrice, 50, candleHeight);

        this.cameras.main.pan(this.graphX, -this.currentStockPrice, 2000);

        this.graphX += 75;
        this.prevStockPrice = this.currentStockPrice;

        if (this.currentStockPrice.toFixed(2) === '0.00') {
          this.stockTick.remove();
          this.stockText.setText(`THE STOCK MARKET CRASHED!\n\nYou ${this.money - 5000 > 0 ? 'earned' : 'lost'} $${Math.abs(this.money - 5000).toFixed(2)}!`);
          this.btnPlayAgain.setVisible(true);
          this.btnBuy.setVisible(false);
          this.btnSell.setVisible(false);
        }
      }
    });

    this.broker1 = this.add.sprite(100, window.innerHeight - 40, 'broker1');
    this.broker1.play({
      key: 'broker1-hype',
      repeat: 0
    });
    this.broker1.setScrollFactor(0);
    this.broker1.setOrigin(0.5, 1);
    this.broker1.setScale(1.5);

    this.broker2 = this.add.sprite(window.innerWidth - 100, window.innerHeight - 40, 'broker2');
    this.broker2.play({
      key: 'broker2-hype',
      repeat: 0
    });
    this.broker2.setScrollFactor(0);
    this.broker2.setOrigin(0.5, 1);
    this.broker2.setScale(1.5);

    this.uiGfx = this.add.graphics();
    this.uiGfx.setScrollFactor(0);
    this.uiGfx.fillStyle(0x0055AA, 0.75);
    this.uiGfx.fillRect(0, window.innerHeight - 175, window.innerWidth, 175);

    this.btnBuy = this.add.text(10, window.innerHeight - 40, '(B)uy', {
      fontFamily: 'sans-serif',
      color: '#000',
      backgroundColor: '#FFF',
      padding: {
        x: 25,
        y: 15
      },
      fontSize: 20,
      fontStyle: 'bold'
    });
    this.btnBuy.setOrigin(0, 0.5);
    this.btnBuy.setScrollFactor(0);
    this.btnBuy.setInteractive();

    this.btnSell = this.add.text(window.innerWidth - 10, window.innerHeight - 40, '(S)ell', {
      fontFamily: 'sans-serif',
      color: '#000',
      backgroundColor: '#FFF',
      padding: {
        x: 25,
        y: 15
      },
      fontSize: 20,
      fontStyle: 'bold'
    });
    this.btnSell.setOrigin(1, 0.5);
    this.btnSell.setScrollFactor(0);
    this.btnSell.setInteractive();

    this.fundsLabel = this.add.text(window.innerWidth / 2, window.innerHeight - 120, `Money: $${this.money.toFixed(2)}\nStocks: ${this.stocks}`,
    {
      color: '#FFF',
      fontFamily: 'serif',
      fontSize: 24,
      fontStyle: 'bold'
    });
    this.fundsLabel.setOrigin(0.5);
    this.fundsLabel.setScrollFactor(0);

    this.btnPlayAgain = this.add.text(window.innerWidth / 2, window.innerHeight - 40, '(P)lay Again!', {
      fontFamily: 'sans-serif',
      color: '#000',
      backgroundColor: '#FFF',
      padding: {
        x: 25,
        y: 15
      },
      fontSize: 20,
      fontStyle: 'bold'
    });
    this.btnPlayAgain.setOrigin(0.5);
    this.btnPlayAgain.setScrollFactor(0);
    this.btnPlayAgain.setInteractive();
    this.btnPlayAgain.setVisible(false);

    this.buy = this.buy.bind(this);
    this.sell = this.sell.bind(this);
    this.playAgain = this.playAgain.bind(this);

    this.btnBuy.on('pointerdown', this.buy);
    this.input.keyboard.on('keydown-B', this.buy);

    this.btnSell.on('pointerdown', this.sell);
    this.input.keyboard.on('keydown-S', this.sell);

    this.btnPlayAgain.on('pointerdown', this.playAgain);
    this.input.keyboard.on('keydown-P', this.playAgain);

    this.cameras.main.pan(0, 0, 10);
    this.cameras.main.setBackgroundColor(0x74DBFC);
  }

  buy() {
    if (this.money >= this.currentStockPrice) {
      this.money -= this.currentStockPrice;
      this.stocks++;
    }
  }

  sell() {
    if (this.stocks > 0) {
      this.stocks--;
      this.money += this.currentStockPrice;
    }
  }

  playAgain() {
    if (this.currentStockPrice.toFixed(2) === '0.00') {
      this.sfxHype.destroy();
      this.sfxSad.destroy();
      this.scene.restart();
    }
  }

  update() {
    this.fundsLabel.setText(`Money: $${this.money.toFixed(2)}\nStocks: ${this.stocks}`);

    // Adjust for parallax
    this.bg1.tilePositionX = this.cameras.main.scrollX * 0.85;
    this.bg2.tilePositionX = this.cameras.main.scrollX * 0.35;
    this.bg3.tilePositionX = this.cameras.main.scrollX * 0.15;
  }

}
export default GameScene;