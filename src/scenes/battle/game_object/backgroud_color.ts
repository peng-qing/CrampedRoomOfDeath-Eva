import { GameObject } from "@eva/eva.js";
import { Graphics } from "@eva/plugin-renderer-graphics";

import { GAMEOBJ_TYPE } from "../../../enum";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../index";

// 背景颜色
const BG_COLOR = 0x5e616d;

/**
 * 背景颜色
 */
export const BackgroudColor = () => {
    // 1. 每次调用创建一个新的对象
    const obj = new GameObject(GAMEOBJ_TYPE.BACKGROUND);

    // 创建图形 填满屏幕
    const graphics = obj.addComponent(new Graphics());
    graphics.graphics.beginFill(BG_COLOR);
    graphics.graphics.drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    graphics.graphics.endFill();

    return obj;
}