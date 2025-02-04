import { Controller } from 'stimulus';
export declare const method: (controller: Controller, methodName: string) => Function;
export declare const composeEventName: (name: string, controller: Controller, eventPrefix: boolean | string) => string;
export declare const extendedEvent: (type: string, event: Event | null, detail: object) => CustomEvent;
export declare function isElementInViewport(el: Element): boolean;
//# sourceMappingURL=index.d.ts.map