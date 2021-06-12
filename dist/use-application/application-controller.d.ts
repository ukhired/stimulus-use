import { Controller, Context } from 'stimulus';
import { DispatchOptions } from "../use-dispatch";
export declare class ApplicationController extends Controller {
    options?: DispatchOptions;
    readonly isPreview: boolean;
    readonly csrfToken: string;
    constructor(context: Context);
    metaValue: (name: string) => string;
    dispatch: (eventName: String, detail: any) => void;
}
//# sourceMappingURL=application-controller.d.ts.map