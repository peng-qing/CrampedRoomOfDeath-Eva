import { Component } from "@eva/eva.js";

import { IPos } from "./index";
import { IEntity } from "../levels";
import { FSM_STATE } from "../state/state";
import { DIRECTION, TILE_HEIGHT, TILE_WIDTH } from "../enum";
import { StateMachineComponent } from "./state_machine_component";

/**
 * 基础实体组件
 */
export class EntityComponent extends Component {
    // 组件名
    static componentName: string = "Entity";
    // 实体ID生成器
    static entityIDGenerator: number = 0;

    static getEntityUUID(): number {
        return ++EntityComponent.entityIDGenerator;
    }

    /** 实体ID */
    uuid: number = 0;
    /** 当前位置 */
    curPos: IPos = { x: 0, y: 0 }
    /** 目标位置 */
    targetPos: IPos = { x: 0, y: 0 }
    /** 移动速度 */
    speed: number = 0;
    /** 是否处于移动中 */
    private isMoving_: boolean = false;
    /** 实体朝向 */
    private direction_: DIRECTION = DIRECTION.TOP;
    /** 状态 */
    private state_: FSM_STATE = FSM_STATE.IDLE;
    /** 状态机 */
    fsm: StateMachineComponent | undefined;
    /** 攻击范围 */
    attackRange: number = 1;
    /** 血量 */
    maxHp: number = 1;
    /** 当前血量 */
    curHp: number = 1;
    /** 攻击力 */
    attack: number = 1;
    /** 防御力 */
    defense: number = 1;

    /** 构造函数 */
    constructor(entity: IEntity) {
        super(entity);
        this.uuid = EntityComponent.getEntityUUID();
    }

    /**
     * 初始化
     * @param entity 实体初始化书
     */
    init(entity: IEntity): void {
        this.attack = entity.attack;
        this.defense = entity.defense;
        this.maxHp = entity.maxHp;
        this.curHp = entity.maxHp;
        this.curPos = {
            x: entity.x,
            y: entity.y,
        }
        this.targetPos = {
            x: entity.x,
            y: entity.y,
        }
        this.isMoving = false;
        this.state = entity.state;
        this.direction = entity.direction;
    }

    /** 生命周期函数 帧循环 */
    update(): void {
        this._frameMoveForSpeed();
        this._frameMoveForTransform();
    }

    /** 帧移动 速度控制 */
    _frameMoveForSpeed() {
        if (!this.isMoving || this.speed <= 0) {
            // 未移动 或 速度为0
            return;
        }
        // 计算移动距离 这里并不是真的移动 真正的移动一定是调整GameObject的位置
        // x
        if (this.curPos.x < this.targetPos.x) {
            this.curPos.x += this.speed;
        } else if (this.curPos.x > this.targetPos.x) {
            this.curPos.x -= this.speed;
        }
        // y
        if (this.curPos.y < this.targetPos.y) {
            this.curPos.y += this.speed;
        } else if (this.curPos.y > this.targetPos.y) {
            this.curPos.y -= this.speed;
        }
        // 判断是否到达目标位置 如果很靠近了就视为到达 避免抽搐
        if (Math.abs(this.curPos.x - this.targetPos.x) < 0.01 && Math.abs(this.curPos.y - this.targetPos.y) < 0.01) {
            this.curPos.x = this.targetPos.x;
            this.curPos.y = this.targetPos.y;
            this.isMoving = false;
        }
    }

    /** 帧移动 位置控制 */
    _frameMoveForTransform() {
        // 每次移动一个虚拟单位都是一个地图单位(这里指的是瓦片)的大小
        // 因为人物和瓦片的单位像素大小不一样 所以需要赋初始偏移值 (这里大概是1.5瓦片大小)
        this.gameObject.transform.position.x = this.curPos.x * TILE_WIDTH - 1.5 * TILE_WIDTH;
        this.gameObject.transform.position.y = this.curPos.y * TILE_HEIGHT - 1.5 * TILE_HEIGHT;
    }

    /** 获取当前状态 */
    get state() {
        return this.state_;
    }

    /** 设置新状态 状态类参数信号一般都是一次性 */
    set state(nextState: FSM_STATE) {
        this.state_ = nextState;
        if (this.fsm) {
            this.fsm?.setParams(nextState, true);
        }
    }

    /** 获取当前朝向 */
    get direction() {
        return this.direction_;
    }

    /** 设置当前朝向 */
    set direction(newDirection: DIRECTION) {
        this.direction_ = newDirection;
        if (this.fsm) {
            this.fsm?.setParams(FSM_STATE.DIRECTION, this.direction_);
        }
    }

    /** 当前是否移动中 */
    get isMoving() {
        return this.isMoving_;
    }

    /** 设置当前是否移动 */
    set isMoving(isMoving_: boolean) {
        if (this.isMoving_ === isMoving_) {
            return;
        }
        this.isMoving_ = isMoving_;
        this.onMoveChanged(isMoving_);
    }

    /**
     * 移动状态发生改变
     * @param isMoving 变化后的移动状态
     */
    onMoveChanged(isMoving: boolean) {
    }
}