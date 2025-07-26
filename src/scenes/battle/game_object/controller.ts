import { GameObject } from "@eva/eva.js";

import { ControlButton } from "./button";
import { BUTTON_ACTION, GAMEOBJ_TYPE } from "../../../enum";

export const Controller = () => {
    const controller = new GameObject(GAMEOBJ_TYPE.CONTROL, {
        position: {
            x: 0,
            y: -140,
        },
        origin: {
            x: 0.5,
            y: 1,
        },
        anchor: {
            x: 0.5,
            y: 1,
        },
    });

    // 添加按钮
    controller.addChild(ControlButton(BUTTON_ACTION.TURN_LEFT, 1));
    controller.addChild(ControlButton(BUTTON_ACTION.LEFT, 2));
    controller.addChild(ControlButton(BUTTON_ACTION.TOP, 3));
    controller.addChild(ControlButton(BUTTON_ACTION.BOTTOM, 4));
    controller.addChild(ControlButton(BUTTON_ACTION.TURN_RIGHT, 5));
    controller.addChild(ControlButton(BUTTON_ACTION.RIGHT, 6));

    return controller;
}