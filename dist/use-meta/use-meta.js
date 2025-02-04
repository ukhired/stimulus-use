const defineMetaGetter = (controller, metaName, suffix) => {
    const getterName = suffix ? `${camelize(metaName)}Meta` : camelize(metaName);
    Object.defineProperty(controller, getterName, {
        get() {
            return typeCast(metaValue(metaName));
        },
    });
};
function metaValue(name) {
    const element = document.head.querySelector(`meta[name="${name}"]`);
    return element && element.getAttribute('content');
}
function typeCast(value) {
    try {
        return JSON.parse(value);
    }
    catch (o_O) {
        return value;
    }
}
function camelize(value) {
    return value.replace(/(?:[_-])([a-z0-9])/g, (_, char) => char.toUpperCase());
}
export const useMeta = (controller, options = { suffix: true }) => {
    const metaNames = controller.constructor.metaNames;
    const suffix = options.suffix;
    // defines the individual meta getters
    metaNames === null || metaNames === void 0 ? void 0 : metaNames.forEach((metaName) => {
        defineMetaGetter(controller, metaName, suffix);
    });
    // define the metas getter to retreive an object with all metas
    Object.defineProperty(controller, "metas", {
        get() {
            const result = {};
            metaNames === null || metaNames === void 0 ? void 0 : metaNames.forEach((metaName) => {
                const value = typeCast(metaValue(metaName));
                if (value !== undefined && value !== null) {
                    result[camelize(metaName)] = value;
                }
            });
            return result;
        },
    });
};
//# sourceMappingURL=use-meta.js.map