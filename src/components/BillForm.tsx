
import { useState } from 'react';
import { StudentData, FeeData } from '../pages/GenerateBill';

interface BillFormProps {
  onSubmit: (data: StudentData) => void;
  feeData: FeeData;
  onFeeChange: (data: FeeData) => void;
}

const BillForm = ({ onSubmit, feeData, onFeeChange }: BillFormProps) => {
  const [formData, setFormData] = useState<StudentData>({
    name: '',
    class: '',
    rollNumber: '',
    billType: '3-part' // Default value, will be controlled by filter
  });

  const [showFeeSettings, setShowFeeSettings] = useState(false);

  // Original fee amounts (cannot be exceeded)
  const originalFees = {
    academicFee: 5000,
    uniformFee: 1200,
    bookFee: 800,
    transportFee: 1500,
    labFee: 600,
    miscellaneousFee: 300
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.class && formData.rollNumber) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value) || 0;
    const fieldName = e.target.name as keyof FeeData;
    const originalAmount = originalFees[fieldName];
    
    // Prevent increasing above original amount
    const finalValue = Math.min(newValue, originalAmount);
    
    onFeeChange({
      ...feeData,
      [fieldName]: finalValue
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Student Information */}
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Student Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            placeholder="Enter student's full name"
            required
          />
        </div>

        <div>
          <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-2">
            Class/Grade
          </label>
          <input
            type="text"
            id="class"
            name="class"
            value={formData.class}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            placeholder="e.g., Grade 10, Class XII"
            required
          />
        </div>

        <div>
          <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700 mb-2">
            Roll Number
          </label>
          <input
            type="text"
            id="rollNumber"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            placeholder="Enter roll number"
            required
          />
        </div>
      </div>

      {/* Fee Settings Toggle */}
      <div className="border-t pt-6">
        <button
          type="button"
          onClick={() => setShowFeeSettings(!showFeeSettings)}
          className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
        >
          {showFeeSettings ? 'Hide' : 'Show'} Fee Settings
        </button>
      </div>

      {/* Fee Settings */}
      {showFeeSettings && (
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg animate-fade-in">
          <h3 className="text-lg font-medium text-gray-900">Fee Components</h3>
          <p className="text-sm text-gray-600 mb-4">
            Note: You can only decrease fees from the original amount, not increase them.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Academic Fee ($) - Max: ${originalFees.academicFee}
              </label>
              <input
                type="number"
                name="academicFee"
                value={feeData.academicFee}
                onChange={handleFeeChange}
                min="0"
                max={originalFees.academicFee}
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Uniform Fee ($) - Max: ${originalFees.uniformFee}
              </label>
              <input
                type="number"
                name="uniformFee"
                value={feeData.uniformFee}
                onChange={handleFeeChange}
                min="0"
                max={originalFees.uniformFee}
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Book Fee ($) - Max: ${originalFees.bookFee}
              </label>
              <input
                type="number"
                name="bookFee"
                value={feeData.bookFee}
                onChange={handleFeeChange}
                min="0"
                max={originalFees.bookFee}
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Transport Fee ($) - Max: ${originalFees.transportFee}
              </label>
              <input
                type="number"
                name="transportFee"
                value={feeData.transportFee}
                onChange={handleFeeChange}
                min="0"
                max={originalFees.transportFee}
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lab Fee ($) - Max: ${originalFees.labFee}
              </label>
              <input
                type="number"
                name="labFee"
                value={feeData.labFee}
                onChange={handleFeeChange}
                min="0"
                max={originalFees.labFee}
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Miscellaneous ($) - Max: ${originalFees.miscellaneousFee}
              </label>
              <input
                type="number"
                name="miscellaneousFee"
                value={feeData.miscellaneousFee}
                onChange={handleFeeChange}
                min="0"
                max={originalFees.miscellaneousFee}
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg"
      >
        Generate Bill Preview
      </button>
    </form>
  );
};

export default BillForm;
