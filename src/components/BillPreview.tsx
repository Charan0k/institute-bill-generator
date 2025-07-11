
import { StudentData, FeeData } from '../pages/GenerateBill';
import BillCopy from './BillCopy';
import { getGridClass, getScaleClass } from '../utils/previewUtils';
import { ScrollArea } from './ui/scroll-area';

interface BillPreviewProps {
  studentData: StudentData;
  feeData: FeeData;
  previewMode: 1 | 2 | 4 | 6;
}

const BillPreview = ({ studentData, feeData, previewMode }: BillPreviewProps) => {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6 print:shadow-none print:border-none print:rounded-none print:p-6 print:m-0 print:w-full print:max-w-none">
      {/* A4 Sheet Container with Scroll */}
      <ScrollArea className={`w-full ${previewMode > 2 ? 'h-[90vh]' : 'h-[80vh]'}`}>
        <div className="bill-preview-content bg-white shadow-lg mx-auto max-w-full overflow-hidden" style={{ 
          width: 'min(100%, 210mm)', 
          minHeight: previewMode > 2 ? '600mm' : '297mm',
          padding: '10mm'
        }}>
          <div className={`grid h-full ${getGridClass(previewMode)} ${previewMode > 2 ? 'gap-6' : 'gap-4'}`}>
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
      </ScrollArea>
    </div>
  );
};

export default BillPreview;
