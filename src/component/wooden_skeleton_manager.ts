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
    }
}