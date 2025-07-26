import { Component } from "@eva/eva.js";
import { SpriteAnimation } from "@eva/plugin-renderer-sprite-animation";

import { DIRECTION } from "../enum";
import { IdleState } from "../state/idle_state";
import { TurnLeftState } from "../state/turn_left_state";
import { TurnRightState } from "../state/turn_right_state";
import { BlockFrontState } from "../state/block_front_state";
import { FSM_PARAM_TYPE, FSM_STATE, IState } from "../state/state";

// 帧动画速度
const ANIMATION_SPEED = 1000 / 8;

// 参数值类型
type IParamsValue = number | boolean;

// 状态机参数
interface IParams {
    type: FSM_PARAM_TYPE;
    value: IParamsValue;
}

/** 角色有限状态机管理器 */
export class PlayerStateMachineManager extends Component {
    /** 设置组件名称 */
    static componentName = "PlayerStateMachineManager";

    /** 状态机参数表 */
    private params: Map<FSM_STATE, IParams> = new Map();
    /** 状态机行为表 表示一个状态对应的一个完整行为 */
    private states: Map<FSM_STATE, IState> = new Map();
    /** 当前状态 */
    private curState_: FSM_STATE = FSM_STATE.NONE;

    /** 初始化 */
    init() {
        // 添加组件
        this.gameObject.addComponent(
            new SpriteAnimation({
                /** 状态机切换动画会调整为不同的资源 初始化不处理 */
                resource: "",
                speed: ANIMATION_SPEED,
                /** 帧动画播放完后 停留在最后一帧 */
                forwards: true,
                /** 取消默认播放 */
                autoPlay: false,
            }),
        );

        // 初始化参数表
        this.initParams();
        // 初始化状态表
        this.initStates();
        // 初始化帧动画事件
        this.initAnimationEvent();
    }

    /** 获取当前状态 */
    get curState() {
        return this.curState_;
    }

    /** 设置下一个状态 */
    set curState(nextState: FSM_STATE) {
        this.curState_ = nextState;
        const state = this.states.get(nextState);
        // 执行状态
        if (state) {
            state.run();
        }
    }

    /** 初始化参数表 */
    initParams() {
        // 待机
        this.params.set(FSM_STATE.IDLE, {
            type: FSM_PARAM_TYPE.SIGNAL,
            value: false,
        });

        // 左转
        this.params.set(FSM_STATE.TURN_LEFT, {
            type: FSM_PARAM_TYPE.SIGNAL,
            value: false,
        });

        // 右转
        this.params.set(FSM_STATE.TURN_RIGHT, {
            type: FSM_PARAM_TYPE.SIGNAL,
            value: false,
        });

        // 朝向
        this.params.set(FSM_STATE.DIRECTION, {
            type: FSM_PARAM_TYPE.STATUS,
            value: DIRECTION.TOP,
        });
        // 前向碰撞
        this.params.set(FSM_STATE.DIRECTION, {
            type: FSM_PARAM_TYPE.SIGNAL,
            value: false,
        });
    }

    /** 初始化状态表 */
    initStates() {
        const frameAnimation = this.gameObject.getComponent<SpriteAnimation>(SpriteAnimation.componentName);
        // 空闲
        this.states.set(
            FSM_STATE.IDLE,
            new IdleState(this, frameAnimation)
        );
        // 左转
        this.states.set(
            FSM_STATE.TURN_LEFT,
            new TurnLeftState(this, frameAnimation)
        );
        // 右转
        this.states.set(
            FSM_STATE.TURN_RIGHT,
            new TurnRightState(this, frameAnimation)
        )
        // 前向碰撞
        this.states.set(
            FSM_STATE.BLOCK_FRONT,
            new BlockFrontState(this, frameAnimation),
        );
    }

    /** 初始化帧动画事件 */
    initAnimationEvent() {
        const frameAnimation = this.gameObject.getComponent<SpriteAnimation>(SpriteAnimation.componentName);
        // 帧动画播放完后 切换状态
        frameAnimation.on("complete", () => {
            // 恢复状态
            const recoverIdle = [
                FSM_STATE.TURN_LEFT,
                FSM_STATE.TURN_RIGHT,
            ];
            if (recoverIdle.includes(this.curState)) {
                this.curState = FSM_STATE.IDLE;
            };
        });
    }

    /** 获取状态参数 */
    getParams(state: FSM_STATE) {
        return this.params.get(state) || null;
    }

    /** 设置状态参数 */
    setParams(state: FSM_STATE, paramsVal: IParamsValue) {
        if (this.params.has(state)) {
            const params = this.params.get(state);
            if (params) {
                params.value = paramsVal;
            }
            this.execute();
            this.tryRecoverParams();
        }
    }

    /** 恢复状态参数 */
    tryRecoverParams() {
        this.params.forEach((value) => {
            switch (value.type) {
                /** 参数类型为信号类 触发后应该恢复 */
                case FSM_PARAM_TYPE.SIGNAL:
                    value.value = false;
                    break;
            }
        });
    }

    /** 执行状态 */
    execute() {
        switch (this.curState) {
            case FSM_STATE.IDLE:
            case FSM_STATE.TURN_LEFT:
            case FSM_STATE.TURN_RIGHT:
                if (this.params.get(FSM_STATE.TURN_LEFT)?.value) {
                    this.curState = FSM_STATE.TURN_LEFT;
                }
                else if (this.params.get(FSM_STATE.TURN_RIGHT)?.value) {
                    this.curState = FSM_STATE.TURN_RIGHT;
                }
                else if (this.params.get(FSM_STATE.IDLE)?.value) {
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