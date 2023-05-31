/* global Phaser*/

// Copyright (c) 2023 Everett Bernard All right reserved
//
// Created by: Everett Bernard
// Created on: June 2023
// Tis is the Phaser3 configuration file
// This file contains the JS functions for index.html for chicken shooter

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
  backgroundColor: 0x513e7f,
  scale: {
    mode: Phaser.Scale.FIT,
    // we place it in the middle of the page.
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}

const game = new Phaser.Game(config)
console.log(game)
