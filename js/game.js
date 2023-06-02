/* global Phaser*/

// Copyright (c) 2023 Everett Bernard All right reserved
//
// Created by: Everett Bernard
// Created on: June 2023
// This is the Phaser3 configuration file
// This file contains the JS functions for index.html for chicken shooter

// Connecting splashScene.js and titleScene.js to game.js
import SplashScene from "./splashScene.js"
import TitleScene from "./titleScene.js"

// all constants for game scenes
const splashScene = new SplashScene()
const titleScene = new TitleScene()

//* Game scene */
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  },
  
  // set background color
  backgroundColor: 0x0009FF,
  scale: {
    mode: Phaser.Scale.FIT,
    
    // autocentering game to always appear in the middle of the screen
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}

const game = new Phaser.Game(config)

// load splashscene and titlescene
//NOTE: any "key" is global and CAN NOT be reused
game.scene.add("splashScene", splashScene)
game.scene.add("titleScene", titleScene)

// start title screen
game.scene.start("splashScene")
