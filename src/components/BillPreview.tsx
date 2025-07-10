
import { useState } from 'react';
import { StudentData, FeeData } from '../pages/GenerateBill';
import BillCopy from './BillCopy';
import PreviewSelector from './PreviewSelector';
import { getGridClass, getScaleClass } from '../utils/previewUtils';

interface BillPreviewProps {
  studentData: StudentData;
  feeData: FeeData;
}

const BillPreview = ({ studentData, feeData }: BillPreviewProps) => {
  const [previewMode, setPreviewMode] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6 print:shadow-none print:border-none print:rounded-none print:p-6 print:m-0 print:w-full print:max-w-none">
      {/* Preview Filter - Hidden in print */}
      <div className="flex items-center justify-between mb-6 print:hidden">
        <h3 className="text-lg font-semibold text-gray-900">Bill Preview</h3>
        <PreviewSelector previewMode={previewMode} onPreviewModeChange={setPreviewMode} />
      </div>

      {/* A4 Sheet Container */}
      <div className="bg-white shadow-lg mx-auto" style={{ width: '210mm', minHeight: '297mm', padding: '10mm' }}>
        <div className={`grid gap-4 h-full ${getGridClass(previewMode)}`}>
          {Array.from({ length: previewMode }, (_, index) => (
            <BillCopy 
              key={index} 
              studentData={studentData} 
              feeData={feeData} 
              scaleClass={getScaleClass(previewMode)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillPreview;
