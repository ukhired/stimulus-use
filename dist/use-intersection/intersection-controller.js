import { Controller } from 'stimulus';
import { useIntersection } from './use-intersection';
export class IntersectionComposableController extends Controller {
    constructor() {
        super(...arguments);
        this.isVisible = false;
    }
}
export class IntersectionController extends IntersectionComposableController {
    constructor(context) {
        super(context);
        requestAnimationFrame(() => {
            const [observe, unobserve] = useIntersection(this, this.options);
            Object.assign(this, { observe, unobserve });
        });
    }
}
//# sourceMappingURL=intersection-controller.js.map