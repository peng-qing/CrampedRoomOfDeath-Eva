import { SpriteAnimation } from "@eva/plugin-renderer-sprite-animation";

import { ANIMATION_SPEED } from "../base";
import { StateMachineComponent } from "../base/state_machine_component";

export class WoodenskeletonStateMachineManager extends StateMachineComponent {
    static componentName: string = "WoodenskeletonStateMachineManager";

    constructor() { super(); }

    init(): void {
        this.gameObject.addComponent(new SpriteAnimation({
            autoPlay: false,
            forwards: true,
            resource: "",
            speed: ANIMATION_SPEED,
        }));

        this.initParams();
        this.initStates();
        this.initAnimationEvent();
    }

    initParams() {
    }

    initStates() {
    }

    initAnimationEvent() {
    }

    execute(): void {
    }
}