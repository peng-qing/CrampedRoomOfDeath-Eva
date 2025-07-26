// 状态机参数类型枚举
export enum FSM_PARAM_TYPE {
    /** 信号 */
    SIGNAL = "SIGNAL",
    /** 状态类型 */
    STATUS = "STATUS",
}

// 状态机状态枚举
export enum FSM_STATE {
    /** 空状态 无效状态 */
    NONE = "NONE",
    /** 待机状态 */
    IDLE = 'IDLE',
    IDLE_TOP = "IDLE_TOP",
    IDLE_BOTTOM = "IDLE_BOTTOM",
    IDLE_LEFT = "IDLE_LEFT",
    IDLE_RIGHT = "IDLE_RIGHT",
    /** 左转状态 */
    TURN_LEFT = "TURN_LEFT",
    TURN_LEFT_TOP = "TURN_LEFT_TOP",
    TURN_LEFT_BOTTOM = "TURN_LEFT_BOTTOM",
    TURN_LEFT_LEFT = "TURN_LEFT_LEFT",
    TURN_LEFT_RIGHT = "TURN_LEFT_RIGHT",
    /** 右转状态 */
    TURN_RIGHT = "TURN_RIGHT",
    TURN_RIGHT_TOP = "TURN_RIGHT_TOP",
    TURN_RIGHT_BOTTOM = "TURN_RIGHT_BOTTOM",
    TURN_RIGHT_LEFT = "TURN_RIGHT_LEFT",
    TURN_RIGHT_RIGHT = "TURN_RIGHT_RIGHT",
    /** 朝向 */
    DIRECTION = "DIRECTION",
    /** 前向碰撞 */
    BLOCK_FRONT = "BLOCK_FRONT",
    BLOCK_FRONT_TOP = "BLOCK_FRONT_TOP",
    BLOCK_FRONT_BOTTOM = "BLOCK_FRONT_BOTTOM",
    BLOCK_FRONT_LEFT = "BLOCK_FRONT_LEFT",
    BLOCK_FRONT_RIGHT = "BLOCK_FRONT_RIGHT",
}

/** 状态机行为抽象 */
export interface IState {
    /** 执行行为 */
    run(): void;
}

