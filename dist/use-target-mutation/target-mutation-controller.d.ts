import { Context, Controller } from 'stimulus';
import { TargetMutationOptions } from './use-target-mutation';
export declare class TargetMutationComposableController extends Controller {
    [index: string]: any;
}
export declare class TargetMutationController extends TargetMutationComposableController {
    options: TargetMutationOptions;
    constructor(context: Context);
    observe: () => void;
    unobserve: () => void;
}
//# sourceMappingURL=target-mutation-controller.d.ts.map