import { Game, resource } from "@eva/eva.js";
import { StatsSystem } from "@eva/plugin-stats";
import { ImgSystem } from "@eva/plugin-renderer-img";
import { RendererSystem } from "@eva/plugin-renderer";
import { TextSystem } from "@eva/plugin-renderer-text";
import { EventSystem } from "@eva/plugin-renderer-event";
import { SpriteSystem } from "@eva/plugin-renderer-sprite";
import { RenderSystem } from "@eva/plugin-renderer-render";
import { GraphicsSystem } from "@eva/plugin-renderer-graphics";
import { SpriteAnimationSystem } from "@eva/plugin-renderer-sprite-animation";

import allResource from "./resource";
import { isMobile } from "./utils/utils";
import { BattleScene } from "./scenes/battle/scene/battle";

export const SCREEN_WIDTH = window.innerWidth;
export const SCREEN_HEIGHT = window.innerHeight;

const isDev = process.env.NODE_ENV === "development";
const gameCanvas = document.querySelector("#gameCanvas") as HTMLCanvasElement;

// 加载所有资源进来
resource.addResource(allResource);

// 游戏实例
export const game = new Game(
    {
        // 系统模块
        systems: [
            // 渲染器系统
            new RendererSystem(
                {
                    // 挂载canvas
                    canvas: gameCanvas,
                    // 设置宽高
                    width: SCREEN_WIDTH,
                    height: SCREEN_HEIGHT,
                    // 禁止页面滚动
                    enableScroll: false,
                    // 抗锯齿
                    antialias: true,
                    // 渲染类型 0=自动判断 1=WebGL 2=Canvas
                    renderType: 0,
                    // 分辨率
                    resolution: isMobile() ? 1 : window.devicePixelRatio,
                }
            ),
            // 图形系统
            new GraphicsSystem(),
            // 文本系统
            new TextSystem(),
            // 精灵图系统
            new SpriteSystem(),
            // 事件交互系统
            new EventSystem(),
            // 渲染系统
            new RenderSystem(),
            // 帧动画
            new SpriteAnimationSystem(),
            // 图片系统
            new ImgSystem(),
        ]
    }
);

// 开发环境
if (isDev) {
    // 开发环境添加状态系统
    game.addSystem(new StatsSystem(
        {
            show: true,
            style: {
                x: 80,
                y: 0,
                width: 20,
                height: 12,
            }
        }
    ));
    // 挂载到window上
    window.game = game;
}

game.loadScene({
    scene: BattleScene(),
});
