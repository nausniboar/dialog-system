"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../../engine/index.js";
import Hero from "../objects/hero.js";

class WalkingEnemy extends Hero {
    constructor(spriteTexture) {
        super(spriteTexture);
        this.getXform().setPosition(60, 50);
        this.mRenderComponent.setColor([1, 1, 1, 1]);
        this.walkingRight = true;
    }

    update() {
        // control by WASD
        let xform = this.getXform();
        if(xform.getXPos() > 70) {
            this.walkingRight = false;
        }
        if(xform.getXPos() < 50) {
            this.walkingRight = true;
        }
        let xDelta = this.walkingRight ? 0.1 : -0.1;
        let yDelta = 0;
        if(xDelta > 0) {
            this.direction = 3;
            this._walk();
        } else if(xDelta < 0) {
            this.direction = 1;
            this._walk();
        } else if(yDelta > 0) {
            this.direction = 2;
            this._walk();
        } else if(yDelta < 0) {
            this.direction = 4;
            this._walk();
        } else {
            this._stop();
        }
        xform.incYPosBy(yDelta);
        xform.incXPosBy(xDelta);
        this.lastDirection = this.direction;
        this.lastWalking = this.walking;
        this.mRenderComponent.updateAnimation();
    }
}

export default WalkingEnemy;