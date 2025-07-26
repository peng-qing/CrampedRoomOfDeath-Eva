/**
 * 判断是否是移动端
 */
export const isMobile = function () {
    const userAgentInfo = navigator.userAgent;
    const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
    return Agents.some(agent => userAgentInfo.indexOf(agent) > -1);
}

/**
 * 生成随机数 左闭右闭
 */
export const getRandom = function (min: number, max: number) {
    if (min >= max) {
        [min, max] = [max, min];
    }

    return Math.floor(Math.random() * (max - min + 1) + min);
}