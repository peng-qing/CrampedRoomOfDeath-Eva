import { Component } from "@eva/eva.js";

import { FSM_STATE } from "../state/state";
import { EventManager } from "../managers/event_manager";
import { GlobalDataManager } from "../managers/global_data_manager";
import { PlayerStateMachineManager } from "./player_state_machine_manager";
import { EVENT_TYPE, BUTTON_ACTION, TILE_WIDTH, TILE_HEIGHT, DIRECTION } from "../enum";

interface IPos {
    x: number,
    y: number,
}

// 玩家管理器
export class PlayerManager extends Component {
    // 组件名
    static componentName = "PlayerManager";

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
    readonly speed: number = 0.1;
    /** 是否移动中 */
    private isMoving: boolean = false;
    /** 角色朝向 */
    private direction_: DIRECTION = DIRECTION.TOP;
    /** 状态 */
    private state_: FSM_STATE = FSM_STATE.IDLE;
    /** 状态机 */
    fsm: PlayerStateMachineManager | undefined;

    constructor() { super(); }

    // 生命周期函数 初始化
    init(): void {
        // 重置数据
        this.curPos = {
            x: 2,
            y: 8,
        }
        this.targetPos = {
            x: 2,
            y: 8,
        }
        this.isMoving = false;
        this.direction = DIRECTION.TOP;
        if (!this.fsm) {
            this.fsm = this.gameObject.addComponent(new PlayerStateMachineManager());
            // 初始化 Idle 状态
            this.state = FSM_STATE.IDLE;
        }

        // 绑定移动事件
        EventManager.instance.register(EVENT_TYPE.PLAYER_CONTROL, this.onInput, this);
    }

    // 处理用户输入
    onInput(btnAction: BUTTON_ACTION) {
        if (this.willBlockControl(btnAction)) {
            return;
        }
        this.move(btnAction);
    }

    // 动态调用目标函数
    callDynamicMethod(funcName: string, ...args: any[]): any {
        // 检查方法存在
        if (!(funcName in this) || typeof this[funcName as keyof this] !== "function") {
            throw new Error(`Function ${funcName} does not exist or not a method`);
        }
        try {
            const fnCaller = this[funcName as keyof this] as (...args: any[]) => any;
            return fnCaller.apply(this, args);
        }
        catch (err) {
            throw new Error(`Error executing function ${funcName}: ${err}`);
        }
    }

    // 朝左 按上
    _checkAction_TOP_1(): boolean {
        const tileInfo = GlobalDataManager.instance.getAllTileManager();
        const { x, y } = this.targetPos;
        const playerNextY = y - 1;
        const weaponNexyY = y - 1;
        const weaponNexyX = x - 1;
        // 超地图边界
        if (playerNextY >= 0) {
            const playerNextTile = tileInfo[x][playerNextY];
            const weaponNextTile = tileInfo[weaponNexyX][weaponNexyY];
            if (playerNextTile && playerNextTile.isMoveable && (!weaponNextTile || weaponNextTile.isRotatable)) {
                return true;
            }
        }
        this.state = FSM_STATE.BLOCK_RIGHT;
        return false;
    }
    // 朝右 按上
    _checkAction_TOP_2(): boolean {
        const tileInfo = GlobalDataManager.instance.getAllTileManager();
        const { x, y } = this.targetPos;
        const playerNextY = y - 1;
        const weaponNexyY = y - 1;
        const weaponNexyX = x + 1;
        // 超地图边界
        if (playerNextY >= 0) {
            const playerNextTile = tileInfo[x][playerNextY];
            const weaponNextTile = tileInfo[weaponNexyX][weaponNexyY];
            if (playerNextTile && playerNextTile.isMoveable && (!weaponNextTile || weaponNextTile.isRotatable)) {
                return true;
            }
        }
        this.state = FSM_STATE.BLOCK_LEFT;
        return false;
    }
    // 朝上 按上
    _checkAction_TOP_3(): boolean {
        const tileInfo = GlobalDataManager.instance.getAllTileManager();
        const { x, y } = this.targetPos;
        const playerNextY = y - 1;
        const weaponNexyY = y - 2;
        // 超地图边界
        if (playerNextY >= 0) {
            const playerNextTile = tileInfo[x][playerNextY];
            const weaponNextTile = tileInfo[x][weaponNexyY];
            if (playerNextTile && playerNextTile.isMoveable && (!weaponNextTile || weaponNextTile.isRotatable)) {
                return true;
            }
        }
        this.state = FSM_STATE.BLOCK_FRONT;
        return false;
    }
    // 朝下 按上
    _checkAction_TOP_4(): boolean {
        const tileInfo = GlobalDataManager.instance.getAllTileManager();
        const { x, y } = this.targetPos;
        const playerNextY = y - 1;
        const weaponNexyY = y;
        // 超地图边界
        if (playerNextY >= 0) {
            const playerNextTile = tileInfo[x][playerNextY];
            const weaponNextTile = tileInfo[x][weaponNexyY];
            if (playerNextTile && playerNextTile.isMoveable && (!weaponNextTile || weaponNextTile.isRotatable)) {
                return true;
            }
        }
        this.state = FSM_STATE.BLOCK_BACK;
        return false;
    }
    // 朝左 按左
    _checkAction_LEFT_1(): boolean {
        const tileInfo = GlobalDataManager.instance.getAllTileManager();
        const { x, y } = this.targetPos;
        const playerNextX = x - 1;
        const weaponNexyX = x - 2;
        // 超地图边界
        if (playerNextX >= 0) {
            const playerNextTile = tileInfo[playerNextX][y];
            const weaponNextTile = tileInfo[weaponNexyX][y];
            if (playerNextTile && playerNextTile.isMoveable && (!weaponNextTile || weaponNextTile.isRotatable)) {
                return true;
            }
        }
        this.state = FSM_STATE.BLOCK_FRONT;
        return false;
    }
    // 朝右 按左
    _checkAction_LEFT_2(): boolean {
        const tileInfo = GlobalDataManager.instance.getAllTileManager();
        const { x, y } = this.targetPos;
        const playerNextX = x - 1;
        const weaponNexyX = x;
        // 超地图边界
        if (playerNextX >= 0) {
            const playerNextTile = tileInfo[playerNextX][y];
            const weaponNextTile = tileInfo[weaponNexyX][y];
            if (playerNextTile && playerNextTile.isMoveable && (!weaponNextTile || weaponNextTile.isRotatable)) {
                return true;
            }
        }
        this.state = FSM_STATE.BLOCK_BACK;
        return false;
    }
    // 朝上 按左
    _checkAction_LEFT_3(): boolean {
        const tileInfo = GlobalDataManager.instance.getAllTileManager();
        const { x, y } = this.targetPos;
        const playerNextX = x - 1;
        const weaponNexyX = x - 1, weaponNexyY = y - 1;
        // 超地图边界
        if (playerNextX >= 0) {
            const playerNextTile = tileInfo[playerNextX][y];
            const weaponNextTile = tileInfo[weaponNexyX][weaponNexyY];
            if (playerNextTile && playerNextTile.isMoveable && (!weaponNextTile || weaponNextTile.isRotatable)) {
                return true;
            }
        }
        this.state = FSM_STATE.BLOCK_LEFT;
        return false;
    }
    // 朝下 按左
    _checkAction_LEFT_4(): boolean {
        const tileInfo = GlobalDataManager.instance.getAllTileManager();
        const { x, y } = this.targetPos;
        const playerNextX = x - 1;
        const weaponNexyX = x - 1, weaponNexyY = y + 1;
        // 超地图边界
        if (playerNextX >= 0) {
            const playerNextTile = tileInfo[playerNextX][y];
            const weaponNextTile = tileInfo[weaponNexyX][weaponNexyY];
            if (playerNextTile && playerNextTile.isMoveable && (!weaponNextTile || weaponNextTile.isRotatable)) {
                return true;
            }
        }
        this.state = FSM_STATE.BLOCK_RIGHT;
        return false;
    }
    // 朝左 按右
    _checkAction_RIGHT_1(): boolean {
        const tileInfo = GlobalDataManager.instance.getAllTileManager();
        const { x, y } = this.targetPos;
        const playerNextX = x + 1;
        const weaponNexyX = x;
        // 超地图边
        if (playerNextX >= 0) {
            const playerNextTile = tileInfo[playerNextX][y];
            const weaponNextTile = tileInfo[weaponNexyX][y];
            if (playerNextTile && playerNextTile.isMoveable && (!weaponNextTile || weaponNextTile.isRotatable)) {
                return true;
            }
        }
        this.state = FSM_STATE.BLOCK_BACK;
        return false;
    }
    // 朝右 按右
    _checkAction_RIGHT_2(): boolean {
        const tileInfo = GlobalDataManager.instance.getAllTileManager();
        const { x, y } = this.targetPos;
        const playerNextX = x + 1;
        const weaponNexyX = x + 2;
        // 超地图边界
        if (playerNextX >= 0) {
            const playerNextTile = tileInfo[playerNextX][y];
            const weaponNextTile = tileInfo[weaponNexyX][y];
            if (playerNextTile && playerNextTile.isMoveable && (!weaponNextTile || weaponNextTile.isRotatable)) {
                return true;
            }
        }
        this.state = FSM_STATE.BLOCK_FRONT;
        return false;
    }
    // 朝上 按右
    _checkAction_RIGHT_3(): boolean {
        const tileInfo = GlobalDataManager.instance.getAllTileManager();
        const { x, y } = this.targetPos;
        const playerNextX = x + 1;
        const weaponNexyX = x + 1, weaponNexyY = y - 1;
        // 超地图边界
        if (playerNextX >= 0) {
            const playerNextTile = tileInfo[playerNextX][y];
            const weaponNextTile = tileInfo[weaponNexyX][weaponNexyY];
            if (playerNextTile && playerNextTile.isMoveable && (!weaponNextTile || weaponNextTile.isRotatable)) {
                return true;
            }
        }
        this.state = FSM_STATE.BLOCK_RIGHT;
        return false;
    }
    // 朝下 按右
    _checkAction_RIGHT_4(): boolean {
        const tileInfo = GlobalDataManager.instance.getAllTileManager();
        const { x, y } = this.targetPos;
        const playerNextX = x + 1;
        const weaponNexyX = x + 1, weaponNexyY = y + 1;
        // 超地图边界
        if (playerNextX >= 0) {
            const playerNextTile = tileInfo[playerNextX][y];
            const weaponNextTile = tileInfo[weaponNexyX][weaponNexyY];
            if (playerNextTile && playerNextTile.isMoveable && (!weaponNextTile || weaponNextTile.isRotatable)) {
                return true;
            }
        }
        this.state = FSM_STATE.BLOCK_LEFT;
        return false;
    }
    // 朝左 按下
    _checkAction_BOTTOM_1(): boolean {
        const tileInfo = GlobalDataManager.instance.getAllTileManager();
        const { x, y } = this.targetPos;
        const playerNextY = y + 1;
        const weaponNexyX = x - 1, weaponNexyY = y + 1;
        // 超地图边界
        if (playerNextY >= 0) {
            const playerNextTile = tileInfo[x][playerNextY];
            const weaponNextTile = tileInfo[weaponNexyX][weaponNexyY];
            if (playerNextTile && playerNextTile.isMoveable && (!weaponNextTile || weaponNextTile.isRotatable)) {
                return true;
            }
        }
        this.state = FSM_STATE.BLOCK_LEFT;
        return false;
    }
    // 朝右 按下
    _checkAction_BOTTOM_2(): boolean {
        const tileInfo = GlobalDataManager.instance.getAllTileManager();
        const { x, y } = this.targetPos;
        const playerNextY = y + 1;
        const weaponNexyX = x + 1, weaponNexyY = y + 1;
        // 超地图边界
        if (playerNextY >= 0) {
            const playerNextTile = tileInfo[x][playerNextY];
            const weaponNextTile = tileInfo[weaponNexyX][weaponNexyY];
            if (playerNextTile && playerNextTile.isMoveable && (!weaponNextTile || weaponNextTile.isRotatable)) {
                return true;
            }
        }
        this.state = FSM_STATE.BLOCK_RIGHT;
        return false;
    }
    // 朝上 按下
    _checkAction_BOTTOM_3(): boolean {
        const tileInfo = GlobalDataManager.instance.getAllTileManager();
        const { x, y } = this.targetPos;
        const playerNextY = y + 1;
        const weaponNexyY = y + 1;
        // 超地图边界
        if (playerNextY >= 0) {
            const playerNextTile = tileInfo[x][playerNextY];
            const weaponNextTile = tileInfo[x][weaponNexyY];
            if (playerNextTile && playerNextTile.isMoveable && (!weaponNextTile || weaponNextTile.isRotatable)) {
                return true;
            }
        }
        this.state = FSM_STATE.BLOCK_BACK;
        return false;
    }
    // 朝下 按下
    _checkAction_BOTTOM_4(): boolean {
        const tileInfo = GlobalDataManager.instance.getAllTileManager();
        const { x, y } = this.targetPos;
        const playerNextY = y + 1;
        const weaponNexyY = y + 2;
        // 超地图边界
        if (playerNextY >= 0) {
            const playerNextTile = tileInfo[x][playerNextY];
            const weaponNextTile = tileInfo[x][weaponNexyY];
            if (playerNextTile && playerNextTile.isMoveable && (!weaponNextTile || weaponNextTile.isRotatable)) {
                return true;
            }
        }
        this.state = FSM_STATE.BLOCK_FRONT;
        return false;
    }
    // 朝左 按左转
    _checkAction_TURN_LEFT_1(): boolean {
        const tileInfo = GlobalDataManager.instance.getAllTileManager();
        const { x, y } = this.targetPos;
        const weaponAllPos = [
            [x - 1, y + 1],
            [x, y + 1]
        ];
        for (const [weaponNexyX, weaponNexyY] of weaponAllPos) {
            const nextTile = tileInfo[weaponNexyX][weaponNexyY];
            if (nextTile && !nextTile.isRotatable) {
                this.state = FSM_STATE.BLOCK_TURN_LEFT;
                return false;
            }
        }
        return true;
    }
    // 朝右 按左转
    _checkAction_TURN_LEFT_2(): boolean {
        const tileInfo = GlobalDataManager.instance.getAllTileManager();
        const { x, y } = this.targetPos;
        const weaponAllPos = [
            [x + 1, y - 1],
            [x, y - 1]
        ];
        for (const [weaponNexyX, weaponNexyY] of weaponAllPos) {
            const nextTile = tileInfo[weaponNexyX][weaponNexyY];
            if (nextTile && !nextTile.isRotatable) {
                this.state = FSM_STATE.BLOCK_TURN_LEFT;
                return false;
            }
        }
        return true;
    }
    // 朝上 按左转
    _checkAction_TURN_LEFT_3(): boolean {
        const tileInfo = GlobalDataManager.instance.getAllTileManager();
        const { x, y } = this.targetPos;
        const weaponAllPos = [
            [x - 1, y - 1],
            [x - 1, y]
        ];
        for (const [weaponNexyX, weaponNexyY] of weaponAllPos) {
            const nextTile = tileInfo[weaponNexyX][weaponNexyY];
            if (nextTile && !nextTile.isRotatable) {
                this.state = FSM_STATE.BLOCK_TURN_LEFT;
                return false;
            }
        }
        return true;
    }
    // 朝下 按左转
    _checkAction_TURN_LEFT_4(): boolean {
        const tileInfo = GlobalDataManager.instance.getAllTileManager();
        const { x, y } = this.targetPos;
        const weaponAllPos = [
            [x + 1, y + 1],
            [x + 1, y]
        ];
        for (const [weaponNexyX, weaponNexyY] of weaponAllPos) {
            const nextTile = tileInfo[weaponNexyX][weaponNexyY];
            if (nextTile && !nextTile.isRotatable) {
                this.state = FSM_STATE.BLOCK_TURN_LEFT;
                return false;
            }
        }
        return true;
    }
    // 朝左 按右转
    _checkAction_TURN_RIGHT_1(): boolean {
        const tileInfo = GlobalDataManager.instance.getAllTileManager();
        const { x, y } = this.targetPos;
        const weaponAllPos = [
            [x - 1, y - 1],
            [x, y - 1]
        ];
        for (const [weaponNexyX, weaponNexyY] of weaponAllPos) {
            const nextTile = tileInfo[weaponNexyX][weaponNexyY];
            if (nextTile && !nextTile.isRotatable) {
                this.state = FSM_STATE.BLOCK_TURN_RIGHT;
                return false;
            }
        }
        return true;
    }
    // 朝右 按右转
    _checkAction_TURN_RIGHT_2(): boolean {
        const tileInfo = GlobalDataManager.instance.getAllTileManager();
        const { x, y } = this.targetPos;
        const weaponAllPos = [
            [x + 1, y + 1],
            [x, y + 1]
        ];
        for (const [weaponNexyX, weaponNexyY] of weaponAllPos) {
            const nextTile = tileInfo[weaponNexyX][weaponNexyY];
            if (nextTile && !nextTile.isRotatable) {
                this.state = FSM_STATE.BLOCK_TURN_RIGHT;
                return false;
            }
        }
        return true;
    }
    // 朝上 按右转
    _checkAction_TURN_RIGHT_3(): boolean {
        const tileInfo = GlobalDataManager.instance.getAllTileManager();
        const { x, y } = this.targetPos;
        const weaponAllPos = [
            [x + 1, y - 1],
            [x + 1, y]
        ];
        for (const [weaponNexyX, weaponNexyY] of weaponAllPos) {
            const nextTile = tileInfo[weaponNexyX][weaponNexyY];
            if (nextTile && !nextTile.isRotatable) {
                this.state = FSM_STATE.BLOCK_TURN_RIGHT;
                return false;
            }
        }
        return true;
    }
    // 朝下 按右转
    _checkAction_TURN_RIGHT_4(): boolean {
        const tileInfo = GlobalDataManager.instance.getAllTileManager();
        const { x, y } = this.targetPos;
        const weaponAllPos = [
            [x - 1, y + 1],
            [x - 1, y]
        ];
        for (const [weaponNexyX, weaponNexyY] of weaponAllPos) {
            const nextTile = tileInfo[weaponNexyX][weaponNexyY];
            if (nextTile && !nextTile.isRotatable) {
                this.state = FSM_STATE.BLOCK_TURN_RIGHT;
                return false;
            }
        }
        return true;
    }

    // 是否需要停止响应目标输入
    willBlockControl(btnAction: BUTTON_ACTION): boolean {
        // 为了避免一大堆的 if-else 导致结构不够简洁
        // 这里采用脚本语言的方式写 本质上是一样的
        const direction = this.direction;
        const fnName = `_checkAction_${btnAction}_${direction}`;

        try {
            const flag = this.callDynamicMethod(fnName) as boolean;
            if (!flag) {
                return true;
            }
        }
        catch (err) {
            console.error("[PlayerManager] willBlockMove faield, err: ", err);
            return true;
        }
        return false;
    }

    // 移动
    move(btnAction: BUTTON_ACTION) {
        switch (btnAction) {
            case BUTTON_ACTION.TOP:
                this.isMoving = true;
                this.targetPos.y -= 1;
                break;
            case BUTTON_ACTION.BOTTOM:
                this.isMoving = true;
                this.targetPos.y += 1;
                break;
            case BUTTON_ACTION.LEFT:
                this.isMoving = true;
                this.targetPos.x -= 1;
                break;
            case BUTTON_ACTION.RIGHT:
                this.isMoving = true;
                this.targetPos.x += 1;
                break;
            case BUTTON_ACTION.TURN_LEFT:
                this.isMoving = false;
                if (this.direction === DIRECTION.TOP) {
                    this.direction = DIRECTION.LEFT;
                } else if (this.direction === DIRECTION.LEFT) {
                    this.direction = DIRECTION.BOTTOM;
                } else if (this.direction === DIRECTION.BOTTOM) {
                    this.direction = DIRECTION.RIGHT;
                } else {
                    this.direction = DIRECTION.TOP;
                }
                this.state = FSM_STATE.TURN_LEFT;
                break;
            case BUTTON_ACTION.TURN_RIGHT:
                this.isMoving = false;
                if (this.direction === DIRECTION.TOP) {
                    this.direction = DIRECTION.RIGHT;
                } else if (this.direction === DIRECTION.RIGHT) {
                    this.direction = DIRECTION.BOTTOM;
                } else if (this.direction === DIRECTION.BOTTOM) {
                    this.direction = DIRECTION.LEFT;
                } else {
                    this.direction = DIRECTION.TOP;
                }
                this.state = FSM_STATE.TURN_RIGHT;
                break;
            default:
                break;
        }
    }

    // 生命周期函数 帧循环
    update(): void {
        this._frameMoveForSpeed();
        this._frameMoveForTransform();
    }

    // 帧移动 速度控制
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

    // 帧移动 位置控制
    _frameMoveForTransform() {
        // 每次移动一个虚拟单位都是一个地图单位(这里指的是瓦片)的大小
        // 因为人物和瓦片的单位像素大小不一样 所以需要赋初始偏移值 (这里大概是1.5瓦片大小)
        this.gameObject.transform.position.x = this.curPos.x * TILE_WIDTH - 1.5 * TILE_WIDTH;
        this.gameObject.transform.position.y = this.curPos.y * TILE_HEIGHT - 1.5 * TILE_HEIGHT;
    }

    get direction() {
        return this.direction_;
    }

    set direction(direction: DIRECTION) {
        this.direction_ = direction;
        this.fsm?.setParams(FSM_STATE.DIRECTION, direction);
    }

    get state() {
        return this.state_;
    }

    set state(nextState: FSM_STATE) {
        this.state_ = nextState;
        this.fsm?.setParams(nextState, true);
    }
}