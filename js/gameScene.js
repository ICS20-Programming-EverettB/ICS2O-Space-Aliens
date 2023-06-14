/* global Phaser*/

// Copyright (c) 2023 Everett Bernard All right reserved
//
// Created by: Everett Bernard
// Created on: June 2023
// This is the Splash Scene
// This file contains the JS game scene functions for index.html for chicken shooter

//getting scene code from from phaser library 
class GameScene extends Phaser.Scene {

// create a hawk
  createHawk() {

// generating random number to spawn hawk randomly on the y-axsis using math library 
   const hawkXLocation = Math.floor(Math.random() * 1920) + 1

// random route for the hawk to travel at
    let hawkXVelocity = Math.floor(Math.random() * 50) +1
    hawkXVelocity *= Math.round(Math.random()) ? 1 : -1
    
// adding physics and scale along with spawing the hawk
    const anHawk = this.physics.add.sprite(hawkXLocation, -100, "hawk").setScale(.35)

// setting the speed at which the hawk travels at
    anHawk.body.velocity.y = 175
    anHawk.body.velocity.x = hawkXVelocity
    this.hawkGroup.add(anHawk)
  }
  
//phaser library 
  constructor() {
    super({ key: "gameScene" })

// setting background variable and player sprite variable to null along with setting missile to false
    this.background = null
    this.ship = null
    this.fireMissile = false

// adding score variable with color and font
    this.score = 0
    this.scoreText = null
    this.scoreTextStyle = { font: "65x Arial", fill: "#fde4b9", align: "center"}

//adding variables and color, font for highscore 
    this.highScoreText = null
    this.highScoreTextStyle = { font: "65x Arial", fill: "#fde4b9", align: "center"}
 
//adding game over variable with color and font
    this.gameOverText = null
    this.gameOverTextStyle = { font: "65x Arial", fill: "#fde4b9", align: "center"}

//calculating user highScore and saving it to local storage
    this.highScore = localStorage.getItem("highScore") || 0
  }
  
 //this code gets the scene up and running, relating to phaser library
  init (data) {

//setting scene background color using RGB
    this.cameras.main.setBackgroundColor("#FF9933")
  }

//printing the title scene back to the user
  preload () {
    console.log("Game Scene")

//image for background of the game, egg projectile, winscene, hawk and chicken sprite
    this.load.image("farmBackground", "./assets/gamebackground.webp")
    this.load.image("chicken", "./assets/chicken.png")
    this.load.image("missile", "./assets/Egg.webp")
    this.load.image("hawk", "./assets/hawk.png")

//sound files
//sound for egg projectile and for hawk being eliminated (made by julien for me)
    this.load.audio("eggsound", "./assets/eggsound.mp3")
    this.load.audio("explosion", "./assets/hawknoise.mp3")
    this.load.audio("death", "./assets/gameovernoise.mp3")
  }
  
//setting scale and origin of background image
  create (data) {
    this.background = this.add.image(0, 0, "farmBackground").setScale(1.6)
    this.background.setOrigin(0, 0)
    
//background music from html 
    let myAudio = document.querySelector("audio")
    myAudio.volume = 0.3
    myAudio.play()

//displaying score back to user and calculating score 
    this.scoreText = this.add.text(10, 10, "Score: " + this.score.toString(), this.scoreTextStyle).setScale(5)

//displaying score back to user and calculating score 
    this.highScoreText = this.add.text(10, 55, "High Score: " + this.highScore.toString(), this.highScoreTextStyle).setScale(5)
    
    
//setting scale and origin of chicken sprite
    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, "chicken").setScale(.1)

//setting egg to have similar physics to the chicken sprite
    this.missileGroup = this.physics.add.group()

// creating a group for the hawks
    this.hawkGroup = this.add.group()
    this.createHawk()

// collisions between missiles and hawks
// adding collider between egg and hawk, using physics library
    this.physics.add.collider(this.missileGroup, this.hawkGroup, function (missileCollide, hawkCollide) {
      hawkCollide.destroy()
      missileCollide.destroy()

//sound for hawk being destroyed
      this.sound.play("explosion")
      
//getting score to display
      this.score = this.score + 1
      this.scoreText.setText("Score: " + this.score.toString())

//displaying win scene. Sending player to winScene if they get 100 points
      if (this.score == 100) {
         this.scene.switch("winScene")
      }
      
//creating 2 hawks for each hawk destroyed 
      this.createHawk()
      this.createHawk()
      
//displaying highscore to user and getting highscore with if statment 
      if (this.score > this.highScore) {
        this.highScore = this.score
        localStorage.setItem("highScore", this.highScore)
        this.highScoreText.setText("High Score: " + this.highScore.toString())
      }
    }.bind(this))

//Collision between hawk and chicken, pausing the game when they collide 
    this.physics.add.collider(this.ship, this.hawkGroup, function (shipCollide, hawkCollide) {

//disable space bar when loss
      const keySpaceObj = this.input.keyboard.addKey ("SPACE")
      keySpaceObj.enabled = false 
      this.sound.play("death")
      this.physics.pause()
      myAudio.volume = 0.0
      
//when they collide, destroy 
      hawkCollide.destroy()
      shipCollide.destroy()

//display when game over
      this.gameOverText = this.add.text(1920 / 2, 1080 / 2, "Game Over!\nClick to play again.", this.gameOverTextStyle).setOrigin(0.5).setScale(7)
      this.gameOverText.setInteractive({ useHandCursor: true })
      
//reset score when game over
      this.score=0

// sending user back to gameScene when they click play again
      this.gameOverText.on("pointerdown", () => this.scene.start("gameScene"))
    }.bind(this))

// random hawk spawn so you can not softlock the game
        this.hawkTimer = this.time.addEvent({
      delay: 3000,
      callback: this.createHawk,
      callbackScope: this,
      loop: true
    });
  }

  update (time, delta) {
    
//setting left key and A key to move sprite to the left 
    const keyLeftObj = this.input.keyboard.addKey("LEFT")
    const keyAObj = this.input.keyboard.addKey("A")
    
//setting right key and D key to move sprite to the right
    const keyRightObj = this.input.keyboard.addKey("RIGHT")
    const keyDObj = this.input.keyboard.addKey("D")
    
//setting spacebar to shoot the egg
    const keySpaceObj = this.input.keyboard.addKey("SPACE")

//setting how quick the chicken moves to the left with LEFT key
    if (keyLeftObj.isDown === true) {
      this.ship.x = this.ship.x - 13
      
//chicken will warp when touching left side of screen
      if (this.ship.x < 0) {
        this.ship.x = 1920
      }
    }

//setting how quick the chicken moves to the left with A key
    if (keyAObj.isDown === true) {
      this.ship.x = this.ship.x - 13
      
//chicken will warp when touching left side of screen
      if (this.ship.x < 0) {
        this.ship.x = 1920
      }
    }
    
//setting how quick the chicken moves to the right with RIGHT key
    if (keyRightObj.isDown === true) {
      this.ship.x = this.ship.x + 13
      
//chicken will warp when touching right side of screen
      if (this.ship.x > 1920) {
        this.ship.x = 0
      }
    }

//setting how quick the chicken moves to the right with D key
    if (keyDObj.isDown === true) {
      this.ship.x = this.ship.x + 13
      
//chicken will warp when touching right side of screen
      if (this.ship.x > 1920) {
        this.ship.x = 0
      }
    }
    
// if statment for creating new egg on the cords of chicken sprite when SPACEBAR is clicked. 
    if (keySpaceObj.isDown === true) {
      if (this.fireMissile === false) {
        
// when fired = true, only one egg can be fired for each space bar input
        this.fireMissile = true
        
// scale and egg creation
        const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, "missile").setScale(.1)
        this.missileGroup.add(aNewMissile)

//egg woosh sound effect when egg is fired
        this.sound.play("eggsound")
      }
    }

// if statment so you can create more than one egg
    if (keySpaceObj.isUp === true) {
      this.fireMissile = false 
    }

// making the eggs move. setting egg speed and cords for each egg
    this.missileGroup.children.each(function (item) {
      item.y = item.y - 15
      
//when egg is off screen, destroy it. To take up less memory 
      if (item.y < 0) {
        item.destroy()
      }
    })
  }
}

export default GameScene