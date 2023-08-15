export const classNames = (...classes: any[]) => {
  return classes.filter(Boolean).join(' ');
};

export enum NextStatusUpdates {
  PROCEED = 'Proceed to Next Step',
  DISCARD = 'Discard',
}

export enum ReviewCompletionStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETE = 'COMPLETE',
}
