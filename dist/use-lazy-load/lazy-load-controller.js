import { Controller } from 'stimulus';
import { useLazyLoad } from './useLazyLoad';
export class LazyLoadComposableController extends Controller {
    constructor() {
        super(...arguments);
        this.isLoading = false;
        this.isLoaded = false;
    }
}
export class LazyLoadController extends LazyLoadComposableController {
    constructor(context) {
        super(context);
        this.options = { rootMargin: '10%' };
        requestAnimationFrame(() => {
            const [observe, unobserve] = useLazyLoad(this, this.options);
            Object.assign(this, { observe, unobserve });
        });
    }
}
//# sourceMappingURL=lazy-load-controller.js.map