import React, { useState } from 'react';
import { 
  RegistryData, 
  EducationLevel, 
  MaritalStatus, 
  EmploymentStatus, 
  ResidenceType 
} from '../types';
import { Activity, Briefcase, Home, GraduationCap, DollarSign, Users, HeartPulse } from 'lucide-react';

interface InputFormProps {
  onSubmit: (data: RegistryData) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<RegistryData>({
    age: 30,
    gender: 'Female',
    education: EducationLevel.Bachelor,
    maritalStatus: MaritalStatus.Single,
    income: 55000,
    employmentStatus: EmploymentStatus.EmployedFullTime,
    residenceType: ResidenceType.Urban,
    yearsAtResidence: 2,
    healthCondition: '',
    dependents: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'income' || name === 'yearsAtResidence' || name === 'dependents'
        ? Number(value) 
        : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-500/20 rounded-lg">
          <Activity className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Registry Profile Input</h2>
          <p className="text-slate-400 text-sm">Enter subject details for analysis.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Demographics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-Binary">Non-Binary</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Section 2: Socioeconomic */}
        <div className="space-y-4 pt-4 border-t border-slate-700/50">
          <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> Socioeconomic
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Education</label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full pl-10 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  {Object.values(EducationLevel).map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Annual Income ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  type="number"
                  name="income"
                  value={formData.income}
                  onChange={handleChange}
                  className="w-full pl-10 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
             <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Employment</label>
              <select
                name="employmentStatus"
                value={formData.employmentStatus}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                {Object.values(EmploymentStatus).map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Household & Residence */}
        <div className="space-y-4 pt-4 border-t border-slate-700/50">
           <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
            <Home className="w-4 h-4" /> Household & Residence
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Marital Status</label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                {Object.values(MaritalStatus).map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
             <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Dependents</label>
              <div className="relative">
                <Users className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  type="number"
                  name="dependents"
                  value={formData.dependents}
                  onChange={handleChange}
                  min="0"
                  className="w-full pl-10 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Residence Type</label>
              <select
                name="residenceType"
                value={formData.residenceType}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                {Object.values(ResidenceType).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
             <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Years at Current Address</label>
              <input
                type="number"
                name="yearsAtResidence"
                value={formData.yearsAtResidence}
                onChange={handleChange}
                min="0"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Health */}
        <div className="space-y-4 pt-4 border-t border-slate-700/50">
           <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
            <HeartPulse className="w-4 h-4" /> Health & Wellbeing
          </h3>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Known Health Conditions (Optional)</label>
            <textarea
              name="healthCondition"
              value={formData.healthCondition}
              onChange={handleChange}
              placeholder="e.g., Diabetes, Hypertension, Smoker, none..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none h-20 resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 rounded-lg font-bold text-lg transition-all transform active:scale-[0.98] ${
            isLoading 
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing Registry Data...
            </span>
          ) : (
            'Run Predictive Analysis'
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
