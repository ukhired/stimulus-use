import { Controller } from 'stimulus';
import { useMutation } from './use-mutation';
export class MutationComposableController extends Controller {
}
export class MutationController extends MutationComposableController {
    constructor(context) {
        super(context);
        requestAnimationFrame(() => {
            const [observe, unobserve] = useMutation(this, this.options);
            Object.assign(this, { observe, unobserve });
        });
    }
}
//# sourceMappingURL=mutation-controller.js.map