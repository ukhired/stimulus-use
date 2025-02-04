import { Controller } from 'stimulus';
class ThrottleController extends Controller {
}
ThrottleController.throttles = [];
const defaultWait = 200;
export function throttle(func, wait = defaultWait) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            inThrottle = true;
            func.apply(context, args);
            setTimeout(() => (inThrottle = false), wait);
        }
    };
}
export const useThrottle = (controller, options = {}) => {
    var _a;
    const constructor = controller.constructor;
    (_a = constructor.throttles) === null || _a === void 0 ? void 0 : _a.forEach((func) => {
        if (typeof func === "string") {
            controller[func] = throttle(controller[func], options === null || options === void 0 ? void 0 : options.wait);
        }
        if (typeof func === "object") {
            const { name, wait } = func;
            if (!name)
                return;
            controller[name] = throttle(controller[name], wait || (options === null || options === void 0 ? void 0 : options.wait));
        }
    });
};
//# sourceMappingURL=use-throttle.js.map