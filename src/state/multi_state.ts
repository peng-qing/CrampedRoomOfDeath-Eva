
import { SpriteAnimation } from "@eva/plugin-renderer-sprite-animation";

import { IState, FSM_STATE } from "./state";
import { PlayerStateMachineManager } from "../component/player_state_machine_manager";

// 子状态机 多状态管理 管理一些相似的子状态集 避免顶层状态机过于臃肿
// 可以理解为一个状态对应一个状态机
// 例如 待机状态 可以有 左右待机 前后待机 左右前中后待机 等状态
export abstract class SubState implements IState {
    /** 子状态机状态表 */
    states: Map<FSM_STATE, IState> = new Map();
    /** 当前状态 */
    curState_: FSM_STATE = FSM_STATE.NONE;
    /** 状态机管理器 */
    fsm: PlayerStateMachineManager;
    /** 帧动画组件 */
    frameAnimation: SpriteAnimation;


    /** 构造函数 */
    constructor(fsm: PlayerStateMachineManager) {
        this.fsm = fsm;
        this.frameAnimation = fsm.gameObject.getComponent(SpriteAnimation.componentName);
    }

    get curState() {
        return this.curState_;
    }

    set curState(state: FSM_STATE) {
        this.curState_ = state;
    }

    /** 状态执行 */
    run(): void {
        const curDirection = this.fsm.getParams(FSM_STATE.DIRECTION);
        if (!curDirection) {
            return;
        }
        const state = this.toRunState(curDirection.value);
        const executor = this.states.get(state);
        if (!executor) {
            throw new Error("请检查方向状态是否被错误覆盖...");
        }
        executor.run();
    };

    /** 状态切换 转换为具体的执行子状态 */
    abstract toRunState(direction: any): FSM_STATE;
}