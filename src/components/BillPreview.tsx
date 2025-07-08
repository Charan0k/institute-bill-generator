
import { StudentData, FeeData } from '../pages/GenerateBill';

interface BillPreviewProps {
  studentData: StudentData;
  feeData: FeeData;
}

const BillPreview = ({ studentData, feeData }: BillPreviewProps) => {
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
          { label: 'Academic Fee', amount: feeData.academicFee },
          { 
            label: 'Other Charges (Uniform, Books, Transport, Lab, Misc.)', 
            amount: feeData.uniformFee + feeData.bookFee + feeData.transportFee + feeData.labFee + feeData.miscellaneousFee 
          }
        ];
      case '3-part':
        return [
          { label: 'Academic Fee', amount: feeData.academicFee },
          { label: 'Uniform Fee', amount: feeData.uniformFee },
          { 
            label: 'Books & Other Charges', 
            amount: feeData.bookFee + feeData.transportFee + feeData.labFee + feeData.miscellaneousFee 
          }
        ];
      case '5-part':
        return [
          { label: 'Academic Fee', amount: feeData.academicFee },
          { label: 'Uniform Fee', amount: feeData.uniformFee },
          { label: 'Book Fee', amount: feeData.bookFee },
          { label: 'Transport Fee', amount: feeData.transportFee },
          { 
            label: 'Lab & Miscellaneous Fee', 
            amount: feeData.labFee + feeData.miscellaneousFee 
          }
        ];
      default:
        return [];
    }
  };

  const billItems = getBillItems();
  const totalAmount = billItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-8 print:shadow-none print:border-none">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-blue-600 pb-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">Tagsol Education Institute</h1>
        <p className="text-gray-600">123 Education Street, Knowledge City, KC 12345</p>
        <p className="text-gray-600">Phone: +1 (555) 123-4567 | Email: billing@excellence-edu.com</p>
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-900">FEE BILL</h2>
          <p className="text-sm text-gray-600">Academic Year 2024-2025</p>
        </div>
      </div>

      {/* Student Information */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">Student Information</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Name:</span> {studentData.name}</p>
            <p><span className="font-medium">Class:</span> {studentData.class}</p>
            <p><span className="font-medium">Roll Number:</span> {studentData.rollNumber}</p>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">Bill Information</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Bill Type:</span> {studentData.billType}</p>
            <p><span className="font-medium">Issue Date:</span> {getCurrentDate()}</p>
            <p><span className="font-medium">Due Date:</span> {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Fee Details */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Fee Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border border-gray-300 px-4 py-3 text-left">Description</th>
                <th className="border border-gray-300 px-4 py-3 text-right">Amount ($)</th>
              </tr>
            </thead>
            <tbody>
              {billItems.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">{item.label}</td>
                  <td className="border border-gray-300 px-4 py-3 text-right font-medium">
                    ${item.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className="bg-blue-50 font-semibold">
                <td className="border border-gray-300 px-4 py-3">Total Amount</td>
                <td className="border border-gray-300 px-4 py-3 text-right text-lg">
                  ${totalAmount.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Instructions */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <h4 className="font-semibold text-gray-900 mb-2">Payment Instructions</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Payment is due within 30 days of issue date</li>
          <li>• Late payments may incur additional charges</li>
          <li>• Payment can be made online, by check, or in person at the office</li>
          <li>• Please include student name and roll number with payment</li>
        </ul>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-600 border-t pt-4">
        <p>This is a computer-generated bill. For queries, contact the billing department.</p>
        <p className="mt-2">Thank you for choosing Tagsol Education Institute</p>
      </div>
    </div>
  );
};

export default BillPreview;
