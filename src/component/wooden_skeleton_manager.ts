import { Component } from "@eva/eva.js";

import { IPos } from "../base";
import { DIRECTION } from "../enum";
import { FSM_STATE } from "../state/state";
import { WoodenskeletonStateMachineManager } from "../component/wooden_skeleton_state_machine_manager";

// 玩家管理器
export class WoodenSkeletonManager extends Component {
    // 组件名
    static componentName = "WoodenSkeletonManager";

    // 当前位置
    curPos: IPos = {
        x: 0,
        y: 0,
    }
    // 目标位置
    targetPos: IPos = {
        x: 0,
        y: 0,
    }
    /** 移动速度 */
    readonly speed: number = 0;
    /** 是否移动中 */
    private isMoving: boolean = false;
    /** 角色朝向 */
    private direction_: DIRECTION = DIRECTION.TOP;
    /** 状态 */
    private state_: FSM_STATE = FSM_STATE.IDLE;
    /** 状态机 */
    fsm: WoodenskeletonStateMachineManager | undefined;

    constructor() { super(); }

    // 生命周期函数 初始化
    init(): void {
        // 重置数据
        this.curPos = {
            x: 2,
            y: 8,
        };
    }
}