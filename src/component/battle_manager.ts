import { Component } from "@eva/eva.js";

import { ILevel, Levels } from "../levels";
import { EVENT_TYPE, TILE_WIDTH } from "../enum";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../index";
import { EventManager } from "../managers/event_manager";
import { Player } from "../scenes/battle/game_object/player";
import { TileMap } from "../scenes/battle/game_object/tile_map";
import { GlobalDataManager } from "../managers/global_data_manager";
import { WoodenSkeleton } from "../scenes/battle/game_object/wooden_skeleton";

export class BattleManager extends Component {
    static componentName = "BattleManager"; // 设置组件名称

    /** 当前关卡数据 */
    private level: ILevel | null = null;

    /** 构造函数 */
    constructor() { super(); }

    /** 初始化 */
    init() {
        EventManager.instance.register(EVENT_TYPE.NEXT_LEVEL, this.enterNextLevel, this);
    }

    start(): void {
        this.initLevel();
    }

    /** 进入下一关 */
    enterNextLevel() {
        // 更改关卡索引
        GlobalDataManager.instance.incrLevelIndex();
        // 重新初始化渲染关卡信息
        this.initLevel();
    }

    /** 初始化关卡 */
    initLevel() {
        // 获取当前关卡索引
        const levelIndex = GlobalDataManager.instance.getLevelIndex();
        // 获取当前关卡配置数据
        const level = Levels[`Level${levelIndex}`];
        if (!level) {
            throw new Error(`关卡配置 ${levelIndex} 不存在`);
        }

        // 清除上一关数据
        this.clearPrevLevel();

        // 场景管理器管理的数据
        this.level = level;

        // 更新全局数据
        GlobalDataManager.instance.setMapInfo(level.mapInfo);

        // 生成瓦片地图
        this.generateTileMap();
        // 生成玩家对象
        this.generatePlayer();
        // 生成敌人
        this.generateEnemyList();
    }

    /** 清除上一关数据 */
    clearPrevLevel() {
        Array.from(this.gameObject.transform.children).forEach(({ gameObject }) => {
            // 遍历销毁上一关对象
            gameObject.destroy();
        });
        // 重置数据
        GlobalDataManager.instance.reset();
    }

    /** 生成瓦片地图 */
    generateTileMap() {
        // 拿到游戏对象 生成挂载地图对象
        this.gameObject.addChild(TileMap());
        // 适配地图位置
        this.adaptMapPos();
    }

    /** 适配地图位置 */
    adaptMapPos() {
        // 由于组件管理的地图数据无法之间被获取 所以缓存在全局数据管理器中
        const rowSize = GlobalDataManager.instance.getRowSize();
        const colSize = GlobalDataManager.instance.getColSize();

        // 计算边距 设置地图居中
        const distanceX = Math.floor((SCREEN_WIDTH - TILE_WIDTH * rowSize) / 2);
        // * 0.9 是因为底部按钮会显得上方比较空 先这么处理
        // 更合适的做法应该是对整个屏幕区域划分 然后计算地图的位置
        // 或者之间写死偏移值
        const distanceY = Math.floor((SCREEN_HEIGHT * 0.85 - TILE_WIDTH * colSize) / 2);

        this.gameObject.transform.position = {
            x: distanceX,
            y: distanceY,
        };
    }

    /** 生成玩家对象 */
    generatePlayer() {
        // 拿到地图对象 挂载玩家对象
        const player = this.level?.player;
        if (!player) {
            throw new Error("Invalid level data player not exist");
        }
        this.gameObject.addChild(Player(player));
    }

    /** 生成敌人列表 */
    generateEnemyList() {
        // 拿到地图的敌人列表配置
        const enemyList = this.level?.enemyList;
        if (!enemyList || !Array.isArray(enemyList) || enemyList.length <= 0) {
            throw new Error("Invalid level data enemy list not exist");
        }
        for (const enemy of enemyList) {
            this.gameObject.addChild(WoodenSkeleton(enemy));
        }
    }
}