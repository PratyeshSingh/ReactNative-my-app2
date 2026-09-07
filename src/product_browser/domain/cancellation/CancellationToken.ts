
export interface CancellationToken {
  isCancelled: boolean;
  onCancel(callback: () => void): () => void;
}

export class CancellationTokenSource implements CancellationToken {
  private callbacks: Set<() => void> = new Set();
  public isCancelled = false;

  /**
   * Registers a listener to be executed when token is cancelled.
   * Returns an unsubscribe function to prevent memory leaks.
   */
  public onCancel(callback: () => void): () => void {
    if (this.isCancelled) {
      callback();
      return () => {};
    }

    this.callbacks.add(callback);
    return () => {
      this.callbacks.delete(callback);
    };
  }

  /**
   * Triggers cancellation and notifies all listeners.
   */
  public cancel(): void {
    if (this.isCancelled) return;
    this.isCancelled = true;

    this.callbacks.forEach((cb) => cb());
    this.callbacks.clear();
  }

  /**
   * Returns the token instance to pass into domain use-cases.
   */
  public get token(): CancellationToken {
    return this;
  }
}