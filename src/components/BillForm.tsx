
import { useState } from 'react';
import { StudentData, FeeData } from '../pages/GenerateBill';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

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
    billType: 'basic-package'
  });

  const [showFeeSettings, setShowFeeSettings] = useState(false);

  // Class options in proper order
  const classOptions = [
    'Nursery',
    'LKG',
    'UKG',
    'Class 1',
    'Class 2',
    'Class 3',
    'Class 4',
    'Class 5',
    'Class 6',
    'Class 7',
    'Class 8',
    'Class 9',
    'Class 10'
  ];

  // Fee structure based on class
  const getClassBasedFees = (selectedClass: string): FeeData => {
    const feeStructures: { [key: string]: FeeData } = {
      'Nursery': {
        academicFee: 3000,
        uniformFee: 800,
        bookFee: 400,
        transportFee: 1000,
        labFee: 0,
        miscellaneousFee: 200,
        hostelFee: 1800,
        messFee: 1200
      },
      'LKG': {
        academicFee: 3200,
        uniformFee: 850,
        bookFee: 450,
        transportFee: 1000,
        labFee: 0,
        miscellaneousFee: 220,
        hostelFee: 1900,
        messFee: 1250
      },
      'UKG': {
        academicFee: 3500,
        uniformFee: 900,
        bookFee: 500,
        transportFee: 1100,
        labFee: 100,
        miscellaneousFee: 250,
        hostelFee: 2000,
        messFee: 1300
      },
      'Class 1': {
        academicFee: 4000,
        uniformFee: 1000,
        bookFee: 600,
        transportFee: 1200,
        labFee: 200,
        miscellaneousFee: 250,
        hostelFee: 2100,
        messFee: 1400
      },
      'Class 2': {
        academicFee: 4200,
        uniformFee: 1000,
        bookFee: 650,
        transportFee: 1200,
        labFee: 250,
        miscellaneousFee: 260,
        hostelFee: 2150,
        messFee: 1450
      },
      'Class 3': {
        academicFee: 4400,
        uniformFee: 1050,
        bookFee: 700,
        transportFee: 1300,
        labFee: 300,
        miscellaneousFee: 270,
        hostelFee: 2200,
        messFee: 1500
      },
      'Class 4': {
        academicFee: 4600,
        uniformFee: 1100,
        bookFee: 750,
        transportFee: 1300,
        labFee: 350,
        miscellaneousFee: 280,
        hostelFee: 2250,
        messFee: 1550
      },
      'Class 5': {
        academicFee: 4800,
        uniformFee: 1150,
        bookFee: 800,
        transportFee: 1400,
        labFee: 400,
        miscellaneousFee: 290,
        hostelFee: 2300,
        messFee: 1600
      },
      'Class 6': {
        academicFee: 5200,
        uniformFee: 1200,
        bookFee: 850,
        transportFee: 1500,
        labFee: 500,
        miscellaneousFee: 300,
        hostelFee: 2400,
        messFee: 1700
      },
      'Class 7': {
        academicFee: 5400,
        uniformFee: 1250,
        bookFee: 900,
        transportFee: 1500,
        labFee: 550,
        miscellaneousFee: 310,
        hostelFee: 2450,
        messFee: 1750
      },
      'Class 8': {
        academicFee: 5600,
        uniformFee: 1300,
        bookFee: 950,
        transportFee: 1600,
        labFee: 600,
        miscellaneousFee: 320,
        hostelFee: 2500,
        messFee: 1800
      },
      'Class 9': {
        academicFee: 6000,
        uniformFee: 1400,
        bookFee: 1000,
        transportFee: 1600,
        labFee: 700,
        miscellaneousFee: 350,
        hostelFee: 2600,
        messFee: 1900
      },
      'Class 10': {
        academicFee: 6500,
        uniformFee: 1500,
        bookFee: 1100,
        transportFee: 1700,
        labFee: 800,
        miscellaneousFee: 400,
        hostelFee: 2800,
        messFee: 2000
      }
    };

    return feeStructures[selectedClass] || feeStructures['Class 1'];
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

  const handleClassChange = (selectedClass: string) => {
    setFormData({
      ...formData,
      class: selectedClass
    });
    
    // Update fee structure based on selected class
    const newFeeStructure = getClassBasedFees(selectedClass);
    onFeeChange(newFeeStructure);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow letters and spaces
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setFormData({
      ...formData,
      name: value
    });
  };

  // Get original fees for the current class
  const getOriginalFees = () => {
    return formData.class ? getClassBasedFees(formData.class) : {
      academicFee: 5000,
      uniformFee: 1200,
      bookFee: 800,
      transportFee: 1500,
      labFee: 600,
      miscellaneousFee: 300,
      hostelFee: 2500,
      messFee: 1800
    };
  };

  const originalFees = getOriginalFees();

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
            onChange={handleNameChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            placeholder="Enter student's full name (letters only)"
            required
          />
        </div>

        <div>
          <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-2">
            Class/Grade
          </label>
          <Select value={formData.class} onValueChange={handleClassChange}>
            <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300">
              <SelectValue placeholder="Select class/grade" />
            </SelectTrigger>
            <SelectContent>
              {classOptions.map((classOption) => (
                <SelectItem key={classOption} value={classOption}>
                  {classOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
            {formData.class && (
              <span className="block mt-1 font-medium text-blue-600">
                Fee structure for {formData.class}
              </span>
            )}
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hostel Fee ($) - Max: ${originalFees.hostelFee}
              </label>
              <input
                type="number"
                name="hostelFee"
                value={feeData.hostelFee}
                onChange={handleFeeChange}
                min="0"
                max={originalFees.hostelFee}
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mess Fee ($) - Max: ${originalFees.messFee}
              </label>
              <input
                type="number"
                name="messFee"
                value={feeData.messFee}
                onChange={handleFeeChange}
                min="0"
                max={originalFees.messFee}
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
