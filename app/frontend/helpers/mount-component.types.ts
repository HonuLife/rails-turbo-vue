import type { App } from "vue";

type AsyncAppMounter = () => Promise<() => Promise<App | undefined>>;

export type { AsyncAppMounter };
