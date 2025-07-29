import Level1 from "./level_1";
import { FSM_STATE } from "../state/state";
import { DIRECTION, ENTITY_TYPE_ENUM, TILE_TYPE } from "../enum";

// 瓦片结构接口
export interface ITile {
    index: number | null;
    type: TILE_TYPE | null;
}

// 实体数据接口
export interface IEntity {
    x: number,
    y: number,
    direction: DIRECTION.TOP,
    state: FSM_STATE,
    type: ENTITY_TYPE_ENUM,
}

// 关卡接口数据
export interface ILevel {
    mapInfo: ITile[][];
    player: IEntity;
}

// 统一导出关卡数据
export const Levels: Record<string, ILevel> = {
    Level1,
}