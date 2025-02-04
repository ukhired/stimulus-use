import { Controller, Context } from 'stimulus';
export declare class LazyLoadComposableController extends Controller {
    isLoading: boolean;
    isLoaded: boolean;
    loading?: (src: string) => void;
    loaded?: (src: string) => void;
}
export declare class LazyLoadController extends LazyLoadComposableController {
    options: IntersectionObserverInit;
    constructor(context: Context);
    observe: () => void;
    unobserve: () => void;
}
//# sourceMappingURL=lazy-load-controller.d.ts.map