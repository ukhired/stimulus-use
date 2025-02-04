import { Controller } from 'stimulus';
import { useIdle } from './use-idle';
export class IdleComposableController extends Controller {
    constructor() {
        super(...arguments);
        this.isIdle = false;
    }
}
export class IdleController extends IdleComposableController {
    constructor(context) {
        super(context);
        requestAnimationFrame(() => {
            const [observe, unobserve] = useIdle(this, this.options);
            Object.assign(this, { observe, unobserve });
        });
    }
}
//# sourceMappingURL=idle-controller.js.map