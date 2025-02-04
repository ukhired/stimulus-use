import { Controller } from 'stimulus';
import { useWindowResize } from './use-window-resize';
export class WindowResizeComposableController extends Controller {
}
export class WindowResizeController extends WindowResizeComposableController {
    constructor(context) {
        super(context);
        requestAnimationFrame(() => {
            const [observe, unobserve] = useWindowResize(this);
            Object.assign(this, { observe, unobserve });
        });
    }
}
//# sourceMappingURL=window-resize-controller.js.map