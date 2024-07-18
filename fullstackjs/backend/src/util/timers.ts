import { setTimeout } from "timers";

export function executeAfterDelay(callback: any, delay: number) {
    setTimeout(callback, delay);
}