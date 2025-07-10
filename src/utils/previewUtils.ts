
export const getGridClass = (previewMode: 1 | 2 | 3 | 4 | 5 | 6) => {
  switch (previewMode) {
    case 1:
      return 'grid-cols-1';
    case 2:
      return 'grid-cols-1 md:grid-cols-2';
    case 3:
      return 'grid-cols-1 md:grid-cols-3';
    case 4:
      return 'grid-cols-2';
    case 5:
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    case 6:
      return 'grid-cols-2 md:grid-cols-3';
    default:
      return 'grid-cols-1';
  }
};

export const getScaleClass = (previewMode: 1 | 2 | 3 | 4 | 5 | 6) => {
  switch (previewMode) {
    case 1:
      return 'scale-100';
    case 2:
      return 'scale-75';
    case 3:
      return 'scale-50';
    case 4:
      return 'scale-50';
    case 5:
      return 'scale-40';
    case 6:
      return 'scale-40';
    default:
      return 'scale-100';
  }
};
