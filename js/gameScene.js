/* global Phaser*/

// Copyright (c) 2023 Everett Bernard All right reserved
//
// Created by: Everett Bernard
// Created on: June 2023
// This is the Splash Scene
// This file contains the JS game scene functions for index.html for chicken shooter

//getting scene code from from phaser library 
class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "gameScene" })

// setting background variable and player sprite variable to null along with setting missile to false
    this.background = null
    this.ship = null
    this.fireMissile = false
  }
  
 //this code gets the scene up and running, relating to phaser library
  init (data) {

//setting scene background color using RGB
    this.cameras.main.setBackgroundColor("#FF9933")
  }

//printing the title scene back to the user
  preload () {
    console.log("Game Scene")

//image for background of the game, egg projectile and chicken sprite
    this.load.image("farmBackground", "./assets/gamebackground.webp")
    this.load.image("chicken", "./assets/chicken.png")
    this.load.image("missile", "./assets/Egg.webp")

  }

//setting scale and origin of background image
  create (data){
    this.background = this.add.image(0, 0, "farmBackground").setScale(1.6)
    this.background.setOrigin(0, 0)

//setting scale and origin of chicken sprite
    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, "chicken").setScale(.1)

//setting egg to have similar physics to the chicken sprite
    this.missileGroup = this.physics.add.group()
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

//setting how quick the chicken moves to the left with D key
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
        
// scale and missile creation
        const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, "missile").setScale(.1)
        this.missileGroup.add(aNewMissile)
      }
    }

// if statment so you can create more than one egg
    if (keySpaceObj.isUp === true) {
      this.fireMissile = false 
    }
  }
}

export default GameScene