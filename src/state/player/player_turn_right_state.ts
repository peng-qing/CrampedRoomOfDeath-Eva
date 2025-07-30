import { FSM_STATE } from "../state";
import { DIRECTION } from "../../enum";
import { SubState } from "../multi_state";
import { FrameAnimationState } from "../frame_animation_state";
import { StateMachineComponent } from "../../base/state_machine_component";

// 待机状态 继承自子状态机
export class PlayerTurnRightState extends SubState {
    constructor(fsm: StateMachineComponent) {
        super(fsm);
        this.init();
    }

    /** 初始化 */
    init(): void {
        this.states.set(
            FSM_STATE.TURN_RIGHT_TOP, new FrameAnimationState(this.frameAnimation, "player_turn_right_top", 1));
        this.states.set(
            FSM_STATE.TURN_RIGHT_BOTTOM, new FrameAnimationState(this.frameAnimation, "player_turn_right_bottom", 1));
        this.states.set(
            FSM_STATE.TURN_RIGHT_LEFT, new FrameAnimationState(this.frameAnimation, "player_turn_right_left", 1));
        this.states.set(
            FSM_STATE.TURN_RIGHT_RIGHT, new FrameAnimationState(this.frameAnimation, "player_turn_right_right", 1));
    }

    toRunState(direction: any): FSM_STATE {
        switch (direction) {
            case DIRECTION.TOP:
                return FSM_STATE.TURN_RIGHT_TOP;
            case DIRECTION.BOTTOM:
                return FSM_STATE.TURN_RIGHT_BOTTOM;
            case DIRECTION.LEFT:
                return FSM_STATE.TURN_RIGHT_LEFT;
            case DIRECTION.RIGHT:
                return FSM_STATE.TURN_RIGHT_RIGHT;
            default:
                return FSM_STATE.NONE;
        }
    }
}