
import { StudentData, FeeData } from '../pages/GenerateBill';

interface BillPreviewProps {
  studentData: StudentData;
  feeData: FeeData;
}

const BillPreview = ({ studentData, feeData }: BillPreviewProps) => {
  // Original fee amounts
  const originalFees = {
    academicFee: 5000,
    uniformFee: 1200,
    bookFee: 800,
    transportFee: 1500,
    labFee: 600,
    miscellaneousFee: 300
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getBillItems = () => {
    const { billType } = studentData;
    
    switch (billType) {
      case '2-part':
        return [
          { 
            label: 'Academic Fee', 
            amount: feeData.academicFee,
            originalAmount: originalFees.academicFee
          },
          { 
            label: 'Other Charges (Uniform, Books, Transport, Lab, Misc.)', 
            amount: feeData.uniformFee + feeData.bookFee + feeData.transportFee + feeData.labFee + feeData.miscellaneousFee,
            originalAmount: originalFees.uniformFee + originalFees.bookFee + originalFees.transportFee + originalFees.labFee + originalFees.miscellaneousFee
          }
        ];
      case '3-part':
        return [
          { 
            label: 'Academic Fee', 
            amount: feeData.academicFee,
            originalAmount: originalFees.academicFee
          },
          { 
            label: 'Uniform Fee', 
            amount: feeData.uniformFee,
            originalAmount: originalFees.uniformFee
          },
          { 
            label: 'Books & Other Charges', 
            amount: feeData.bookFee + feeData.transportFee + feeData.labFee + feeData.miscellaneousFee,
            originalAmount: originalFees.bookFee + originalFees.transportFee + originalFees.labFee + originalFees.miscellaneousFee
          }
        ];
      case '5-part':
        return [
          { 
            label: 'Academic Fee', 
            amount: feeData.academicFee,
            originalAmount: originalFees.academicFee
          },
          { 
            label: 'Uniform Fee', 
            amount: feeData.uniformFee,
            originalAmount: originalFees.uniformFee
          },
          { 
            label: 'Book Fee', 
            amount: feeData.bookFee,
            originalAmount: originalFees.bookFee
          },
          { 
            label: 'Transport Fee', 
            amount: feeData.transportFee,
            originalAmount: originalFees.transportFee
          },
          { 
            label: 'Lab & Miscellaneous Fee', 
            amount: feeData.labFee + feeData.miscellaneousFee,
            originalAmount: originalFees.labFee + originalFees.miscellaneousFee
          }
        ];
      default:
        return [];
    }
  };

  const billItems = getBillItems();
  const totalAmount = billItems.reduce((sum, item) => sum + item.amount, 0);
  const totalOriginalAmount = billItems.reduce((sum, item) => sum + item.originalAmount, 0);
  const dueAmount = totalOriginalAmount - totalAmount;

  return (
    <div id="bill-to-print" className="bg-white border-2 border-gray-200 rounded-lg p-8 print:shadow-none print:border-none print:rounded-none print:p-6 print:m-0 print:w-full print:max-w-none">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-blue-600 pb-6 print:mb-6 print:pb-4">
        <h1 className="text-3xl font-bold text-blue-600 mb-2 print:text-2xl print:mb-1">Tagsol Education Institute</h1>
        <p className="text-gray-600 print:text-sm">123 Education Street, Knowledge City, KC 12345</p>
        <p className="text-gray-600 print:text-sm">Phone: +1 (555) 123-4567 | Email: billing@excellence-edu.com</p>
        <div className="mt-4 print:mt-3">
          <h2 className="text-xl font-semibold text-gray-900 print:text-lg">FEE BILL</h2>
          <p className="text-sm text-gray-600">Academic Year 2024-2025</p>
        </div>
      </div>

      {/* Student Information */}
      <div className="grid md:grid-cols-2 gap-6 mb-8 print:mb-6 print:gap-4">
        <div className="bg-blue-50 p-4 rounded-lg print:bg-gray-50 print:p-3">
          <h3 className="font-semibold text-gray-900 mb-3 print:mb-2">Student Information</h3>
          <div className="space-y-2 print:space-y-1">
            <p className="print:text-sm"><span className="font-medium">Name:</span> {studentData.name}</p>
            <p className="print:text-sm"><span className="font-medium">Class:</span> {studentData.class}</p>
            <p className="print:text-sm"><span className="font-medium">Roll Number:</span> {studentData.rollNumber}</p>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg print:p-3">
          <h3 className="font-semibold text-gray-900 mb-3 print:mb-2">Bill Information</h3>
          <div className="space-y-2 print:space-y-1">
            <p className="print:text-sm"><span className="font-medium">Bill Type:</span> {studentData.billType}</p>
            <p className="print:text-sm"><span className="font-medium">Issue Date:</span> {getCurrentDate()}</p>
            <p className="print:text-sm"><span className="font-medium">Due Date:</span> {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Fee Details */}
      <div className="mb-8 print:mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 print:mb-3">Fee Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 print:text-sm">
            <thead>
              <tr className="bg-blue-600 text-white print:bg-gray-800">
                <th className="border border-gray-300 px-4 py-3 text-left print:px-3 print:py-2">Description</th>
                <th className="border border-gray-300 px-4 py-3 text-right print:px-3 print:py-2">Amount ($)</th>
                <th className="border border-gray-300 px-4 py-3 text-right print:px-3 print:py-2">Due Amount ($)</th>
              </tr>
            </thead>
            <tbody>
              {billItems.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 print:hover:bg-transparent">
                  <td className="border border-gray-300 px-4 py-3 print:px-3 print:py-2">{item.label}</td>
                  <td className="border border-gray-300 px-4 py-3 text-right font-medium print:px-3 print:py-2">
                    ${item.amount.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-right font-medium print:px-3 print:py-2">
                    ${(item.originalAmount - item.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className="bg-blue-50 font-semibold print:bg-gray-100">
                <td className="border border-gray-300 px-4 py-3 print:px-3 print:py-2">Total Amount</td>
                <td className="border border-gray-300 px-4 py-3 text-right text-lg print:px-3 print:py-2 print:text-base">
                  ${totalAmount.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-right text-lg print:px-3 print:py-2 print:text-base">
                  ${dueAmount.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Status */}
      {dueAmount > 0 && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 print:mb-4 print:p-3 print:bg-gray-50 print:border-gray-400">
          <h4 className="font-semibold text-red-800 mb-2 print:text-sm print:text-gray-900">Outstanding Balance</h4>
          <p className="text-sm text-red-700 print:text-xs print:text-gray-700">
            Total Outstanding Amount: <span className="font-bold">${dueAmount.toFixed(2)}</span>
          </p>
          <p className="text-sm text-red-700 print:text-xs print:text-gray-700">
            This amount remains to be paid to complete the full fee payment.
          </p>
        </div>
      )}

      {/* Payment Instructions */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 print:mb-4 print:p-3 print:bg-gray-50 print:border-gray-400">
        <h4 className="font-semibold text-gray-900 mb-2 print:text-sm">Payment Instructions</h4>
        <ul className="text-sm text-gray-700 space-y-1 print:text-xs">
          <li>• Payment is due within 30 days of issue date</li>
          <li>• Late payments may incur additional charges</li>
          <li>• Payment can be made online, by check, or in person at the office</li>
          <li>• Please include student name and roll number with payment</li>
          {dueAmount > 0 && (
            <li>• Outstanding balance of ${dueAmount.toFixed(2)} must be paid to avoid late fees</li>
          )}
        </ul>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-600 border-t pt-4 print:pt-3 print:text-xs">
        <p>This is a computer-generated bill. For queries, contact the billing department.</p>
        <p className="mt-2 print:mt-1">Thank you for choosing Tagsol Education Institute</p>
      </div>
    </div>
  );
};

export default BillPreview;
