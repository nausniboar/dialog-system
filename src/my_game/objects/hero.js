"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../../engine/index.js";

class Hero extends engine.GameObject {
    constructor(spriteTexture) {
        super(null);
        this.kDelta = 0.3;
        this.direction = 4;
        this.lastDirection = 4;
        this.walking = false;
        this.lastWalking = false;

        this.mRenderComponent = new engine.SpriteAnimateRenderable(spriteTexture);
        this.mRenderComponent.setColor([1, 1, 1, 0]);
        this.mRenderComponent.getXform().setPosition(35, 35);
        this.mRenderComponent.getXform().setSize(8, 8);
        this.mRenderComponent.setSpriteSequence(512, 0,
            128, 128, 
            1,
            0);
        this.mRenderComponent.setAnimationType(engine.eAnimationType.eRight);
        this.mRenderComponent.setAnimationSpeed(10);
    }

    update() {
        // control by WASD
        let xform = this.getXform();
        let xDelta = 0;
        let yDelta = 0;
        if (engine.input.isKeyPressed(engine.input.keys.W)) {
            yDelta += this.kDelta;
        }
        if (engine.input.isKeyPressed(engine.input.keys.S)) {
            yDelta -= this.kDelta;
        }
        if (engine.input.isKeyPressed(engine.input.keys.A)) {
            xDelta -= this.kDelta;
        }
        if (engine.input.isKeyPressed(engine.input.keys.D)) {
            xDelta += this.kDelta;
        }
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

    _walk() {
        this.walking = true;
        if(this.direction != this.lastDirection || this.walking && !this.lastWalking) {
            this.mRenderComponent.setSpriteSequence(this.direction * 128, 128,
                128, 128, 
                2,
                0);
        }
    }

    _stop() {
        this.walking = false;
        if(!this.walking && this.lastWalking) {
            this.mRenderComponent.setSpriteSequence(this.direction * 128, 0,
                128, 128, 
                1,
                0);
        }
    }
}

export default Hero;