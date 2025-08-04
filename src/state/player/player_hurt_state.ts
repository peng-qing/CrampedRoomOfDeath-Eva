import { FSM_STATE } from "../state";
import { DIRECTION } from "../../enum";
import { SubState } from "../multi_state";
import { FrameAnimationState } from "../frame_animation_state";
import { StateMachineComponent } from "../../base/state_machine_component";

// 待机状态 继承自子状态机
// TODO： 这个状态时我扩展的 没资源 所以实际不会用到 仅供参考
export class PlayerHurtState extends SubState {
    constructor(fsm: StateMachineComponent) {
        super(fsm);
        this.init();
    }

    /** 初始化 */
    init(): void {
        this.states.set(
            FSM_STATE.HURT_TOP, new FrameAnimationState(this.frameAnimation,
                "player_hurt_top", 1));
        this.states.set(
            FSM_STATE.HURT_BOTTOM, new FrameAnimationState(this.frameAnimation,
                "player_hurt_bottom", 1));
        this.states.set(
            FSM_STATE.HURT_LEFT, new FrameAnimationState(this.frameAnimation,
                "player_hurt_left", 1));
        this.states.set(
            FSM_STATE.HURT_RIGHT, new FrameAnimationState(this.frameAnimation,
                "player_hurt_right", 1));
    }

    toRunState(direction: any): FSM_STATE {
        switch (direction) {
            case DIRECTION.TOP:
                return FSM_STATE.DEATH_TRAP_TOP;
            case DIRECTION.BOTTOM:
                return FSM_STATE.DEATH_TRAP_BOTTOM;
            case DIRECTION.LEFT:
                return FSM_STATE.DEATH_TRAP_LEFT;
            case DIRECTION.RIGHT:
                return FSM_STATE.DEATH_TRAP_RIGHT;
            default:
                return FSM_STATE.NONE;
        }
    }
}