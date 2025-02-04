import { Controller, Context } from 'stimulus';
import { IdleOptions } from './use-idle';
export declare class IdleComposableController extends Controller {
    isIdle: boolean;
    away?: () => void;
    back?: () => void;
}
export declare class IdleController extends IdleComposableController {
    options?: IdleOptions;
    constructor(context: Context);
    observe: () => void;
    unobserve: () => void;
}
//# sourceMappingURL=idle-controller.d.ts.map