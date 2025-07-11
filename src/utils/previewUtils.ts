
export const getGridClass = (previewMode: 1 | 2 | 4 | 6) => {
  switch (previewMode) {
    case 1:
      return 'grid-cols-1';
    case 2:
      return 'grid-cols-1 md:grid-cols-2';
    case 4:
      return 'grid-cols-2 grid-rows-2';
    case 6:
      return 'grid-cols-2 md:grid-cols-3 grid-rows-2 gap-4';
    default:
      return 'grid-cols-1';
  }
};

export const getScaleClass = (previewMode: 1 | 2 | 4 | 6) => {
  switch (previewMode) {
    case 1:
      return 'scale-90';
    case 2:
      return 'scale-75';
    case 4:
      return 'scale-45';
    case 6:
      return 'scale-30';
    default:
      return 'scale-90';
  }
};
