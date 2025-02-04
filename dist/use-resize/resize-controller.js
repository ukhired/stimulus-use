import { Controller } from 'stimulus';
import { useResize } from './use-resize';
export class ResizeComposableController extends Controller {
}
export class ResizeController extends ResizeComposableController {
    constructor(context) {
        super(context);
        requestAnimationFrame(() => {
            const [observe, unobserve] = useResize(this, this.options);
            Object.assign(this, { observe, unobserve });
        });
    }
}
//# sourceMappingURL=resize-controller.js.map