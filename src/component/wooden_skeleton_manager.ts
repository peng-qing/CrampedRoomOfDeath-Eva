import { IPos } from "../base";
import { DIRECTION } from "../enum";
import { IEntity } from "../levels";
import { FSM_STATE } from "../state/state";
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
    }
}