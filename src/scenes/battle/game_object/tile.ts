import { GameObject } from "@eva/eva.js";
import { Render } from "@eva/plugin-renderer-render";
import { Sprite } from "@eva/plugin-renderer-sprite";

import { TileManager } from "../../../component/tile_manager";
import { GAMEOBJ_TYPE, TILE_HEIGHT, TILE_WIDTH, TILE_TYPE } from "../../../enum";

/**
 * 瓦片
 */
export const Tile = (type: TILE_TYPE, src: string, i: number, j: number) => {
    // 创建游戏对象
    const tile = new GameObject(GAMEOBJ_TYPE.TILE, {
        size: {
            width: TILE_WIDTH,
            height: TILE_HEIGHT,
        },
        position: {
            x: i * TILE_WIDTH,
            y: j * TILE_HEIGHT,
        },
    });

    // 添加渲染插件
    tile.addComponent(
        new Render({
            zIndex: 1,
        })
    );

    // 添加精灵图插件
    tile.addComponent(
        new Sprite({
            resource: "tile_tile",
            spriteName: src,
        })
    );

    // 自定义组件管理器
    tile.addComponent(
        new TileManager(type)
    )

    return tile;
}