import { Context, Controller } from 'stimulus';
import { ClickOutsideOptions } from './use-click-outside';
export declare class ClickOutsideComposableController extends Controller {
    clickOutside?: (event: Event) => void;
}
export declare class ClickOutsideController extends ClickOutsideComposableController {
    options?: ClickOutsideOptions;
    constructor(context: Context);
    observe: () => void;
    unobserve: () => void;
}
//# sourceMappingURL=click-outside-controller.d.ts.map