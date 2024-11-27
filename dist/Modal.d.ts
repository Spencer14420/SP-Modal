export declare class Modal {
  private element: HTMLElement;
  private modalContent: HTMLElement;
  private showButtons: NodeListOf<HTMLElement>;
  private closeButtons: NodeListOf<HTMLElement>;
  private outsideClickHandler: (event: MouseEvent) => void;
  private isTransitioning: boolean;

  constructor(selector: string);

  public show(): void;
  public hide(): void;

  private initializeEventListeners(): void;
  private handleOutsideClick(event: MouseEvent): void;
}
