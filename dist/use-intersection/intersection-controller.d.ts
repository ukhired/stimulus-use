import { Controller, Context } from 'stimulus';
import { IntersectionOptions } from './use-intersection';
export declare class IntersectionComposableController extends Controller {
    isVisible: boolean;
    appear?: (entry: IntersectionObserverEntry) => void;
    disappear?: (entry: IntersectionObserverEntry) => void;
}
export declare class IntersectionController extends IntersectionComposableController {
    options?: IntersectionOptions;
    constructor(context: Context);
    observe: () => void;
    unobserve: () => void;
}
//# sourceMappingURL=intersection-controller.d.ts.map