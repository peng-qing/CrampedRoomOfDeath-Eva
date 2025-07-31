import { SpriteAnimation } from "@eva/plugin-renderer-sprite-animation";

import { DIRECTION } from "../enum";
import { ANIMATION_SPEED } from "../base";
import { FSM_PARAM_TYPE, FSM_STATE } from "../state/state";
import { StateMachineComponent } from "../base/state_machine_component";
import { WoodenSkeletonIdleState } from "../state/wooden_skeleton/wooden_skeleton_state";

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
        // 朝向
        this.params.set(FSM_STATE.DIRECTION, {
            type: FSM_PARAM_TYPE.STATUS,
            value: DIRECTION.TOP,
        });
    }

    initStates() {
        this.states.set(FSM_STATE.IDLE, new WoodenSkeletonIdleState(this));
    }

    initAnimationEvent() {
        const spriteAnimation = this.gameObject.getComponent<SpriteAnimation>(SpriteAnimation.componentName);
        spriteAnimation.on("", () => {
        });
    }

    execute(): void {
        switch (this.curState) {
            case FSM_STATE.IDLE:
                if (this.params.get(FSM_STATE.IDLE)?.value) {
                    this.curState = FSM_STATE.IDLE;
                }
                else {
                    this.curState = this.curState;
                }
                break;
            default:
                this.curState = FSM_STATE.IDLE;
                break;
        }
    }
}