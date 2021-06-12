import { Controller } from 'stimulus';
import { useApplication } from './use-application';
export class ApplicationController extends Controller {
    constructor(context) {
        super(context);
        this.isPreview = false;
        this.csrfToken = '';
        useApplication(this, this.options);
    }
}
//# sourceMappingURL=application-controller.js.map