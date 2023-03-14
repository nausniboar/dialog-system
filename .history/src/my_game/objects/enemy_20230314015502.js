"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../../engine/index.js";

class Enemy extends engine.GameObject {
    constructor(spriteTexture, color) {
        super(null);
        this.kDeltaDegree = 1;
        this.kDeltaRad = Math.PI * this.kDeltaDegree / 180;
        this.kDeltaSpeed = 0.01;
        this.mRenderComponent =  new engine.SpriteRenderable(spriteTexture);
        this.mRenderComponent.setColor([1, 0, 0, 0.5]);
        this.mRenderComponent.getXform().setPosition(50, 10);
        this.mRenderComponent.getXform().setSize(8, 8);
        this.mRenderComponent.setElementPixelPositions(0, 128, 384, 512);

        this.setSpeed(0.05);
    }

    update() {
        super.update();
    }
}

export default Enemy;