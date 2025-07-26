import { TileManager } from "@/component/tile_manager";
import { ITile } from "../levels";

// 全局数据管理器
export class GlobalDataManager {
    private static _instance: GlobalDataManager;

    public static get instance(): GlobalDataManager {
        if (!this._instance) {
            this._instance = new GlobalDataManager();
        }
        return this._instance;
    }

    /** 关卡索引 */
    private levelIndex: number = 1;
    /** 关卡数据 */
    private mapInfo: ITile[][] = [];
    /** 瓦片地图组件 */
    private tileManagers: TileManager[][] = [];
    /** 地图行大小 */
    private rowSize: number = 0;
    /** 地图列大小 */
    private colSize: number = 0;
    constructor() {
        this.levelIndex = 1;
        this.reset();
    }

    /** 重置 */
    reset() {
        this.mapInfo = [];
        this.tileManagers = [];
        this.rowSize = 0;
        this.colSize = 0;
    }

    /** 设置关卡索引 */
    setLevelIndex(value: number) {
        this.levelIndex = value;
    }

    /** 增加关卡索引 */
    incrLevelIndex(incrVal: number = 1) {
        this.levelIndex += incrVal;
    }

    /** 获取关卡索引 */
    getLevelIndex() {
        return this.levelIndex;
    }

    /** 设置地图数据 */
    setMapInfo(value: ITile[][]) {
        this.mapInfo = value;
        this.rowSize = value?.length || 0;
        this.colSize = value[0]?.length || 0;
    }

    /** 获取地图数据 */
    getMapInfo() {
        return this.mapInfo;
    }

    /** 获取地图行大小 */
    getRowSize() {
        return this.rowSize;
    }

    /** 获取地图列大小 */
    getColSize() {
        return this.colSize;
    }

    /**
     * 设置tile manager 信息
     * @param i 
     * @param j 
     * @param component 
     */
    setTileManager(i: number, j: number, component: TileManager) {
        if (!this.tileManagers[i]) {
            this.tileManagers[i] = [];
        }
        this.tileManagers[i][j] = component;
    }

    /**
     * 获取tile组件信息
     * @param i 
     * @param j 
     * @returns {TileManager|null}
     */
    getTileManager(i: number, j: number) {
        return this.tileManagers[i][j] || null;
    }

    /** 获取全部的tile组件 */
    getAllTileManager() {
        return this.tileManagers;
    }
}