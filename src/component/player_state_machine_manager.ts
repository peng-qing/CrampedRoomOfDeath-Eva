import { SpriteAnimation } from "@eva/plugin-renderer-sprite-animation";

import { DIRECTION } from "../enum";
import { ANIMATION_SPEED } from "../base";
import { FSM_PARAM_TYPE, FSM_STATE } from "../state/state";
import { PlayerIdleState } from "../state/player/player_idle_state";
import { StateMachineComponent } from "../base/state_machine_component";
import { PlayerTurnLeftState } from "../state/player/player_turn_left_state";
import { PlayerTurnRightState } from "../state/player/player_turn_right_state";
import { PlayerBlockBackState } from "../state/player/player_block_back_state";
import { PlayerBlockLeftState } from "../state/player/player_block_left_state";
import { PlayerBlockFrontState } from "../state/player/player_block_front_state";
import { PlayerBlockRightState } from "../state/player/player_block_right_state";
import { PlayerBlockTurnLeftState } from "../state/player/player_block_turn_left_state";
import { PlayerBlockTurnRightState } from "../state/player/player_block_turn_right_state";

/** 角色有限状态机管理器 */
export class PlayerStateMachineManager extends StateMachineComponent {
    /** 设置组件名称 */
    static componentName = "PlayerStateMachineManager";

    constructor() { super(); }

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

    /** 初始化参数表 */
    initParams() {
        const signals = [
            FSM_STATE.IDLE,                 // 待机
            FSM_STATE.TURN_LEFT,            // 左转
            FSM_STATE.TURN_RIGHT,           // 右转
            FSM_STATE.BLOCK_FRONT,          // 前向碰撞
            FSM_STATE.BLOCK_BACK,           // 后向碰撞
            FSM_STATE.BLOCK_LEFT,           // 左侧碰撞
            FSM_STATE.BLOCK_RIGHT,          // 右侧碰撞
            FSM_STATE.BLOCK_TURN_LEFT,      // 左转碰撞
            FSM_STATE.BLOCK_TURN_RIGHT,     // 右转碰撞
        ];
        for (const state of signals) {
            this.params.set(state, {
                type: FSM_PARAM_TYPE.SIGNAL,
                value: false,
            });
        }

        // 朝向
        this.params.set(FSM_STATE.DIRECTION, {
            type: FSM_PARAM_TYPE.STATUS,
            value: DIRECTION.TOP,
        });
    }

    /** 初始化状态表 */
    initStates() {
        // 空闲
        this.states.set(FSM_STATE.IDLE, new PlayerIdleState(this));
        // 左转
        this.states.set(FSM_STATE.TURN_LEFT, new PlayerTurnLeftState(this));
        // 右转
        this.states.set(FSM_STATE.TURN_RIGHT, new PlayerTurnRightState(this));
        // 前向碰撞
        this.states.set(FSM_STATE.BLOCK_FRONT, new PlayerBlockFrontState(this));
        // 后向碰撞
        this.states.set(FSM_STATE.BLOCK_BACK, new PlayerBlockBackState(this));
        // 左侧碰撞
        this.states.set(FSM_STATE.BLOCK_LEFT, new PlayerBlockLeftState(this));
        // 右侧碰撞
        this.states.set(FSM_STATE.BLOCK_RIGHT, new PlayerBlockRightState(this));
        // 左转向碰撞
        this.states.set(FSM_STATE.BLOCK_TURN_LEFT, new PlayerBlockTurnLeftState(this));
        // 右转向碰撞
        this.states.set(FSM_STATE.BLOCK_TURN_RIGHT, new PlayerBlockTurnRightState(this));
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
                FSM_STATE.BLOCK_FRONT,
                FSM_STATE.BLOCK_BACK,
                FSM_STATE.BLOCK_LEFT,
                FSM_STATE.BLOCK_RIGHT,
                FSM_STATE.BLOCK_TURN_LEFT,
                FSM_STATE.BLOCK_TURN_RIGHT,
            ];
            if (recoverIdle.includes(this.curState)) {
                this.curState = FSM_STATE.IDLE;
            };
        });
    }

    /** 执行状态 */
    execute() {
        switch (this.curState) {
            case FSM_STATE.IDLE:
            case FSM_STATE.TURN_LEFT:
            case FSM_STATE.TURN_RIGHT:
            case FSM_STATE.BLOCK_FRONT:
            case FSM_STATE.BLOCK_BACK:
            case FSM_STATE.BLOCK_LEFT:
            case FSM_STATE.BLOCK_RIGHT:
            case FSM_STATE.BLOCK_TURN_LEFT:
            case FSM_STATE.BLOCK_TURN_RIGHT:
                if (this.params.get(FSM_STATE.TURN_LEFT)?.value) {
                    this.curState = FSM_STATE.TURN_LEFT;
                }
                else if (this.params.get(FSM_STATE.TURN_RIGHT)?.value) {
                    this.curState = FSM_STATE.TURN_RIGHT;
                }
                else if (this.params.get(FSM_STATE.IDLE)?.value) {
                    this.curState = FSM_STATE.IDLE;
                }
                else if (this.params.get(FSM_STATE.BLOCK_FRONT)?.value) {
                    this.curState = FSM_STATE.BLOCK_FRONT;
                }
                else if (this.params.get(FSM_STATE.BLOCK_BACK)?.value) {
                    this.curState = FSM_STATE.BLOCK_BACK;
                }
                else if (this.params.get(FSM_STATE.BLOCK_LEFT)?.value) {
                    this.curState = FSM_STATE.BLOCK_LEFT;
                }
                else if (this.params.get(FSM_STATE.BLOCK_RIGHT)?.value) {
                    this.curState = FSM_STATE.BLOCK_RIGHT;
                }
                else if (this.params.get(FSM_STATE.BLOCK_TURN_LEFT)?.value) {
                    this.curState = FSM_STATE.BLOCK_TURN_LEFT;
                }
                else if (this.params.get(FSM_STATE.BLOCK_TURN_RIGHT)?.value) {
                    this.curState = FSM_STATE.BLOCK_TURN_RIGHT;
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