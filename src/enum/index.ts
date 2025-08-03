// 场景名
export enum SCENE_NAME {
    // 主场景
    BATTLE = 'BATTLE',
}

// 游戏对象类型
export enum GAMEOBJ_TYPE {
    // 背景
    BACKGROUND = 'BACKGROUND',
    // 底部文字
    BOTTOM_TEXT = 'BOTTOM_TEXT',
    // 控制组件
    CONTROL = 'CONTROL',
    // 按钮
    BUTTON = 'BUTTON',
    // 瓦片地图
    TILEMAP = 'TILEMAP',
    // 瓦片
    TILE = 'TILE',
    // 角色
    CHARACTER = 'CHARACTER',
    // 木骷髅
    WOODEN_SKELETON = "WOODEN_SKELETON",
    // 战斗场景
    BATTLE_SCENE = 'BATTLE_SCENE',
}

// 实体类型枚举
export enum ENTITY_TYPE_ENUM {
    PLAYER = "PLAYER",
    WOODEN_SKELETON = "WOODEN_SKELETON",
}

// 按钮类型
export enum BUTTON {
    // 控制
    CONTROLLER = "CONTROLLER"
}

// 按钮行为定义
export enum BUTTON_ACTION {
    // 上
    TOP = "TOP",
    // 左
    LEFT = "LEFT",
    // 右
    RIGHT = "RIGHT",
    // 下
    BOTTOM = "BOTTOM",
    // 左转
    TURN_LEFT = "TURN_LEFT",
    // 右转
    TURN_RIGHT = "TURN_RIGHT",
}

// 事件类型
export enum EVENT_TYPE {
    // 玩家控制
    PLAYER_CONTROL = "PLAYER_CONTROL",
    // 进入下一关
    NEXT_LEVEL = "NEXT_LEVEL",
    // 玩家移动结束
    PLAYER_MOVE_END = "PLAYER_MOVE_END",
}

export const CHARACTER_WIDTH = 128;
export const CHARACTER_HEIGHT = 128;

// 屏幕宽高
export const TILE_WIDTH = 32;
export const TILE_HEIGHT = 32;
// 地图瓦片类型
export enum TILE_TYPE {
    // 空
    EMPTY = "EMPTY",
    // 横砖
    WALL_ROW = "WALL_ROW",
    // 竖砖
    WALL_COLUMN = "WALL_COLUMN",
    // 左上
    WALL_LEFT_TOP = "WALL_LEFT_TOP",
    // 右上
    WALL_RIGHT_TOP = "WALL_RIGHT_TOP",
    // 左下
    WALL_LEFT_BOTTOM = "WALL_LEFT_BOTTOM",
    // 右下
    WALL_RIGHT_BOTTOM = "WALL_RIGHT_BOTTOM",
    // 悬崖左
    CLIFF_LEFT = "CLIFF_LEFT",
    // 悬崖中
    CLIFF_CENTER = "CLIFF_CENTER",
    // 悬崖右
    CLIFF_RIGHT = "CLIFF_RIGHT",
    // 地板
    FLOOR = "FLOOR",
}

// 角色朝向
export enum DIRECTION {
    LEFT = 1,
    RIGHT = 2,
    TOP = 3,
    BOTTOM = 4,
}