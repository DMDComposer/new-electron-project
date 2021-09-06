import { API } from "../../../src/bridge";

declare global {
    interface Window {api: typeof API}
}