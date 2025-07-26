// 如何表示2D的瓦片地图信息
// 本质上是一个二维数组，二维数组的每项是一个单元的数据

import { TILE_TYPE } from "../enum";

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


export default {
    mapInfo: MapInfo,
}
