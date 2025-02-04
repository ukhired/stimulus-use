import { method } from '../support/index';
export const useWindowResize = (controller) => {
    const callback = (event) => {
        const { innerWidth, innerHeight } = window;
        const payload = {
            height: innerHeight || Infinity,
            width: innerWidth || Infinity,
            event
        };
        method(controller, 'windowResize').call(controller, payload);
    };
    const controllerDisconnect = controller.disconnect.bind(controller);
    const observe = () => {
        window.addEventListener('resize', callback);
        callback();
    };
    const unobserve = () => {
        window.removeEventListener('resize', callback);
    };
    Object.assign(controller, {
        disconnect() {
            unobserve();
            controllerDisconnect();
        },
    });
    observe();
    return [observe, unobserve];
};
//# sourceMappingURL=use-window-resize.js.map