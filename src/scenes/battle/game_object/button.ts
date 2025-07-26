import { GameObject } from "@eva/eva.js";
import { Event } from "@eva/plugin-renderer-event";
import { Transition } from "@eva/plugin-transition";
import { Sprite } from "@eva/plugin-renderer-sprite";

import { EventManager } from "../../../managers/event_manager";
import { BUTTON, BUTTON_ACTION, EVENT_TYPE, GAMEOBJ_TYPE } from "../../../enum";

const CTRL_BTN_WIDTH = 70;  // 控制按钮宽度
const CTRL_BTN_HEIGHT = 60; // 控制按钮高度
const GAP_HEIGHT = 3;       // 按钮之间的间隔

/**
 * 获取按钮位置
 * @param btn 
 * @param index 
 * @returns 
 */
const getBtnPosition = (btn: BUTTON, index: number) => {
    const pos = {
        x: 0,
        y: 0,
    }
    switch (btn) {
        case BUTTON.CONTROLLER:
            const xAxis = Math.floor((index - 1) / 2);
            const yAxis = (index - 1) % 2;
            pos.x = (xAxis - 1) * CTRL_BTN_WIDTH;
            pos.y = yAxis * (CTRL_BTN_HEIGHT + GAP_HEIGHT);
            break;
        default:
            console.warn("[Button] invalid button action index");
            break;
    }

    return pos;
}


/**
 * 控制按钮
 */
export const ControlButton = (action: BUTTON_ACTION, index: number) => {
    const button = new GameObject(GAMEOBJ_TYPE.BUTTON, {
        // 大小
        size: {
            width: CTRL_BTN_WIDTH,
            height: CTRL_BTN_HEIGHT,
        },
        // 位置
        position: getBtnPosition(BUTTON.CONTROLLER, index),
        // 原点
        origin: {
            x: 0.5,
            y: 0.5,
        },
        // 锚点
        anchor: {
            x: 0.5,
            y: 0.5,
        }
    });

    // 添加资源
    button.addComponent(
        new Sprite({
            resource: 'ctrl_ctrl',
            spriteName: `ctrl (${index}).png`,
        }),
    );

    // 绑定动画
    const animation = button.addComponent(new Transition());
    // group 表示一个时间轴
    animation.group = {
        // 放大
        big: [
            {
                // 需要变化的 component 属性
                name: "scale.x",
                // 需要变化的 component 
                component: button.transform,
                // 对应的时间轴表
                values: [
                    {
                        // 变化对应的时间
                        time: 0,
                        // 当前时间对应的值
                        value: 0.9,
                        // 缓动函数
                        tween: "ease-out",
                    },
                    {
                        time: 100,
                        value: 1,
                        tween: "ease-in",
                    }
                ]
            },
            {
                name: "scale.y",
                component: button.transform,
                values: [
                    {
                        time: 0,
                        value: 0.9,
                        tween: "ease-out",
                    },
                    {
                        time: 100,
                        value: 1,
                        tween: "ease-in",
                    }
                ]
            }
        ],
        small: [
            {
                name: "scale.x",
                component: button.transform,
                values: [
                    {
                        time: 0,
                        value: 1,
                        tween: "ease-out",
                    },
                    {
                        time: 100,
                        value: 0.9,
                        tween: "ease-in",
                    }
                ]
            },
            {
                name: "scale.y",
                component: button.transform,
                values: [
                    {
                        time: 0,
                        value: 1,
                        tween: "ease-out",
                    },
                    {
                        time: 100,
                        value: 0.9,
                        tween: "ease-in",
                    }
                ]
            }
        ],
    };

    // 绑定事件
    const btnEventManager = button.addComponent(new Event());

    // 按下
    btnEventManager.on("touchstart", () => {
        animation.play("small", 1);
    });
    const touchHandler = () => {
        animation.play("big", 1);
        EventManager.instance.emit(EVENT_TYPE.PLAYER_CONTROL, action);
    }
    // 抬起
    btnEventManager.on("touchend", touchHandler);
    // 移出
    btnEventManager.on("touchendoutside", touchHandler);

    return button;
}