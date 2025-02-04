import { method } from '../support/index';
export const useLazyLoad = (controller, options) => {
    const callback = (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !controller.isLoaded) {
            handleAppear(entry);
        }
    };
    const handleAppear = (entry) => {
        const src = controller.data.get('src');
        if (!src)
            return;
        const imageElement = controller.element;
        controller.isLoading = true;
        method(controller, 'loading').call(controller, src);
        imageElement.onload = () => {
            handleLoaded(src);
        };
        imageElement.src = src;
    };
    const handleLoaded = (src) => {
        controller.isLoading = false;
        controller.isLoaded = true;
        method(controller, 'loaded').call(controller, src);
    };
    // keep a copy of the current disconnect() function of the controller to not override it
    const controllerDisconnect = controller.disconnect.bind(controller);
    const observer = new IntersectionObserver(callback, options);
    const observe = () => {
        observer.observe(controller.element);
    };
    const unobserve = () => {
        observer.unobserve(controller.element);
    };
    Object.assign(controller, {
        isVisible: false,
        disconnect() {
            unobserve();
            controllerDisconnect();
        },
    });
    observe();
    return [observe, unobserve];
};
//# sourceMappingURL=useLazyLoad.js.map