import { Controller } from 'stimulus';
import { useVisibility } from './use-visibility';
export class VisibilityComposableController extends Controller {
    constructor() {
        super(...arguments);
        this.isVisible = false;
    }
}
export class VisibilityController extends VisibilityComposableController {
    constructor(context) {
        super(context);
        requestAnimationFrame(() => {
            const [observe, unobserve] = useVisibility(this, this.options);
            Object.assign(this, { observe, unobserve });
        });
    }
}
//# sourceMappingURL=visibility-controller.js.map