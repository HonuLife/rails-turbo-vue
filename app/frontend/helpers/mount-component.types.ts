import type { App } from "vue";

type AsyncAppMounter = () => Promise<() => App | undefined>;

export type { AsyncAppMounter }
