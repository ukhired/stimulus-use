import { Controller } from 'stimulus';
import { useClickOutside } from './use-click-outside';
export class ClickOutsideComposableController extends Controller {
}
export class ClickOutsideController extends ClickOutsideComposableController {
    constructor(context) {
        super(context);
        requestAnimationFrame(() => {
            const [observe, unobserve] = useClickOutside(this, this.options);
            Object.assign(this, { observe, unobserve });
        });
    }
}
//# sourceMappingURL=click-outside-controller.js.map