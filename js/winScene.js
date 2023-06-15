/* global Phaser*/

// Copyright (c) 2023 Everett Bernard All right reserved
//
// Created by: Everett Bernard
// Created on: June 2023
// This is the Splash Scene
// This file contains the JS win scene functions for index.html for chicken shooter

//getting scene code from from phaser library 
class WinScene extends Phaser.Scene {
  constructor() {
    super({ key: "winScene" })

//variable for background image
    this.menuSceneBackgroundImage = null
    this.startButton = null
  }
  
 //this code gets the scene up and running, relating to phaser library
  init (data) {

  //setting winscene background color using RGB
    this.cameras.main.setBackgroundColor("#FF9933")
  }

  //printing the win scene and button back to the user with background image
  preload () {
    console.log("Win Scene")
    this.load.image("winSceneBackground", "./assets/winSceneImage.jpeg")
    this.load.image("winButton", "./assets/winButton.png")
  }

  create (data){
    
//create data for background
//setting cords and size of background image for win scene
    this.winSceneBackgroundImage = this.add.sprite(0, 0, "winSceneBackground").setScale(2.5)
    this.winSceneBackgroundImage.x = 1920 / 2
    this.winSceneBackgroundImage.y = 1080 / 2

//create data for button
//setting size and scale to button to start game
    this.startButton= this.add.sprite(1920 / 2, (1080 / 2) + 100, "winButton").setScale(0.50)
    
//setting button image to be interactive as a button, making it functional
    this.startButton.setInteractive({ useHandCursor: true})
    this.startButton.on("pointerdown", () => this.clickButton())
  }

  update (time, delta) {
  }

//Click button function 
  clickButton () {
    this.scene.start("gameScene")
  }
}

export default WinScene