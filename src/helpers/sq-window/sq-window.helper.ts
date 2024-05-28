export class SqWindowHelper {
  window(): (Window & typeof globalThis) | null {
    return document.defaultView
  }
}
