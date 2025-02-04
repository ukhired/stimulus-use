import { StimulusUse } from '../stimulus-use';
import { method } from '../support/index';
export class UseTargetMutation extends StimulusUse {
    constructor(controller, options = {}) {
        super(controller, options);
        this.observe = () => {
            this.observer.observe(this.targetElement, {
                subtree: true,
                characterData: true,
                childList: true,
                attributes: true,
                attributeOldValue: true,
                attributeFilter: [this.targetSelector, this.scopedTargetSelector]
            });
        };
        this.unobserve = () => {
            this.observer.disconnect();
        };
        this.mutation = (entries) => {
            for (const mutation of entries) {
                switch (mutation.type) {
                    case 'attributes':
                        let newValue = mutation.target.getAttribute(mutation.attributeName);
                        let oldValue = mutation.oldValue;
                        // If this was an attribute change, and the attribute change resulted in a target changing
                        if (mutation.attributeName === this.targetSelector || mutation.attributeName === this.scopedTargetSelector) {
                            // Filter out any targets that don't belong to this controller
                            let oldTargets = this.targetsUsedByThisController(oldValue);
                            let newTargets = this.targetsUsedByThisController(newValue);
                            let removedTargets = oldTargets.filter(target => !newTargets.includes(target)); // Get only the oldTargets that dont occur in newTargets, thus, removed
                            let addedTargets = newTargets.filter(target => !oldTargets.includes(target)); // Get only the newTargets that dont occur in oldTargets - thus, added
                            // Fire updates for each changed target on the controller
                            removedTargets.forEach(target => this.targetRemoved(this.stripIdentifierPrefix(target), mutation.target, 'attributeChange'));
                            addedTargets.forEach(target => this.targetAdded(this.stripIdentifierPrefix(target), mutation.target, 'attributeChange'));
                        }
                        break;
                    case 'characterData':
                        let nodule = this.findTargetInAncestry(mutation.target);
                        if (nodule == null) {
                            return;
                        }
                        else {
                            let supportedTargets = this.targetsUsedByThisControllerFromNode(nodule);
                            supportedTargets.forEach((target) => {
                                this.targetChanged(this.stripIdentifierPrefix(target), nodule, 'domMutation');
                            });
                        }
                        break;
                    case 'childList':
                        let { addedNodes, removedNodes } = mutation;
                        addedNodes.forEach((node) => this.processNodeDOMMutation(node, this.targetAdded));
                        removedNodes.forEach((node) => this.processNodeDOMMutation(node, this.targetRemoved));
                        break;
                }
            }
        };
        this.controller = controller;
        this.options = options;
        this.targetElement = controller.element;
        this.identifier = controller.scope.identifier;
        this.identifierPrefix = `${this.identifier}.`;
        this.targetSelector = controller.scope.schema.targetAttribute;
        this.scopedTargetSelector = `data-${this.identifier}-target`; //TODO: If/When stimulus 2.0 adds the identifier scoped targetAttribute to the schema, use that here instead
        // @ts-ignore
        this.targets = options.targets || controller.constructor.targets;
        this.prefixedTargets = this.targets.map((target) => `${this.identifierPrefix}${target}`);
        this.observer = new MutationObserver(this.mutation);
        this.enhanceController();
        this.observe();
    }
    processNodeDOMMutation(node, initialChangeModeAssumption) {
        let nodule = node;
        let change = initialChangeModeAssumption;
        let supportedTargets = [];
        if (nodule.nodeName == '#text' || this.targetsUsedByThisControllerFromNode(nodule).length == 0) {
            change = this.targetChanged;
            nodule = this.findTargetInAncestry(node);
        }
        else {
            supportedTargets = this.targetsUsedByThisControllerFromNode(nodule);
        }
        if (nodule == null) {
            return;
        }
        else if (supportedTargets.length == 0) {
            supportedTargets = this.targetsUsedByThisControllerFromNode(nodule);
        }
        supportedTargets.forEach((target) => {
            change.call(this, this.stripIdentifierPrefix(target), nodule, 'domMutation');
        });
    }
    findTargetInAncestry(node) {
        let nodule = node;
        let supportedTargets = [];
        if (nodule.nodeName != '#text') {
            supportedTargets = this.targetsUsedByThisControllerFromNode(nodule);
        }
        else {
        }
        // Traverse up the node tree until we find a target, or the controller root element
        while (nodule.parentNode !== null && nodule.parentNode != this.targetElement && supportedTargets.length == 0) {
            nodule = nodule.parentNode;
            if (nodule.nodeName !== '#text') {
                let supportedTargets = this.targetsUsedByThisControllerFromNode(nodule);
                if (supportedTargets.length > 0) {
                    // If this node has one of the watched targets on it, it's the one we want
                    return nodule;
                }
                else {
                }
            }
        }
        if (nodule.nodeName == '#text') {
            return null;
        }
        if (nodule.parentNode == null) {
            return null;
        }
        if (nodule.parentNode == this.targetElement) {
            // Double and triple check that we aren't throwing away a target just because it's parent is the controller root
            if (this.targetsUsedByThisControllerFromNode(nodule).length > 0) {
                return nodule;
            }
            return null;
        }
        return null;
    }
    targetAdded(name, node, trigger) {
        let targetCallback = `${name}TargetAdded`;
        this.controller[targetCallback] && method(this.controller, targetCallback).call(this.controller, node);
        this.log('targetAdded', { target: name, node, trigger });
    }
    targetRemoved(name, node, trigger) {
        let targetCallback = `${name}TargetRemoved`;
        this.controller[targetCallback] && method(this.controller, targetCallback).call(this.controller, node);
        this.log('targetRemoved', { target: name, node, trigger });
    }
    targetChanged(name, node, trigger) {
        let targetCallback = `${name}TargetChanged`;
        this.controller[targetCallback] && method(this.controller, targetCallback).call(this.controller, node);
        this.log('targetChanged', { target: name, node, trigger });
    }
    targetsUsedByThisControllerFromNode(node) {
        if (node.nodeName == "#text" || node.nodeName == "#comment") {
            // Failsafe, just in case we try processing a text or comment node
            return [];
        }
        // Extracts from the node, the target string, targetsUsedByThisController filters it, returns the array of supported target names
        let nodeElement = node;
        return this.targetsUsedByThisController(nodeElement.getAttribute(this.scopedTargetSelector) || nodeElement.getAttribute(this.targetSelector));
    }
    targetsUsedByThisController(targetStr) {
        // Filters out any targets that don't belong to this  controller and returns the array of supported target names
        targetStr = targetStr || '';
        let targetsToCheck = this.stripIdentifierPrefix(targetStr).split(' ');
        return this.targets.filter((n) => targetsToCheck.indexOf(n) !== -1);
    }
    stripIdentifierPrefix(target) {
        return target.replace(new RegExp(this.identifierPrefix, 'g'), '');
    }
    enhanceController() {
        const controllerDisconnect = this.controller.disconnect.bind(this.controller);
        const disconnect = () => {
            this.unobserve();
            controllerDisconnect();
        };
        Object.assign(this.controller, { disconnect });
    }
}
export const useTargetMutation = (controller, options = {}) => {
    const observer = new UseTargetMutation(controller, options);
    return [observer.observe, observer.unobserve];
};
//# sourceMappingURL=use-target-mutation.js.map