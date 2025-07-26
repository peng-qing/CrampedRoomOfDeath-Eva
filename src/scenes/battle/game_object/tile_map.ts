import { GameObject } from "@eva/eva.js";
import { Render } from "@eva/plugin-renderer-render";

import { GAMEOBJ_TYPE } from "../../../enum";
import { TileMapManager } from "../../../component/tile_map_manager";

/**
 * 瓦片地图
 */
export const TileMap = () => {
    const tileMap = new GameObject(GAMEOBJ_TYPE.TILEMAP);

    tileMap.addComponent(
        new Render({
            zIndex: 0,
            sortableChildren: true,
        }),
    );

    tileMap.addComponent(
        new TileMapManager(),
    );

    return tileMap;
}