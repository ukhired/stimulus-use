import { Context, Controller } from 'stimulus';
import { HoverOptions } from './use-hover';
export declare class HoverComposableController extends Controller {
    mouseEnter?: () => void;
    mouseLeave?: () => void;
}
export declare class HoverController extends HoverComposableController {
    options?: HoverOptions;
    constructor(context: Context);
    observe: () => void;
    unobserve: () => void;
}
//# sourceMappingURL=hover-controller.d.ts.map