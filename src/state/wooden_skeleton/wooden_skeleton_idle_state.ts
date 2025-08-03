
import { FSM_STATE } from "../state";
import { DIRECTION } from "../../enum";
import { SubState } from "../multi_state";
import { FrameAnimationState } from "../frame_animation_state";
import { StateMachineComponent } from "../../base/state_machine_component";

// 待机状态 继承自子状态机
export class WoodenSkeletonIdleState extends SubState {
    constructor(fsm: StateMachineComponent) {
        super(fsm);
        this.init();
    }

    /** 初始化 */
    init(): void {
        this.states.set(FSM_STATE.IDLE_TOP, new FrameAnimationState(this.frameAnimation, "woodenskeleton_idle_top"));
        this.states.set(FSM_STATE.IDLE_BOTTOM, new FrameAnimationState(this.frameAnimation, "woodenskeleton_idle_bottom"));
        this.states.set(FSM_STATE.IDLE_LEFT, new FrameAnimationState(this.frameAnimation, "woodenskeleton_idle_left"));
        this.states.set(FSM_STATE.IDLE_RIGHT, new FrameAnimationState(this.frameAnimation, "woodenskeleton_idle_right"));
    }

    toRunState(direction: DIRECTION): FSM_STATE {
        switch (direction) {
            case DIRECTION.TOP:
                return FSM_STATE.IDLE_TOP;
            case DIRECTION.BOTTOM:
                return FSM_STATE.IDLE_BOTTOM;
            case DIRECTION.LEFT:
                return FSM_STATE.IDLE_LEFT;
            case DIRECTION.RIGHT:
                return FSM_STATE.IDLE_RIGHT;
            default:
                return FSM_STATE.NONE;
        }
    }
}