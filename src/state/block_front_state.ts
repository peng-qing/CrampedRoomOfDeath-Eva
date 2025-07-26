import { SpriteAnimation } from "@eva/plugin-renderer-sprite-animation";

import { DIRECTION } from "../enum";
import { FSM_STATE } from "./state";
import { SubState } from "./multi_state";
import { FrameAnimationState } from "./frame_animation_state";
import { PlayerStateMachineManager } from "../component/player_state_machine_manager";

// 待机状态 继承自子状态机
export class BlockFrontState extends SubState {
    constructor(fsm: PlayerStateMachineManager, frameAnimation: SpriteAnimation) {
        super(fsm, frameAnimation);
        this.init();
    }

    /** 初始化 */
    init(): void {
        this.states.set(
            FSM_STATE.BLOCK_FRONT_TOP, new FrameAnimationState(this.frameAnimation, "player_block_front_top", 1));
        this.states.set(
            FSM_STATE.BLOCK_FRONT_BOTTOM, new FrameAnimationState(this.frameAnimation, "player_block_front_bottom", 1));
        this.states.set(
            FSM_STATE.BLOCK_FRONT_LEFT, new FrameAnimationState(this.frameAnimation, "player_block_front_left", 1));
        this.states.set(
            FSM_STATE.BLOCK_FRONT_RIGHT, new FrameAnimationState(this.frameAnimation, "player_block_front_right", 1));
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
                return FSM_STATE.BLOCK_FRONT_TOP;
            case DIRECTION.BOTTOM:
                return FSM_STATE.BLOCK_FRONT_BOTTOM;
            case DIRECTION.LEFT:
                return FSM_STATE.BLOCK_FRONT_LEFT;
            case DIRECTION.RIGHT:
                return FSM_STATE.BLOCK_FRONT_RIGHT;
            default:
                return FSM_STATE.NONE;
        }
    }
}