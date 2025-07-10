
import { useState } from 'react';
import { Filter } from 'lucide-react';
import { StudentData, FeeData } from '../pages/GenerateBill';

interface BillPreviewProps {
  studentData: StudentData;
  feeData: FeeData;
}

const BillPreview = ({ studentData, feeData }: BillPreviewProps) => {
  const [previewMode, setPreviewMode] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [showPreviewDropdown, setShowPreviewDropdown] = useState(false);

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getBillItems = () => {
    return [
      { 
        label: 'Academic Fee', 
        amount: feeData.academicFee
      },
      { 
        label: 'Book Fee', 
        amount: feeData.bookFee
      },
      { 
        label: 'Uniform Fee', 
        amount: feeData.uniformFee
      },
      { 
        label: 'Transport Fee', 
        amount: feeData.transportFee
      }
    ];
  };

  const billItems = getBillItems();
  const totalAmount = billItems.reduce((sum, item) => sum + item.amount, 0);

  const previewOptions = [
    { value: 1, label: 'Preview: 1 Copy' },
    { value: 2, label: 'Preview: 2 Copies' },
    { value: 3, label: 'Preview: 3 Copies' },
    { value: 4, label: 'Preview: 4 Copies' },
    { value: 5, label: 'Preview: 5 Copies' },
    { value: 6, label: 'Preview: 6 Copies' }
  ];

  const getPreviewDisplayName = (mode: number) => {
    return `Preview: ${mode} ${mode === 1 ? 'Copy' : 'Copies'}`;
  };

  const getGridClass = () => {
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

  const getScaleClass = () => {
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

  const BillCopy = () => (
    <div className={`bg-white border-2 border-gray-200 rounded-lg p-4 print:shadow-none print:border-none print:rounded-none print:p-6 print:m-0 print:w-full print:max-w-none transform origin-top-left ${getScaleClass()}`}>
      {/* Header */}
      <div className="text-center mb-6 border-b-2 border-blue-600 pb-4 print:mb-6 print:pb-4">
        <h1 className="text-2xl font-bold text-blue-600 mb-2 print:text-2xl print:mb-1">Tagsol Education Institute</h1>
        <p className="text-gray-600 text-sm print:text-sm">123 Education Street, Knowledge City, KC 12345</p>
        <p className="text-gray-600 text-sm print:text-sm">Phone: +1 (555) 123-4567 | Email: billing@excellence-edu.com</p>
        <div className="mt-3 print:mt-3">
          <h2 className="text-lg font-semibold text-gray-900 print:text-lg">FEE BILL</h2>
          <p className="text-xs text-gray-600">Academic Year 2024-2025</p>
        </div>
      </div>

      {/* Student Information */}
      <div className="grid md:grid-cols-2 gap-4 mb-6 print:mb-6 print:gap-4">
        <div className="bg-blue-50 p-3 rounded-lg print:bg-gray-50 print:p-3">
          <h3 className="font-semibold text-gray-900 mb-2 print:mb-2 text-sm">Student Information</h3>
          <div className="space-y-1 print:space-y-1">
            <p className="text-xs print:text-sm"><span className="font-medium">Name:</span> {studentData.name}</p>
            <p className="text-xs print:text-sm"><span className="font-medium">Class:</span> {studentData.class}</p>
            <p className="text-xs print:text-sm"><span className="font-medium">Roll Number:</span> {studentData.rollNumber}</p>
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg print:p-3">
          <h3 className="font-semibold text-gray-900 mb-2 print:mb-2 text-sm">Bill Information</h3>
          <div className="space-y-1 print:space-y-1">
            <p className="text-xs print:text-sm"><span className="font-medium">Issue Date:</span> {getCurrentDate()}</p>
            <p className="text-xs print:text-sm"><span className="font-medium">Due Date:</span> {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Fee Details */}
      <div className="mb-6 print:mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Fee Breakdown</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-xs print:text-sm">
            <thead>
              <tr className="bg-blue-600 text-white print:bg-gray-800">
                <th className="border border-gray-300 px-2 py-2 text-left print:px-3 print:py-2">Description</th>
                <th className="border border-gray-300 px-2 py-2 text-right print:px-3 print:py-2">Amount ($)</th>
              </tr>
            </thead>
            <tbody>
              {billItems.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 print:hover:bg-transparent">
                  <td className="border border-gray-300 px-2 py-2 print:px-3 print:py-2">{item.label}</td>
                  <td className="border border-gray-300 px-2 py-2 text-right font-medium print:px-3 print:py-2">
                    ${item.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className="bg-blue-50 font-semibold print:bg-gray-100">
                <td className="border border-gray-300 px-2 py-2 print:px-3 print:py-2">Total Amount</td>
                <td className="border border-gray-300 px-2 py-2 text-right text-sm print:px-3 print:py-2 print:text-base">
                  ${totalAmount.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Instructions */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4 print:mb-4 print:p-3 print:bg-gray-50 print:border-gray-400">
        <h4 className="font-semibold text-gray-900 mb-2 text-xs print:text-sm">Payment Instructions</h4>
        <ul className="text-xs text-gray-700 space-y-1 print:text-xs">
          <li>• Payment is due within 30 days of issue date</li>
          <li>• Late payments may incur additional charges</li>
          <li>• Payment can be made online, by check, or in person at the office</li>
          <li>• Please include student name and roll number with payment</li>
        </ul>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-600 border-t pt-3 print:pt-3 print:text-xs">
        <p>This is a computer-generated bill. For queries, contact the billing department.</p>
        <p className="mt-1 print:mt-1">Thank you for choosing Tagsol Education Institute</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6 print:shadow-none print:border-none print:rounded-none print:p-6 print:m-0 print:w-full print:max-w-none">
      {/* Preview Filter - Hidden in print */}
      <div className="flex items-center justify-between mb-6 print:hidden">
        <h3 className="text-lg font-semibold text-gray-900">Bill Preview</h3>
        
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
                      setPreviewMode(option.value as 1 | 2 | 3 | 4 | 5 | 6);
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
      </div>

      {/* A4 Sheet Container */}
      <div className="bg-white shadow-lg mx-auto" style={{ width: '210mm', minHeight: '297mm', padding: '10mm' }}>
        <div className={`grid gap-4 h-full ${getGridClass()}`}>
          {Array.from({ length: previewMode }, (_, index) => (
            <BillCopy key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillPreview;
