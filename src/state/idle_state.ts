
import { SpriteAnimation } from "@eva/plugin-renderer-sprite-animation";

import { DIRECTION } from "../enum";
import { FSM_STATE } from "./state";
import { SubState } from "./multi_state";
import { FrameAnimationState } from "./frame_animation_state";
import { PlayerStateMachineManager } from "../component/player_state_machine_manager";

// 待机状态 继承自子状态机
export class IdleState extends SubState {
    constructor(fsm: PlayerStateMachineManager, frameAnimation: SpriteAnimation) {
        super(fsm, frameAnimation);
        this.init();
    }

    /** 初始化 */
    init(): void {
        this.states.set(FSM_STATE.IDLE_TOP, new FrameAnimationState(this.frameAnimation, "player_idle_top"));
        this.states.set(FSM_STATE.IDLE_BOTTOM, new FrameAnimationState(this.frameAnimation, "player_idle_bottom"));
        this.states.set(FSM_STATE.IDLE_LEFT, new FrameAnimationState(this.frameAnimation, "player_idle_left"));
        this.states.set(FSM_STATE.IDLE_RIGHT, new FrameAnimationState(this.frameAnimation, "player_idle_right"));
    }

    /** 执行状态 */
    run(): void {
        const curDirection = this.fsm.getParams(FSM_STATE.DIRECTION);
        if (!curDirection) {
            return;
        }
        const state = this.toState(curDirection.value);
        const executor = this.states.get(state);
        executor?.run();
    }

    toState(direction: any): FSM_STATE {
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