
export const getGridClass = (previewMode: 1 | 2 | 3 | 4 | 5 | 6) => {
  switch (previewMode) {
    case 1:
      return 'grid-cols-1';
    case 2:
      return 'grid-cols-1 md:grid-cols-2';
    case 3:
      return 'grid-cols-1 md:grid-cols-3';
    case 4:
      return 'grid-cols-2 grid-rows-2';
    case 5:
      return 'grid-cols-2 grid-rows-3 gap-y-4';
    case 6:
      return 'grid-cols-2 md:grid-cols-3 grid-rows-2 gap-4';
    default:
      return 'grid-cols-1';
  }
};

export const getScaleClass = (previewMode: 1 | 2 | 3 | 4 | 5 | 6) => {
  switch (previewMode) {
    case 1:
      return 'scale-90';
    case 2:
      return 'scale-75';
    case 3:
      return 'scale-60';
    case 4:
      return 'scale-45';
    case 5:
      return 'scale-35';
    case 6:
      return 'scale-30';
    default:
      return 'scale-90';
  }
};
