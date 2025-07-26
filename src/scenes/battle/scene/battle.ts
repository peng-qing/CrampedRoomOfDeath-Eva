import { GameObject, Scene } from "@eva/eva.js";

import { Controller } from "../game_object/controller";
import { BottomText } from "../game_object/bottom_text";
import { SCENE_NAME, GAMEOBJ_TYPE } from "../../../enum";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../index";
import { BackgroudColor } from "../game_object/backgroud_color";
import { BattleManager } from "../../../component/battle_manager";

/**
 * 游戏主场景
 */
export const BattleScene = () => {
    // 1. 每次调用创建一个新的场景
    const scene = new Scene(SCENE_NAME.BATTLE, {
        size: {
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
        },
    });

    // 2. 加对象
    // 背景色
    scene.addChild(BackgroudColor());
    // 底部文字
    scene.addChild(BottomText());
    // 控制按钮
    scene.addChild(Controller());

    // 将地图挂载在子对象上方便适配
    const btlScene = new GameObject(GAMEOBJ_TYPE.BATTLE_SCENE);
    btlScene.addComponent(new BattleManager());
    scene.addChild(btlScene);

    return scene;
}