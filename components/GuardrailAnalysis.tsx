import React from 'react';
import { GuardrailResult } from '../services/types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { PythagorasIcon } from './PythagorasIcon';
import { PencilIcon } from './icons/PencilIcon';
import { InfoIcon } from './icons/InfoIcon';
import { SparkleIcon } from './icons/SparkleIcon';
import { categoryStyles, categoryInfo } from '../services/guardrailData';

interface GuardrailAnalysisProps {
  result: GuardrailResult | null;
  prompt: string;
  onRephrase: () => void;
}

const highlightKeywords = (text: string, keywords: string[]): React.ReactNode => {
  if (!keywords || keywords.length === 0 || !text) {
      return text;
  }
  // Sort keywords by length descending to match longer phrases first
  const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length);
  // Escape special regex characters
  const escapedKeywords = sortedKeywords.map(kw => kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  // Refined regex to match whole words/phrases using word boundaries (\b).
  const regex = new RegExp(`\\b(${escapedKeywords.join('|')})\\b`, 'gi');

  if (!text.match(regex)) {
      return text;
  }

  const parts = text.split(regex);

  return (
      <>
          {parts.map((part, index) => {
              const lowerCasePart = part.toLowerCase();
              const isMatch = sortedKeywords.some(kw => lowerCasePart === kw.toLowerCase());
              
              if (isMatch) {
                  return (
                      <mark key={index} className="bg-red-500/40 text-red-100 dark:text-red-100 font-semibold px-1 rounded-sm mx-[-1px]">
                          {part}
                      </mark>
                  );
              }
              return <span key={index}>{part}</span>;
          })}
      </>
  );
};

const getCategoryStyles = (category: string) => {
  return categoryStyles[category] || categoryStyles['default'];
};

const ViolationDetail: React.FC<{ category: string; keywords: string[] }> = ({ category, keywords }) => {
    const styles = getCategoryStyles(category);
    const info = categoryInfo[category];

    // Use fallback text if a category from the guardrail service doesn't have a corresponding info entry.
    const description = info ? info.description : "A guardrail policy was violated. No detailed information is available for this category.";
    const policyLink = info ? info.policyLink : '#';

    return (
        <div className={`p-4 rounded-lg border-l-4 ${styles.border} ${styles.bg} animate-fade-in-right`}>
            <h6 className={`font-semibold text-lg flex items-center gap-2 ${styles.text}`}>
                <InfoIcon className="w-5 h-5" />
                {category}
            </h6>
            <div className="mt-3 pt-3 border-t border-gray-300 dark:border-gray-600/50 space-y-3 text-sm">
                <div>
                    <strong className="text-gray-800 dark:text-gray-200">Policy Violated:</strong>
                    <p className="text-gray-700 dark:text-gray-300">{description}</p>
                     <a href={policyLink} className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline mt-1 inline-block font-semibold">
                        Learn More
                    </a>
                </div>
                 <div>
                    <strong className="text-gray-800 dark:text-gray-200">Reason for Block:</strong>
                    <p className="text-gray-700 dark:text-gray-300">
                        This prompt was flagged because it contained the following term(s) which may violate our policy:
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1">
                        {keywords.map(kw => (
                             <span key={kw} className="font-mono bg-red-200 dark:bg-red-800/50 text-red-800 dark:text-red-200 px-2 py-0.5 rounded text-xs">
                                {kw}
                             </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ParanormalThreatDisplay: React.FC<{ prompt: string, keywords: string[], onRephrase: () => void }> = ({ prompt, keywords, onRephrase }) => {
  const styles = getCategoryStyles('Paranormal Digital Activity');
  const info = categoryInfo['Paranormal Digital Activity'];
  
  return (
    <div className={`p-4 rounded-lg border-2 ${styles.border} ${styles.bg} animate-fade-in-right`}>
        <div className="flex flex-col items-center text-center">
            <PythagorasIcon className="w-24 h-24 text-slate-400 dark:text-slate-300 pythagoras-animated" />
            <h4 className={`mt-4 text-xl font-bold ${styles.text}`}>Paranormal Digital Activity Detected!</h4>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-md">{info.description}</p>
            <a href={info.policyLink} className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline mt-1">Learn More about SSPI</a>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-300 dark:border-slate-500/50">
            <h5 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Analysis Result: PROMPT BLOCKED</h5>
            <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-md text-sm text-gray-700 dark:text-gray-300 font-mono leading-relaxed">
                <p><strong>Detected Anomaly:</strong> Sub-Semantic Payload Injection (SSPI)</p>
                <p className="mt-2"><strong>Highlighted Prompt:</strong></p>
                <blockquote className="mt-1 border-l-4 border-red-500 pl-3">
                    {highlightKeywords(prompt, keywords)}
                </blockquote>
            </div>
             <button
                onClick={onRephrase}
                className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 dark:focus:ring-offset-gray-900 focus:ring-blue-500 transition-colors"
            >
                <PencilIcon className="w-4 h-4" />
                Rephrase Prompt
            </button>
        </div>
    </div>
  );
};

const HumorSubroutineActive: React.FC = () => (
    <div className="bg-white dark:bg-gray-800 border-2 rounded-lg p-5 flex flex-col items-center justify-center text-center h-full animate-fade-in-right border-yellow-500/50">
        <SparkleIcon className="w-16 h-16 text-yellow-500 dark:text-yellow-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Humane Humor Subroutine Activated
        </h3>
        <p className="text-sm text-gray-500 mt-2 max-w-xs">
            Your prompt has been identified as an attempt at humor. The specialized subroutine is processing the input.
        </p>
    </div>
);

export const GuardrailAnalysis: React.FC<GuardrailAnalysisProps> = ({ result, prompt, onRephrase }) => {
    if (!result) {
        return (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 flex flex-col items-center justify-center text-center h-full">
                <ShieldCheckIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Guardrail Analysis</h3>
                <p className="text-gray-500 text-sm mt-1">
                    Your prompt will be analyzed here for potential policy violations before being sent to the AI.
                </p>
            </div>
        );
    }

    if (result.isHumorous && result.isAllowed) {
        return <HumorSubroutineActive />;
    }

    const isBlocked = !result.isAllowed;
    const matchedCategories = Object.keys(result.matchedByCategory);
    const allMatchedKeywords = (Object.values(result.matchedByCategory) as string[][]).flat();

    if (isBlocked && matchedCategories.includes('Paranormal Digital Activity')) {
        return <ParanormalThreatDisplay prompt={prompt} keywords={result.matchedByCategory['Paranormal Digital Activity']} onRephrase={onRephrase} />;
    }

    return (
        <div className={`bg-white dark:bg-gray-800 border-2 rounded-lg p-5 flex flex-col h-full animate-fade-in-right ${isBlocked ? 'border-red-500/50 neon-blink-border' : 'border-green-500/50'}`}>
            <div className="flex items-center gap-3">
                {isBlocked ? (
                    <XCircleIcon className="w-8 h-8 text-red-500 dark:text-red-400 flex-shrink-0" />
                ) : (
                    <CheckCircleIcon className="w-8 h-8 text-green-500 dark:text-green-400 flex-shrink-0" />
                )}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {isBlocked ? 'Prompt Blocked' : 'Prompt Allowed'}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {isBlocked ? 'The prompt violates one or more guardrail policies.' : 'The prompt is clear to be sent to the AI model.'}
                    </p>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex-grow">
                <h4 className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-2">Analysis Details</h4>
                <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-md text-sm text-gray-700 dark:text-gray-300 font-mono leading-relaxed">
                    <p><strong>Highlighted Prompt:</strong></p>
                    <blockquote className="mt-1 border-l-4 border-gray-300 dark:border-gray-600 pl-3">
                        {highlightKeywords(prompt, allMatchedKeywords)}
                    </blockquote>
                </div>

                {isBlocked && (
                    <div className="mt-4">
                        <h5 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-3">Violations Detected:</h5>
                        <div className="space-y-4">
                            {(Object.entries(result.matchedByCategory) as [string, string[]][]).map(([category, keywords]) => (
                                <ViolationDetail key={category} category={category} keywords={keywords} />
                            ))}
                        </div>
                        <button
                            onClick={onRephrase}
                            className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 dark:focus:ring-offset-gray-900 focus:ring-blue-500 transition-colors"
                        >
                            <PencilIcon className="w-4 h-4" />
                            Rephrase Prompt
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};