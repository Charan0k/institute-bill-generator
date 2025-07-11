
import { useState } from 'react';
import { Filter } from 'lucide-react';

interface PreviewSelectorProps {
  previewMode: 2 | 4 | 6;
  onPreviewModeChange: (mode: 2 | 4 | 6) => void;
}

const PreviewSelector = ({ previewMode, onPreviewModeChange }: PreviewSelectorProps) => {
  const [showPreviewDropdown, setShowPreviewDropdown] = useState(false);

  const previewOptions = [
    { value: 2, label: 'Preview: 2 Copies' },
    { value: 4, label: 'Preview: 4 Copies' },
    { value: 6, label: 'Preview: 6 Copies' }
  ];

  const getPreviewDisplayName = (mode: number) => {
    return `Preview: ${mode} Copies`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowPreviewDropdown(!showPreviewDropdown)}
        className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-300 border border-gray-300"
      >
        <Filter className="w-4 h-4 mr-2" />
        <span className="text-sm font-medium">{getPreviewDisplayName(previewMode)}</span>
      </button>
      
      {/* Preview Dropdown */}
      {showPreviewDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <div className="py-2">
            {previewOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onPreviewModeChange(option.value as 2 | 4 | 6);
                  setShowPreviewDropdown(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200 ${
                  previewMode === option.value ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewSelector;
