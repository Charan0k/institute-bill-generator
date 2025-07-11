
import { StudentData, FeeData } from '../pages/GenerateBill';

interface BillCopyProps {
  studentData: StudentData;
  feeData: FeeData;
  scaleClass: string;
}

const BillCopy = ({ studentData, feeData, scaleClass }: BillCopyProps) => {
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

  return (
    <div className={`bg-white border-2 border-gray-200 rounded-lg p-4 print:shadow-none print:border-none print:rounded-none print:p-6 print:m-0 print:w-full print:max-w-none transform origin-top-left ${scaleClass} aspect-square flex flex-col`}>
      {/* Header */}
      <div className="text-center mb-4 border-b-2 border-blue-600 pb-3 print:mb-6 print:pb-4">
        <h1 className="text-xl font-bold text-blue-600 mb-2 print:text-2xl print:mb-1">Tagsol Education Institute</h1>
        <div className="mt-2 print:mt-3">
          <h2 className="text-base font-semibold text-gray-900 print:text-lg">FEE BILL</h2>
          <p className="text-xs text-gray-600">Academic Year 2024-2025</p>
        </div>
      </div>

      {/* Student Information */}
      <div className="grid md:grid-cols-2 gap-3 mb-4 print:mb-6 print:gap-4 flex-shrink-0">
        <div className="bg-blue-50 p-2 rounded-lg print:bg-gray-50 print:p-3">
          <h3 className="font-semibold text-gray-900 mb-2 print:mb-2 text-xs">Student Information</h3>
          <div className="space-y-1 print:space-y-1">
            <p className="text-xs print:text-sm"><span className="font-medium">Name:</span> {studentData.name}</p>
            <p className="text-xs print:text-sm"><span className="font-medium">Class:</span> {studentData.class}</p>
            <p className="text-xs print:text-sm"><span className="font-medium">Roll Number:</span> {studentData.rollNumber}</p>
          </div>
        </div>
        <div className="bg-gray-50 p-2 rounded-lg print:p-3">
          <h3 className="font-semibold text-gray-900 mb-2 print:mb-2 text-xs">Bill Information</h3>
          <div className="space-y-1 print:space-y-1">
            <p className="text-xs print:text-sm"><span className="font-medium">Issue Date:</span> {getCurrentDate()}</p>
            <p className="text-xs print:text-sm"><span className="font-medium">Due Date:</span> {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Fee Details */}
      <div className="mb-4 print:mb-6 flex-grow">
        <h3 className="text-xs font-semibold text-gray-900 mb-2">Fee Breakdown</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-xs print:text-sm">
            <thead>
              <tr className="bg-blue-600 text-white print:bg-gray-800">
                <th className="border border-gray-300 px-2 py-1 text-left print:px-3 print:py-2">Description</th>
                <th className="border border-gray-300 px-2 py-1 text-right print:px-3 print:py-2">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {billItems.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 print:hover:bg-transparent">
                  <td className="border border-gray-300 px-2 py-1 print:px-3 print:py-2">{item.label}</td>
                  <td className="border border-gray-300 px-2 py-1 text-right font-medium print:px-3 print:py-2">
                    ₹{item.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}

                  </td>
                </tr>
              ))}
              <tr className="bg-blue-50 font-semibold print:bg-gray-100">
                <td className="border border-gray-300 px-2 py-1 print:px-3 print:py-2">Total Amount</td>
                <td className="border border-gray-300 px-2 py-1 text-right text-sm print:px-3 print:py-2 print:text-base">
                  ₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-600 border-t pt-2 print:pt-3 print:text-xs mt-auto">
        {/* <p>This is a computer-generated bill. For queries, contact the billing department.</p>
        <p className="mt-1 print:mt-1">Thank you for choosing Tagsol Education Institute</p> */}
      </div>
    </div>
  );
};

export default BillCopy;
