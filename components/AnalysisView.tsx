import React from 'react';
import { AnalysisResult, LifeEventPrediction } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { AlertTriangle, CheckCircle, TrendingUp, Zap } from 'lucide-react';

interface AnalysisViewProps {
  result: AnalysisResult;
}

const getImpactColor = (impact: string) => {
  switch (impact.toLowerCase()) {
    case 'high': return 'text-red-400 border-red-400/30 bg-red-400/10';
    case 'medium': return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
    case 'low': return 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10';
    default: return 'text-slate-400 border-slate-400/30 bg-slate-400/10';
  }
};

const getProbabilityColor = (prob: number) => {
  if (prob >= 80) return '#ef4444'; // Red-500
  if (prob >= 50) return '#f59e0b'; // Amber-500
  return '#10b981'; // Emerald-500
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 p-3 rounded shadow-xl text-xs">
        <p className="font-bold text-white mb-1">{label}</p>
        <p className="text-indigo-300">Probability: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

const AnalysisView: React.FC<AnalysisViewProps> = ({ result }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Overview Card */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <TrendingUp className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Subject Profile Overview</h3>
            <p className="text-slate-300 leading-relaxed">{result.overview}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Probability Chart */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Event Probability Forecast
          </h3>
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={result.predictions}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" />
                <YAxis 
                  dataKey="eventName" 
                  type="category" 
                  stroke="#f8fafc" 
                  width={100} 
                  tick={{fontSize: 12}} 
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="probability" radius={[0, 4, 4, 0]} barSize={20}>
                  {result.predictions.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getProbabilityColor(entry.probability)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Factors */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            Identified Risk Factors
          </h3>
          <ul className="space-y-3">
            {result.riskFactors.map((risk, idx) => (
              <li key={idx} className="flex items-start gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                <span className="w-2 h-2 mt-2 rounded-full bg-orange-500 shrink-0" />
                <span className="text-slate-300 text-sm">{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Detailed Predictions */}
      <h3 className="text-2xl font-bold text-white mt-8 mb-4">Detailed Prediction Analysis</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {result.predictions.map((pred, idx) => (
          <div key={idx} className="bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-indigo-500/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-lg text-white">{pred.eventName}</h4>
              <span className={`px-2 py-1 rounded text-xs font-medium border ${getImpactColor(pred.impactLevel)}`}>
                {pred.impactLevel} Impact
              </span>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
               <div className="flex-1 bg-slate-700 rounded-full h-2 overflow-hidden">
                 <div 
                    className="h-full rounded-full transition-all duration-1000" 
                    style={{ 
                      width: `${pred.probability}%`,
                      backgroundColor: getProbabilityColor(pred.probability)
                    }}
                 />
               </div>
               <span className="text-sm font-bold text-white w-10 text-right">{pred.probability}%</span>
            </div>

            <p className="text-sm text-slate-400 mb-3 line-clamp-3" title={pred.reasoning}>
              {pred.reasoning}
            </p>
            
            <div className="mt-auto pt-3 border-t border-slate-700 flex items-center justify-between text-xs text-slate-500">
              <span>Timeframe:</span>
              <span className="text-slate-300 font-medium">{pred.timeframe}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-xl p-6 border border-indigo-500/30 mt-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-indigo-400" />
          Strategic Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.recommendations.map((rec, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                {idx + 1}
              </div>
              <p className="text-indigo-100/80 text-sm">{rec}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisView;
