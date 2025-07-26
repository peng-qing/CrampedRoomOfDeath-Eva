import { SpriteAnimation } from "@eva/plugin-renderer-sprite-animation";

import { IState } from "./state";

/** 状态机 帧动画行为实现 */
export class FrameAnimationState implements IState {
    /** 帧动画组件 */
    frameAnimation: SpriteAnimation;
    /** 资源路径 */
    resource: string = "";
    /** 播放次数 */
    playCount: number | undefined = undefined;

    /**
     * 构造函数
     * @param frameAnimation_ 帧动画组件
     * @param resource_ 资源路径
     * @param playerTimes_ 播放次数
     */
    constructor(frameAnimation_: SpriteAnimation, resource_: string, playerTimes_: number | undefined = undefined) {
        if (!frameAnimation_ || !resource_) {
            throw new Error("[FrameAnimationState] 行为参数需要有效的动画帧动画组件和资源路径");
        }
        this.frameAnimation = frameAnimation_;
        this.resource = resource_;
        this.playCount = playerTimes_;
    }

    /**
     * 执行行为
     * @override
     */
    run(): void {
        // 给动画组件资源路径
        this.frameAnimation.resource = this.resource;
        // 如果直接播放 会存在闪烁的bug
        // 因为evajs 采用的是依赖收集的方式 对应动画资源的修改加载并不是立即执行
        // 同时播放完成会跳转回第一帧... 所以需要调整其执行时机
        // 可以使用浏览器的API requestAnimationFrame 告诉浏览器希望执行一个动画
        // 其会在浏览器下一次重绘之前调用提供的回调函数 
        requestAnimationFrame(() => {
            // 播放 其实可以是 undefined 传入, 但是不能为0, 0不会无限播放
            this.frameAnimation.play(this.playCount);
        })
    }
}