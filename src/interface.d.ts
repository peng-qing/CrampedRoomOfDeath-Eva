declare const EVA: any;

// 扩展Window 避免TS报错
interface Window {
    EVA: any;
    game: any;
}

interface HTMLElement {
    value: any;
}
