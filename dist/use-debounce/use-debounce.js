import { Controller } from 'stimulus';
class DebounceController extends Controller {
}
DebounceController.debounces = [];
const defaultWait = 200;
const debounce = (fn, wait = defaultWait) => {
    let timeoutId = null;
    return function () {
        const args = arguments;
        const context = this;
        const callback = () => fn.apply(context, args);
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(callback, wait);
    };
};
export const useDebounce = (controller, options) => {
    var _a;
    const constructor = controller.constructor;
    (_a = constructor.debounces) === null || _a === void 0 ? void 0 : _a.forEach((func) => {
        if (typeof func === "string") {
            controller[func] = debounce(controller[func], options === null || options === void 0 ? void 0 : options.wait);
        }
        if (typeof func === "object") {
            const { name, wait } = func;
            if (!name)
                return;
            controller[name] = debounce(controller[name], wait || (options === null || options === void 0 ? void 0 : options.wait));
        }
    });
};
//# sourceMappingURL=use-debounce.js.map