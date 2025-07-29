import { Component } from "@eva/eva.js";

import { FSM_STATE, IState, FSM_PARAM_TYPE, IParams, IParamsValue } from "../state/state";

export abstract class StateMachineComponent extends Component {
    static componentName: string = "StateMachine";

    /** 当前状态 */
    private curState_: FSM_STATE = FSM_STATE.NONE;
    /** 状态机参数表 */
    params: Map<FSM_STATE, IParams> = new Map();
    /** 状态机行为表 */
    states: Map<FSM_STATE, IState> = new Map();
    constructor() {
        super();
    }

    /** 获取当前状态 */
    get curState() {
        return this.curState_;
    }

    /** 设置新状态 */
    set curState(nextState: FSM_STATE) {
        this.curState_ = nextState;
        const state = this.states.get(nextState);
        // 执行状态
        if (!state) {
            throw new Error(`Invalid next state: ${nextState}`);
        }
        state.run();
    }

    /** 获取状态当前参数 */
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

    /** 抽象方法 子类重新实现并执行状态转换 */
    abstract execute(): void;

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
}