import { Toast } from './toast';
export declare class Md2ToastComponent {
    toasts: Toast[];
    maxShown: number;
    add(toast: Toast): void;
    remove(toastId: number): void;
    removeAll(): void;
    hasToast(): boolean;
}
