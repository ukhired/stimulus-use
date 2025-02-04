import { Controller } from 'stimulus';
import { useTargetMutation } from './use-target-mutation';
export class TargetMutationComposableController extends Controller {
}
export class TargetMutationController extends TargetMutationComposableController {
    constructor(context) {
        super(context);
        requestAnimationFrame(() => {
            const [observe, unobserve] = useTargetMutation(this, this.options);
            Object.assign(this, { observe, unobserve });
        });
    }
}
//# sourceMappingURL=target-mutation-controller.js.map