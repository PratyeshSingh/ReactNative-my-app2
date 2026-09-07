
export interface CancellationToken {
    isCancelled: boolean;
    onCancel(callback: () => void): void;
}