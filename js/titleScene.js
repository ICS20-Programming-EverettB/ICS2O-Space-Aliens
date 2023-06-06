/* global Phaser*/

// Copyright (c) 2023 Everett Bernard All right reserved
//
// Created by: Everett Bernard
// Created on: June 2023
// This is the Splash Scene
// This file contains the JS title scene functions for index.html for chicken shooter

//getting scene code from from phaser library 
class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: "titleScene" })
    
//setting titlescenetext and titleSceneBackgroundImage variables to null
    this.titleSceneBackgroundImage = null
    this.titleSceneText = null
    
//variable for font, color and alignment of titleSceneTextStyle
    this.titleSceneTextStyle = { font: "50px Times", fill: "#fde4b9", align: "center" }
    
  }
  
//this code gets the scene up and running, relating to phaser library
  init (data) {

//setting scene background color using RGB
    this.cameras.main.setBackgroundColor("#FD7C4C")
  }

//printing the title scene back to the user
  preload () {
    console.log("Title Scene")
    this.load.image("titleSceneBackground", "./assets/ChickenTitleScene.png")
  }

  create (data) {

//setting image to be 2d and seting scale to image depending on screen size. Title text and chicken are both included in this image.
    this.titleSceneBackgroundImage = this.add.sprite(0, 0, "titleSceneBackground").setScale(1.3)
    this.titleSceneBackgroundImage.x = 1920 / 2
    this.titleSceneBackgroundImage.y = 1080 / 2

//adding text to titlescene, this text displays who created the game to the right of the screen
    this.titleSceneText = this.add.text(1920 / 2, (1080 / 2) + 350, "Created by: Everett Bernard", this.titleSceneTextStyle).setOrigin(-0.5)
  }

  update (time, delta) {
    if (time > 10000) {
      this.scene.switch("menuScene")
    }
  }
}

export default TitleScene