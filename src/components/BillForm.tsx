
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
            placeholder="Enter student's name "
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
