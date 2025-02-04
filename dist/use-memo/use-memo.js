const memoize = (controller, name, value) => {
    Object.defineProperty(controller, name, { value });
    return value;
};
export const useMemo = (controller) => {
    var _a;
    (_a = controller.constructor.memos) === null || _a === void 0 ? void 0 : _a.forEach((getter) => {
        memoize(controller, getter, controller[getter]);
    });
};
//# sourceMappingURL=use-memo.js.map