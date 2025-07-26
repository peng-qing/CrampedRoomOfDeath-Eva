import { GameObject } from "@eva/eva.js";

import { PlayerManager } from "../../../component/player_manager";
import { CHARACTER_HEIGHT, CHARACTER_WIDTH, GAMEOBJ_TYPE } from "../../../enum";

/**
 * 玩家对象 
 * Character 角色对比静态地图 需要通过动画帧来实现各种动作，比如待机动画，移动动作
 * 这里可以使用 SpriteAnimation 来处理 实际使用往往需要使用状态机控制管理
 * @returns 
 */
export const Player = () => {
    const player = new GameObject(GAMEOBJ_TYPE.CHARACTER, {
        size: {
            width: CHARACTER_WIDTH,
            height: CHARACTER_HEIGHT,
        }
    });

    player.addComponent(new PlayerManager());

    return player;
}