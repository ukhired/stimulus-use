import { Controller } from 'stimulus';
export interface DebounceOptions {
    wait?: number;
    name?: string;
}
declare class DebounceController extends Controller {
    static debounces: string[] | DebounceOptions[];
}
export declare const useDebounce: (controller: DebounceController, options: DebounceOptions) => void;
export {};
//# sourceMappingURL=use-debounce.d.ts.map