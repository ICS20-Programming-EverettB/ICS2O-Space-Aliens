/* global Phaser*/

// Copyright (c) 2023 Everett Bernard All right reserved
//
// Created by: Everett Bernard
// Created on: June 2023
// This is the Splash Scene
// This file contains the JS splash scene functions for index.html for chicken shooter

//getting splashscene code from from phaser library 
class SplashScene extends Phaser.Scene {
  constructor() {
    super({ key: "splashScene" })
  }
  
 //this code gets the scene up and running, relating to phaser library.
  init (data) {

  //setting scene background color using RGB
    this.cameras.main.setBackgroundColor("#060CC7")
  }

  //printing what scene the user is currently on 
  preload () {
    console.log("Splash Scene")

  //loading immaculata logo for splashscene
    this.load.image("splashSceneBackground", "./assets/Immaculataicon.png")
  }

  //displaying immaculata logo for splash scene and setting x and y to be a 2d image that fits the size of the screen
  create (data){
    this.immaculataLogoImage = this.add.sprite(0, 0, "splashSceneBackground")
    this.immaculataLogoImage.x = 1920 / 2
    this.immaculataLogoImage.y = 1080 / 2
  }

  //timer to go from splash scene to title scene and to blank scene 
  update (time, delta) {
    if (time > 5000) {
      this.scene.switch("titleScene")
    }
  }
}

export default SplashScene