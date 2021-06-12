import { useDispatch } from '../use-dispatch/index';
export const useApplication = (controller, options = {}) => {
    // getter to detect Turbolinks preview
    Object.defineProperty(controller, 'isPreview', {
        get() {
            return document.documentElement.hasAttribute('data-turbolinks-preview') || document.documentElement.hasAttribute('data-turbo-preview');
        },
    });
    // getter to get the csrf token
    Object.defineProperty(controller, 'csrfToken', {
        get() {
            return this.metaValue('csrf-token');
        },
    });
    useDispatch(controller, options);
    Object.assign(controller, {
        metaValue(name) {
            const element = document.head.querySelector(`meta[name="${name}"]`);
            return element && element.getAttribute('content');
        },
    });
};
//# sourceMappingURL=use-application.js.map