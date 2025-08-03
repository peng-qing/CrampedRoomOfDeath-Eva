import { IPos } from "../base";
import { IEntity } from "../levels";
import { FSM_STATE } from "../state/state";
import { DIRECTION, EVENT_TYPE } from "../enum";
import { EventManager } from "../managers/event_manager";
import { EntityComponent } from "../base/entity_component";
import { WoodenskeletonStateMachineManager } from "../component/wooden_skeleton_state_machine_manager";

// 木骷髅管理器
export class WoodenSkeletonManager extends EntityComponent {
    // 组件名
    static componentName = "WoodenSkeletonManager";

    /** 移动速度 */
    readonly speed: number = 0;
    readonly attackRange: number = 1;

    constructor(entity: IEntity) { super(entity); }

    // 生命周期函数 初始化
    init(entity: IEntity): void {
        // 务必线初始化状态机
        if (!this.fsm) {
            this.fsm = this.gameObject.addComponent(new WoodenskeletonStateMachineManager());
        }
        super.init(entity);

        EventManager.instance.register(EVENT_TYPE.PLAYER_MOVE_END, this.onPlayerMoveEnd, this);
    }

    /**
     * 玩家移动结束
     * @param pos 结束时所在的位置 
     */
    onPlayerMoveEnd(pos: IPos) {
        const { x: playerX, y: playerY } = pos;
        const { x: selfX, y: selfY } = this.curPos;
        // 依据 y=x & y=-x 来分割木骷髅的视野方向 (需要注意下方为y正方向)
        // 向前: |y| >= |x| && y<=0
        // 向左：|y| <= |x| && x<=0
        // 向右：|y| <= |x| && x>=0
        // 向后：|y| >= |x| && y>=0
        const distanceX = playerX - selfX;
        const distanceY = playerY - selfY;
        // 目标玩家所处的相对位置就是 (distanceX, distanceY)
        if (distanceY >= 0 && Math.abs(distanceY) >= Math.abs(distanceX)) {
            // 向后
            this.fsm?.setParams(FSM_STATE.DIRECTION, DIRECTION.BOTTOM);
        }
        else if (distanceX <= 0 && Math.abs(distanceY) <= Math.abs(distanceX)) {
            // 向左
            this.fsm?.setParams(FSM_STATE.DIRECTION, DIRECTION.LEFT);
        }
        else if (distanceX >= 0 && Math.abs(distanceY) <= Math.abs(distanceX)) {
            // 向右
            this.fsm?.setParams(FSM_STATE.DIRECTION, DIRECTION.RIGHT);
        }
        else if (distanceY <= 0 && Math.abs(distanceY) >= Math.abs(distanceX)) {
            // 向前
            this.fsm?.setParams(FSM_STATE.DIRECTION, DIRECTION.TOP);
        }
        else {
            console.log(`[WoodenSkeletonManager] onPlayerMoveEnd calc target direction error, targetPos:(${distanceX},${distanceY}), selfPos:(${selfX},${selfY}), playerPos:(${playerX},${playerY})`);
        }
        // 触发攻击
        this.onAttack(pos);
    }

    /**
     * 触发木骷髅攻击玩家
     * @param pos 
     */
    onAttack(pos: IPos) {
        const { x: playerX, y: playerY } = pos;
        const { x: selfX, y: selfY } = this.curPos;

        // 玩家在其上下左右四个方向且在其攻击范围内 触发攻击
        // 如果是判断圆形攻击范围 应该是以木骷髅为圆心 其攻击范围为半径的圆 来判断
        // 这里值判断上下左右动画
        const distanceX = Math.abs(playerX - selfX);
        const distanceY = Math.abs(playerY - selfY);
        if ((distanceX <= 0 && distanceY <= 1) || (distanceY <= 0 && distanceX <= 1)) {
            this.fsm?.setParams(FSM_STATE.ATTACK, true);
        }
        else {
            this.fsm?.setParams(FSM_STATE.IDLE, true);
        }
    }
}