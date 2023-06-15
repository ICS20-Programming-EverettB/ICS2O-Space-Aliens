/* global Phaser*/

// Copyright (c) 2023 Everett Bernard All right reserved
//
// Created by: Everett Bernard
// Created on: June 2023
// This is the Splash Scene
// This file contains the JS menu scene functions for index.html for chicken shooter

//getting scene code from from phaser library 
class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "menuScene" })

//variable for background image
    this.menuSceneBackgroundImage = null
    this.startButton = null
  }
  
 //this code gets the scene up and running, relating to phaser library
  init (data) {

  //setting scene background color using RGB
    this.cameras.main.setBackgroundColor("#FF9933")
  }

  //fetching menu scene and button from assets folder and assigning them to variables
  preload () {
    console.log("Menu Scene")
    this.load.image("menuSceneBackground", "./assets/menubackgroundfarm.jpg")
    this.load.image("startButton", "./assets/startButton.png")
  }

  create (data){
    
//create data for background
//setting cords and size of background image for menu scene
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, "menuSceneBackground").setScale(1)
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2

//create data for button
//setting size and scale to button to start game
    this.startButton= this.add.sprite(1920 / 2, (1080 / 2) + 100, "startButton").setScale(0.15)
    
//setting button image to be interactive as a button, making it functional
    this.startButton.setInteractive({ useHandCursor: true})
    this.startButton.on("pointerdown", () => this.clickButton())
  }

  update (time, delta) {
  }

//When button is clicked it will send user to gameScene
  clickButton () {
    this.scene.start("gameScene")
  }
}

export default MenuScene