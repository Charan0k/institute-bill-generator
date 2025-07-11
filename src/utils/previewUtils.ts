
export const getGridClass = (previewMode: 2 | 4 | 6) => {
  // All modes now use 2 columns side by side layout
  switch (previewMode) {
    case 2:
      return 'grid-cols-2 gap-6';
    case 4:
      return 'grid-cols-2 grid-rows-2 gap-6';
    case 6:
      return 'grid-cols-2 grid-rows-3 gap-6';
    default:
      return 'grid-cols-2 gap-6';
  }
};

export const getScaleClass = (previewMode: 2 | 4 | 6) => {
  // Adjusted scaling to make copies larger and more readable
  switch (previewMode) {
    case 2:
      return 'scale-90';
    case 4:
      return 'scale-75';
    case 6:
      return 'scale-65';
    default:
      return 'scale-90';
  }
};
