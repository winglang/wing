import {ElectronApi} from "../electron/preload";

declare global {
    interface Window {
        electronTRPC: ElectronApi;
    }
}

export {};