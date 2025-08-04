// 如何表示2D的瓦片地图信息
// 本质上是一个二维数组，二维数组的每项是一个单元的数据

import { IEntity } from "./index";
import { FSM_STATE } from "../state/state";
import { DIRECTION, ENTITY_TYPE_ENUM, TILE_TYPE } from "../enum";

/**
 * 关卡地图信息
 */
const MapInfo = [
    [
        {
            index: null,
            type: null,
        },
        {
            index: null,
            type: null,
        },
        {
            index: null,
            type: null,
        },
        {
            index: null,
            type: null,
        },
        {
            index: 16,
            type: TILE_TYPE.WALL_LEFT_TOP,
        },
        {
            index: 5,
            type: TILE_TYPE.WALL_COLUMN,
        },
        {
            index: 5,
            type: TILE_TYPE.WALL_COLUMN,
        },
        {
            index: 5,
            type: TILE_TYPE.WALL_COLUMN,
        },
        {
            index: 13,
            type: TILE_TYPE.WALL_LEFT_BOTTOM,
        },
        {
            index: 18,
            type: TILE_TYPE.CLIFF_LEFT,
        }
    ],
    [
        {
            index: 16,
            type: TILE_TYPE.WALL_LEFT_TOP,
        },
        {
            index: 5,
            type: TILE_TYPE.WALL_COLUMN,
        },
        {
            index: 5,
            type: TILE_TYPE.WALL_COLUMN,
        },
        {
            index: 5,
            type: TILE_TYPE.WALL_COLUMN,
        },
        {
            index: 14,
            type: TILE_TYPE.WALL_RIGHT_BOTTOM,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 21,
            type: TILE_TYPE.WALL_RIGHT_BOTTOM,
        },
        {
            index: 17,
            type: TILE_TYPE.CLIFF_CENTER,
        },
    ],
    [
        {
            index: 9,
            type: TILE_TYPE.WALL_ROW,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 17,
            type: TILE_TYPE.CLIFF_CENTER,
        },
    ],
    [
        {
            index: 9,
            type: TILE_TYPE.WALL_ROW,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 16,
            type: TILE_TYPE.WALL_LEFT_TOP,
        },
        {
            index: 13,
            type: TILE_TYPE.WALL_LEFT_BOTTOM,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 20,
            type: TILE_TYPE.WALL_LEFT_BOTTOM,
        },
        {
            index: 17,
            type: TILE_TYPE.CLIFF_CENTER,
        },
    ],
    [
        {
            index: 15,
            type: TILE_TYPE.WALL_RIGHT_TOP,
        },
        {
            index: 13,
            type: TILE_TYPE.WALL_LEFT_BOTTOM,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 9,
            type: TILE_TYPE.WALL_ROW,
        },
        {
            index: 15,
            type: TILE_TYPE.WALL_RIGHT_TOP,
        },
        {
            index: 5,
            type: TILE_TYPE.WALL_COLUMN,
        },
        {
            index: 5,
            type: TILE_TYPE.WALL_COLUMN,
        },
        {
            index: 5,
            type: TILE_TYPE.WALL_COLUMN,
        },
        {
            index: 14,
            type: TILE_TYPE.WALL_RIGHT_BOTTOM,
        },
        {
            index: 19,
            type: TILE_TYPE.CLIFF_RIGHT,
        },
    ],
    [
        {
            index: null,
            type: null,
        },
        {
            index: 9,
            type: TILE_TYPE.WALL_ROW,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 9,
            type: TILE_TYPE.WALL_ROW,
        },
        {
            index: 16,
            type: TILE_TYPE.WALL_LEFT_TOP,
        },
        {
            index: 5,
            type: TILE_TYPE.WALL_COLUMN,
        },
        {
            index: 5,
            type: TILE_TYPE.WALL_COLUMN,
        },
        {
            index: 5,
            type: TILE_TYPE.WALL_COLUMN,
        },
        {
            index: 13,
            type: TILE_TYPE.WALL_LEFT_BOTTOM,
        },
        {
            index: 18,
            type: TILE_TYPE.CLIFF_LEFT,
        },
    ],
    [
        {
            index: 16,
            type: TILE_TYPE.WALL_LEFT_TOP,
        },
        {
            index: 14,
            type: TILE_TYPE.WALL_RIGHT_BOTTOM,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 15,
            type: TILE_TYPE.WALL_RIGHT_TOP,
        },
        {
            index: 14,
            type: TILE_TYPE.WALL_RIGHT_BOTTOM,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 21,
            type: TILE_TYPE.WALL_RIGHT_BOTTOM,
        },
        {
            index: 19,
            type: TILE_TYPE.CLIFF_RIGHT,
        },
    ],
    [
        {
            index: 9,
            type: TILE_TYPE.WALL_ROW,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 17,
            type: TILE_TYPE.CLIFF_CENTER,
        },
    ],
    [
        {
            index: 9,
            type: TILE_TYPE.WALL_ROW,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 16,
            type: TILE_TYPE.WALL_LEFT_TOP,
        },
        {
            index: 13,
            type: TILE_TYPE.WALL_LEFT_BOTTOM,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 1,
            type: TILE_TYPE.FLOOR,
        },
        {
            index: 20,
            type: TILE_TYPE.WALL_LEFT_BOTTOM,
        },
        {
            index: 17,
            type: TILE_TYPE.CLIFF_CENTER,
        },
    ],
    [
        {
            index: 15,
            type: TILE_TYPE.WALL_RIGHT_TOP,
        },
        {
            index: 5,
            type: TILE_TYPE.WALL_COLUMN,
        },
        {
            index: 5,
            type: TILE_TYPE.WALL_COLUMN,
        },
        {
            index: 14,
            type: TILE_TYPE.WALL_RIGHT_BOTTOM,
        },
        {
            index: 15,
            type: TILE_TYPE.WALL_RIGHT_TOP,
        },
        {
            index: 5,
            type: TILE_TYPE.WALL_COLUMN,
        },
        {
            index: 5,
            type: TILE_TYPE.WALL_COLUMN,
        },
        {
            index: 5,
            type: TILE_TYPE.WALL_COLUMN,
        },
        {
            index: 14,
            type: TILE_TYPE.WALL_RIGHT_BOTTOM,
        },
        {
            index: 19,
            type: TILE_TYPE.CLIFF_RIGHT,
        },
    ],
];

// 玩家出生点
const Player: IEntity = {
    x: 2,
    y: 8,
    direction: DIRECTION.TOP,
    state: FSM_STATE.IDLE,
    type: ENTITY_TYPE_ENUM.PLAYER,
    attack: 1,
    defense: 0,
    maxHp: 1,
};

// 敌人出生点
const EnemyList: IEntity[] = [
    {
        x: 7,
        y: 6,
        direction: DIRECTION.TOP,
        state: FSM_STATE.IDLE,
        type: ENTITY_TYPE_ENUM.WOODEN_SKELETON,
        attack: 1,
        defense: 0,
        maxHp: 1,
    }
];

export default {
    mapInfo: MapInfo,
    player: Player,
    enemyList: EnemyList,
}
