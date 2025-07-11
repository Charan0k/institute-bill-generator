
import { useState } from 'react';
import { FileText, Download, Printer } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BillForm from '../components/BillForm';
import BillPreview from '../components/BillPreview';
import PreviewSelector from '../components/PreviewSelector';

export interface StudentData {
  name: string;
  class: string;
  rollNumber: string;
  billType: 'academic-only' | 'basic-package' | 'full-package';
}

export interface FeeData {
  academicFee: number;
  uniformFee: number;
  bookFee: number;
  transportFee: number;
  labFee: number;
  miscellaneousFee: number;
  hostelFee: number;
  messFee: number;
}

const GenerateBill = () => {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [previewMode, setPreviewMode] = useState<1 | 2 | 4 | 6>(1);
  const [feeData, setFeeData] = useState<FeeData>({
    academicFee: 4000,
    uniformFee: 1000,
    bookFee: 600,
    transportFee: 1200,
    labFee: 200,
    miscellaneousFee: 250,
    hostelFee: 2100,
    messFee: 1400
  });

  const handleFormSubmit = (data: StudentData) => {
    setStudentData(data);
  };

  const handlePrint = () => {
    const printContent = document.querySelector('.bill-preview-content');
    if (printContent) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Fee Bill - ${studentData?.name}</title>
              <style>
                @page {
                  size: A4;
                  margin: 0.5in;
                }
                * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                }
                body {
                  font-family: Arial, sans-serif;
                  line-height: 1.4;
                  color: #333;
                  -webkit-print-color-adjust: exact;
                  print-color-adjust: exact;
                }
                .bg-blue-600 { background-color: #2563eb !important; }
                .text-blue-600 { color: #2563eb !important; }
                .bg-blue-50 { background-color: #eff6ff !important; }
                .bg-gray-50 { background-color: #f9fafb !important; }
                .bg-gray-800 { background-color: #1f2937 !important; }
                .bg-gray-100 { background-color: #f3f4f6 !important; }
                .bg-yellow-50 { background-color: #fefce8 !important; }
                .bg-red-50 { background-color: #fef2f2 !important; }
                .text-white { color: white !important; }
                .text-gray-600 { color: #4b5563 !important; }
                .text-gray-700 { color: #374151 !important; }
                .text-gray-900 { color: #111827 !important; }
                .text-red-800 { color: #991b1b !important; }
                .text-red-700 { color: #b91c1c !important; }
                .border { border: 1px solid #d1d5db; }
                .border-gray-300 { border-color: #d1d5db; }
                .border-gray-400 { border-color: #9ca3af; }
                .border-blue-600 { border-color: #2563eb; }
                .border-yellow-400 { border-color: #fbbf24; }
                .border-red-400 { border-color: #f87171; }
                .border-l-4 { border-left-width: 4px; }
                .border-b-2 { border-bottom-width: 2px; }
                .border-t { border-top-width: 1px; }
                table { border-collapse: collapse; width: 100%; }
                th, td { border: 1px solid #d1d5db; padding: 8px; }
                th { background-color: #1f2937; color: white; }
                .font-bold { font-weight: bold; }
                .font-semibold { font-weight: 600; }
                .font-medium { font-weight: 500; }
                .text-center { text-align: center; }
                .text-left { text-align: left; }
                .text-right { text-align: right; }
                .text-sm { font-size: 14px; }
                .text-xs { font-size: 12px; }
                .text-lg { font-size: 18px; }
                .text-xl { font-size: 20px; }
                .text-2xl { font-size: 24px; }
                .text-3xl { font-size: 30px; }
                .mb-1 { margin-bottom: 0.25rem; }
                .mb-2 { margin-bottom: 0.5rem; }
                .mb-3 { margin-bottom: 0.75rem; }
                .mb-4 { margin-bottom: 1rem; }
                .mb-6 { margin-bottom: 1.5rem; }
                .mt-1 { margin-top: 0.25rem; }
                .mt-2 { margin-top: 0.5rem; }
                .mt-3 { margin-top: 0.75rem; }
                .pb-4 { padding-bottom: 1rem; }
                .pt-3 { padding-top: 0.75rem; }
                .p-3 { padding: 0.75rem; }
                .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
                .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
                .space-y-1 > * + * { margin-top: 0.25rem; }
                .grid { display: grid; }
                .grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
                .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
                .grid-rows-2 { grid-template-rows: repeat(2, 1fr); }
                .grid-rows-3 { grid-template-rows: repeat(3, 1fr); }
                .gap-4 { gap: 1rem; }
                .gap-6 { gap: 1.5rem; }
                .rounded-lg { border-radius: 0.5rem; }
                .overflow-x-auto { overflow-x: auto; }
                .transform { transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
                .scale-90 { --tw-scale-x: 0.9; --tw-scale-y: 0.9; }
                .scale-75 { --tw-scale-x: 0.75; --tw-scale-y: 0.75; }
                .scale-45 { --tw-scale-x: 0.45; --tw-scale-y: 0.45; }
                .scale-30 { --tw-scale-x: 0.3; --tw-scale-y: 0.3; }
                .origin-top-left { transform-origin: top left; }
              </style>
            </head>
            <body>
              ${printContent.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
      }
    }
  };

  const handleDownload = () => {
    // For now, trigger print dialog which allows saving as PDF
    handlePrint();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 print:bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8 print:hidden">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Generate Student Bill
          </h1>
          <p className="text-xl text-gray-600">
            Create professional fee bills with customizable formats
          </p>
        </div>

        <div className="space-y-8">
          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
            <div className="flex items-center mb-6">
              <FileText className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Student Information</h2>
            </div>
            <BillForm onSubmit={handleFormSubmit} feeData={feeData} onFeeChange={setFeeData} />
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Bill Preview</h2>
              {studentData && (
                <div className="flex items-center space-x-2">
                  <PreviewSelector previewMode={previewMode} onPreviewModeChange={setPreviewMode} />
                  <button
                    onClick={handlePrint}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Print
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                </div>
              )}
            </div>
            
            {studentData ? (
              <BillPreview studentData={studentData} feeData={feeData} previewMode={previewMode} />
            ) : (
              <div className="text-center py-12 text-gray-500">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Fill out the form to preview the bill</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GenerateBill;
