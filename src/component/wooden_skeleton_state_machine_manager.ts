import { SpriteAnimation } from "@eva/plugin-renderer-sprite-animation";

import { ANIMATION_SPEED } from "../base";
import { FSM_PARAM_TYPE, FSM_STATE } from "../state/state";
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
        const signals = [
            FSM_STATE.IDLE
        ];
        for (const state of signals) {
            this.params.set(state, {
                type: FSM_PARAM_TYPE.SIGNAL,
                value: false,
            });
        }
    }

    initStates() {
        // this.states.set(FSM_STATE.IDLE, new );
    }

    initAnimationEvent() {
        const spriteAnimation = this.gameObject.getComponent<SpriteAnimation>(SpriteAnimation.componentName);
        spriteAnimation.on("", () => {
        });
    }

    execute(): void {
    }
}