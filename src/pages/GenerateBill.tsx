
import { useState } from 'react';
import { FileText, Download, Printer } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BillForm from '../components/BillForm';
import BillPreview from '../components/BillPreview';

export interface StudentData {
  name: string;
  class: string;
  rollNumber: string;
  billType: '2-part' | '3-part' | '5-part';
}

export interface FeeData {
  academicFee: number;
  uniformFee: number;
  bookFee: number;
  transportFee: number;
  labFee: number;
  miscellaneousFee: number;
}

const GenerateBill = () => {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [feeData, setFeeData] = useState<FeeData>({
    academicFee: 5000,
    uniformFee: 1200,
    bookFee: 800,
    transportFee: 1500,
    labFee: 600,
    miscellaneousFee: 300
  });

  const handleFormSubmit = (data: StudentData) => {
    setStudentData(data);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // This would typically integrate with a PDF generation library
    // For now, we'll trigger the browser's print dialog
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Generate Student Bill
          </h1>
          <p className="text-xl text-gray-600">
            Create professional fee bills with customizable formats
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
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
                <div className="flex space-x-2">
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
              <BillPreview studentData={studentData} feeData={feeData} />
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
