import { GameObject } from "@eva/eva.js";
import { Text } from "@eva/plugin-renderer-text";

import { GAMEOBJ_TYPE } from "../../../enum";

// 底部文字
export const BottomText = () => {
    // 创建游戏对象
    const bottomText = new GameObject(GAMEOBJ_TYPE.BOTTOM_TEXT, {
        // 位移
        position: {
            x: 0,
            y: -20,
        },
        // 原点 物体内部的一个点 以这个点相对于锚点进行偏移
        // 这里取中心
        origin: {
            x: 0.5,
            y: 1,
        },
        // 锚点 物体在父物体上的一个点 以这个点进行偏移
        anchor: {
            x: 0.5,
            y: 1,
        },
    });

    // 添加文字组件
    bottomText.addComponent(
        new Text({
            // 文本
            text: 'Cramped Room Of Death',
            // 样式
            style: {
                // 字体
                fontFamily: 'Arial',
                // 字体大小
                fontSize: 13,
                // 字体加粗
                fontWeight: 'bold',
                // 文本居中
                align: 'center',
                // 填充颜色
                fill: '#c21f30',
            }
        })
    );

    return bottomText;
}
