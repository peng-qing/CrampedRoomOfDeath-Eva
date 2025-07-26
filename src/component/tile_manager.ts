import { Component } from "@eva/eva.js";

import { TILE_TYPE } from "../enum";


export class TileManager extends Component {
    // 组件名
    static componentName = "TileManager";
    // 瓦片类型
    tileType: TILE_TYPE = TILE_TYPE.EMPTY;
    // 是否可移动
    isMoveable: boolean = false;
    // 是否可旋转
    isRotatable: boolean = false;

    init(type: TILE_TYPE): void {
        this.tileType = type;

        switch (type) {
            case TILE_TYPE.EMPTY:
                throw new Error("瓦片类型错误 EMPTY");
                break;
            case TILE_TYPE.WALL_ROW:
            case TILE_TYPE.WALL_COLUMN:
            case TILE_TYPE.WALL_LEFT_TOP:
            case TILE_TYPE.WALL_RIGHT_TOP:
            case TILE_TYPE.WALL_LEFT_BOTTOM:
            case TILE_TYPE.WALL_RIGHT_BOTTOM:
                this.isMoveable = false;
                this.isRotatable = false;
                break;
            case TILE_TYPE.CLIFF_LEFT:
            case TILE_TYPE.CLIFF_CENTER:
            case TILE_TYPE.CLIFF_RIGHT:
                this.isMoveable = false;
                this.isRotatable = true;
                break;
            case TILE_TYPE.FLOOR:
                this.isMoveable = true;
                this.isRotatable = true;
                break;
        }
    }
}