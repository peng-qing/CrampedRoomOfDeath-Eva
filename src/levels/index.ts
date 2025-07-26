import { TILE_TYPE } from "../enum";
import Level1 from "./level_1";

// 瓦片结构接口
export interface ITile {
    index: number | null;
    type: TILE_TYPE | null;
}

// 关卡接口数据
export interface ILevel {
    mapInfo: ITile[][];
}

// 统一导出关卡数据
export const Levels: Record<string, ILevel> = {
    Level1,
}