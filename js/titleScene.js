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
  }
  
 //this code gets the scene up and running, relating to phaser library.
  init (data) {

  //setting scene background color using RGB
    this.cameras.main.setBackgroundColor("#FFFFFF")
  }

  //printing what title scene the user is currently on 
  preload () {
    console.log("Title Scene")
  }

  create (data){
  }

  update (time, delta) {
  }
}

export default TitleScene