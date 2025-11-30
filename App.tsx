import React, { useState } from 'react';
import InputForm from './components/InputForm';
import AnalysisView from './components/AnalysisView';
import { RegistryData, AnalysisResult } from './types';
import { analyzeRegistryData } from './services/geminiService';
import { Activity, Database, ShieldAlert, ArrowLeft } from 'lucide-react';

const App: React.FC = () => {
  const [data, setData] = useState<RegistryData | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async (inputData: RegistryData) => {
    setData(inputData);
    setIsLoading(true);
    setError(null);
    try {
      const analysis = await analyzeRegistryData(inputData);
      setResult(analysis);
    } catch (err) {
      setError("Failed to analyze data. Please ensure you have a valid API Key and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 p-6 flex flex-col shrink-0">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Database className="text-white w-6 h-6" />
          </div>
          <h1 className="font-bold text-xl tracking-tight text-white">LifePath<span className="text-indigo-400">AI</span></h1>
        </div>

        <nav className="space-y-2 flex-1">
          <button 
            onClick={handleReset}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${!result ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
          >
            <Activity className="w-5 h-5" />
            Registry Scan
          </button>
          <div className="px-4 py-3 text-slate-500 text-sm flex items-center gap-3 cursor-not-allowed opacity-50">
            <Database className="w-5 h-5" />
            Batch Processing
          </div>
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800">
           <div className="flex items-start gap-2 bg-indigo-900/20 p-3 rounded text-xs text-indigo-300">
             <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
             <p>This system uses AI for predictive modeling. Results are estimates based on provided registry parameters.</p>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Registry Analytics Dashboard</h2>
            <p className="text-slate-400 text-sm mt-1">
              {result ? 'Analysis Complete' : 'Awaiting Data Input'}
            </p>
          </div>
          {result && (
            <button 
              onClick={handleReset}
              className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              New Analysis
            </button>
          )}
        </header>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-lg mb-6 flex items-center gap-3">
             <ShieldAlert className="w-5 h-5" />
             {error}
          </div>
        )}

        <div className="max-w-6xl mx-auto">
          {!result ? (
            <div className="max-w-2xl mx-auto">
               <InputForm onSubmit={handleAnalysis} isLoading={isLoading} />
            </div>
          ) : (
            <AnalysisView result={result} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
