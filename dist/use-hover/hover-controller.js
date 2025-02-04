import { Controller } from 'stimulus';
import { useHover } from './use-hover';
export class HoverComposableController extends Controller {
}
export class HoverController extends HoverComposableController {
    constructor(context) {
        super(context);
        requestAnimationFrame(() => {
            const [observe, unobserve] = useHover(this, this.options);
            Object.assign(this, { observe, unobserve });
        });
    }
}
//# sourceMappingURL=hover-controller.js.map