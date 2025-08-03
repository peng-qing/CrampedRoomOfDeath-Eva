
import { FSM_STATE } from "../state";
import { DIRECTION } from "../../enum";
import { SubState } from "../multi_state";
import { FrameAnimationState } from "../frame_animation_state";
import { StateMachineComponent } from "../../base/state_machine_component";

// 待机状态 继承自子状态机
export class WoodenSkeletonAttackState extends SubState {
    constructor(fsm: StateMachineComponent) {
        super(fsm);
        this.init();
    }

    /** 初始化 */
    init(): void {
        this.states.set(FSM_STATE.ATTACK_TOP, new FrameAnimationState(this.frameAnimation, "woodenskeleton_attack_top"));
        this.states.set(FSM_STATE.ATTACK_BOTTOM, new FrameAnimationState(this.frameAnimation, "woodenskeleton_attack_bottom"));
        this.states.set(FSM_STATE.ATTACK_LEFT, new FrameAnimationState(this.frameAnimation, "woodenskeleton_attack_left"));
        this.states.set(FSM_STATE.ATTACK_RIGHT, new FrameAnimationState(this.frameAnimation, "woodenskeleton_attack_right"));
    }

    toRunState(direction: DIRECTION): FSM_STATE {
        switch (direction) {
            case DIRECTION.TOP:
                return FSM_STATE.ATTACK_TOP;
            case DIRECTION.BOTTOM:
                return FSM_STATE.ATTACK_BOTTOM;
            case DIRECTION.LEFT:
                return FSM_STATE.ATTACK_LEFT;
            case DIRECTION.RIGHT:
                return FSM_STATE.ATTACK_RIGHT;
            default:
                return FSM_STATE.NONE;
        }
    }
}