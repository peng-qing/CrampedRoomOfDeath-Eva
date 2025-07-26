import { EVENT_TYPE } from "../enum/index";

// 事件接口
interface IEvent {
    // 事件唯一ID
    id: number;
    // 事件类型
    type: EVENT_TYPE;
    // 回调
    callback: Function;
    // 回调参数
    ctx: any;
}

// 事件管理器
export class EventManager {
    // 事件ID
    private eventId: number = 1;
    // 事件列表
    private eventList: Map<EVENT_TYPE, IEvent[]> = new Map();

    constructor() {
        this.eventList = new Map();
    }

    static _instance: EventManager;

    // 使用单例模式
    static get instance() {
        if (!this._instance) {
            this._instance = new EventManager();
        }
        return this._instance;
    }

    /**
     * 注册事件
     * @param eventType 事件类型
     * @param callback 回调
     * @param ctx 回调参数
     * @returns 事件ID
     */
    public register(eventType: EVENT_TYPE, callback: Function, ctx?: any) {
        if (!this.eventList.has(eventType)) {
            this.eventList.set(eventType, []);
        }
        const eventId = ++this.eventId;
        this.eventList.get(eventType)?.push({
            id: eventId,
            type: eventType,
            callback: callback,
            ctx: ctx,
        });
        return eventId;
    }

    /**
     * 取消事件注册
     * @param eventType 
     * @param id 
     * @returns 
     */
    public unregister(eventType: EVENT_TYPE, id: number) {
        if (!this.eventList.has(eventType)) {
            return;
        }
        const index = this.eventList.get(eventType)?.findIndex((event) => event.id === id);
        if (index && index !== -1) {
            this.eventList.get(eventType)?.splice(index, 1);
        }
    }

    /**
     * 触发事件
     * @param eventType 事件类型
     * @param params 事件参数
     */
    public emit(eventType: EVENT_TYPE, ...params: any[]) {
        if (!this.eventList.has(eventType)) {
            return;
        }
        const allEvents = this.eventList.get(eventType);
        if (allEvents && Array.isArray(allEvents)) {
            for (const event of allEvents) {
                if (event.ctx) {
                    event.callback.apply(event.ctx, params);
                }
                else {
                    event.callback(params);
                }
            }
        }
    }

    public clearAll() {
        this.eventList.clear();
    }
}
