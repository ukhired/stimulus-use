import { Controller } from 'stimulus';
export interface ThrottleOptions {
    wait?: number;
    name?: string;
}
declare class ThrottleController extends Controller {
    static throttles: string[] | ThrottleOptions[];
}
export declare function throttle(func: Function, wait?: number): Function;
export declare const useThrottle: (controller: ThrottleController, options?: ThrottleOptions) => void;
export {};
//# sourceMappingURL=use-throttle.d.ts.map