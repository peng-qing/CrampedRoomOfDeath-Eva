import { Component } from "@eva/eva.js";

import { TILE_TYPE } from "../enum";
import { getRandom } from "../utils/utils";
import { TileManager } from "./tile_manager";
import { Tile } from "../scenes/battle/game_object/tile";
import { GlobalDataManager } from "../managers/global_data_manager";

// 地图随机最小间隔
const MIN_INTERVAL = 3;
// 地图随机最大间隔
const MAX_INTERVAL = 7;

export class TileMapManager extends Component {
    static componentName = 'TileMapManager';

    // 用于地图随机
    private _randCount: number = 0;
    private _generateIndex: number = 0;

    /**
     * 初始化
     */
    init(): void {
        // 先随机一个生成间隔
        this._randCount = getRandom(MIN_INTERVAL, MAX_INTERVAL);
        this._generateIndex = 0;
        // 获取地图信息
        const mapInfo = GlobalDataManager.instance.getMapInfo();
        for (let i = 0; i < mapInfo.length; i++) {
            for (let j = 0; j < mapInfo[i].length; j++) {
                const tile = mapInfo[i][j];
                if (tile.index === null || tile.type === null) {
                    // 无效
                    continue;
                }
                // 注意: 这里的索引是从1开始的
                let resIndex = tile.index;
                // 这部分逻辑是为了让地图出现一定的随机样式
                // 对于相同类型的瓦片 从素材中随机产生一张 避免地图样式单一
                // 但是如果对所有的类型瓦片都随机 地图的结果并不和谐 
                // 简单优化 让结果稍微离散一些
                if (this._tryGenerateOtherTile()) {
                    // 目前支持的瓦片类型
                    // resIndex 跟素材编号有关系 
                    // index 为1、5、9的tile有多种图片，随机挑一张图来渲染
                    switch (tile.type) {
                        case TILE_TYPE.FLOOR:
                            resIndex = getRandom(1, 4);
                            break;
                        case TILE_TYPE.WALL_COLUMN:
                            resIndex = getRandom(5, 8);
                            break;
                        case TILE_TYPE.WALL_ROW:
                            resIndex = getRandom(9, 12);
                            break;
                        default:
                            break;
                    }
                }

                // 创建瓦片对象
                const imgSrc = `bg (${resIndex}).png`;
                const tileObj = Tile(tile.type, imgSrc, i, j);
                this.gameObject.addChild(tileObj);
                // 添加到global_data_manager
                GlobalDataManager.instance.setTileManager(i, j, tileObj.getComponent(TileManager));
            }
        }
    }


    /** 随机生成地图瓦片 */
    _tryGenerateOtherTile() {
        if (this._generateIndex >= this._randCount) {
            // 随机生成
            this._generateIndex = 0;
            // 刷新生成间隔
            // 可以尽量随机的个数少一点，这样就保留更多的纯色砖块，地面看出来不会太突兀
            this._randCount = getRandom(MIN_INTERVAL, MAX_INTERVAL);
            return true;
        }
        this._generateIndex++;
        return false;
    }
}