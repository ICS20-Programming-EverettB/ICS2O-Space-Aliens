/* global Phaser*/

// Copyright (c) 2023 Everett Bernard All right reserved
//
// Created by: Everett Bernard
// Created on: June 2023
// This is the Phaser3 configuration file
// This file contains the JS functions for index.html for chicken shooter

// Connecting splashScene.js, titleScene.js, menuScene.js, winScene.js sand gameScene.js to game.js
import SplashScene from "./splashScene.js"
import TitleScene from "./titleScene.js"
import MenuScene from "./menuScene.js"
import GameScene from "./gameScene.js"
import WinScene from "./winScene.js"


// all constants for all js files
const splashScene = new SplashScene()
const titleScene = new TitleScene()
const menuScene = new MenuScene()
const gameScene = new GameScene()
const winScene = new WinScene()

//* Game scene */
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: "arcade",
    arcade: {
      debug: false
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

// loading all scenes for later use 
//NOTE: any "key" is global and CAN NOT be reused
game.scene.add("splashScene", splashScene)
game.scene.add("titleScene", titleScene)
game.scene.add("menuScene", menuScene)
game.scene.add("gameScene", gameScene)
game.scene.add("winScene", winScene)

// start title screen
game.scene.start("splashScene")
