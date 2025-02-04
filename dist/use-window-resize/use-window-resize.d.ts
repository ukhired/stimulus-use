import { WindowResizeComposableController } from './window-resize-controller';
export interface WindowResizePayload {
    height: number;
    width: number;
    event?: Event;
}
export declare const useWindowResize: (controller: WindowResizeComposableController) => readonly [() => void, () => void];
//# sourceMappingURL=use-window-resize.d.ts.map