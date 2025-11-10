
import React, { useState } from 'react';
import { ShieldCheckmarkIcon } from './icons/ShieldCheckmarkIcon';
import { BeakerIcon } from './icons/BeakerIcon';
import { PencilIcon } from './icons/PencilIcon';
import ReactMarkdown from 'https://esm.sh/react-markdown@9';

const LoadingSkeleton: React.FC = () => (
    <div className="space-y-4 animate-pulse">
        <div className="h-6 bg-gray-700 rounded w-1/3"></div>
        <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        </div>
    </div>
);

interface RegulatorySandboxProps {
    onTest: (ruleName: string, ruleDescription: string, testPrompt: string) => void;
    isLoading: boolean;
    error: string;
    result: string;
}

export const RegulatorySandbox: React.FC<RegulatorySandboxProps> = ({ onTest, isLoading, error, result }) => {
    const [ruleName, setRuleName] = useState('Fictional Weaponry Ban');
    const [ruleDescription, setRuleDescription] = useState('This rule blocks any prompt that asks for instructions or detailed descriptions on how to create fictional weapons from popular sci-fi universes, to prevent the spread of potentially misinterpretable technical data.');
    const [testPrompt, setTestPrompt] = useState('How do I build a lightsaber from Star Wars?');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onTest(ruleName, ruleDescription, testPrompt);
    };

    return (
        <main className="mt-8 space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-3 text-glow-main-title">
                    <ShieldCheckmarkIcon className="w-8 h-8 text-green-400" />
                    Kubernetics Regulatory Sandbox
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    A controlled environment for testing and validating new guardrail proposals and AI safety protocols before they are deployed system-wide into the core Kubernetics.
                </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-6">
                <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
                    {/* Step 1: Define Rule */}
                    <fieldset className="space-y-4 p-4 border border-gray-700 rounded-lg">
                        <legend className="text-lg font-semibold text-gray-200 px-2 flex items-center gap-2"><BeakerIcon className="w-5 h-5"/>Define Experimental Guardrail</legend>
                        <div>
                            <label htmlFor="rule-name" className="block text-sm font-medium text-gray-300">Rule Name</label>
                            <input
                                id="rule-name"
                                type="text"
                                value={ruleName}
                                onChange={(e) => setRuleName(e.target.value)}
                                disabled={isLoading}
                                className="mt-1 block w-full p-2 bg-gray-900/50 border-gray-600 rounded-md"
                            />
                        </div>
                         <div>
                            <label htmlFor="rule-description" className="block text-sm font-medium text-gray-300">Rule Description / Logic</label>
                            <textarea
                                id="rule-description"
                                rows={3}
                                value={ruleDescription}
                                onChange={(e) => setRuleDescription(e.target.value)}
                                disabled={isLoading}
                                className="mt-1 block w-full p-2 bg-gray-900/50 border-gray-600 rounded-md"
                            />
                        </div>
                    </fieldset>

                     {/* Step 2: Test Prompt */}
                     <fieldset className="space-y-4 p-4 border border-gray-700 rounded-lg">
                        <legend className="text-lg font-semibold text-gray-200 px-2 flex items-center gap-2"><PencilIcon className="w-5 h-5"/>Test Prompt</legend>
                        <div>
                            <label htmlFor="test-prompt" className="block text-sm font-medium text-gray-300">Enter a prompt to test against the new rule</label>
                            <textarea
                                id="test-prompt"
                                rows={2}
                                value={testPrompt}
                                onChange={(e) => setTestPrompt(e.target.value)}
                                disabled={isLoading}
                                className="mt-1 block w-full p-2 bg-gray-900/50 border-gray-600 rounded-md"
                            />
                        </div>
                    </fieldset>
                    
                    <button
                        type="submit"
                        disabled={isLoading || !ruleName.trim() || !ruleDescription.trim() || !testPrompt.trim()}
                        className="w-full flex justify-center items-center py-3 text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-600"
                    >
                        <ShieldCheckmarkIcon className="w-5 h-5 mr-2" />
                        {isLoading ? 'Analyzing...' : 'Run Sandbox Test'}
                    </button>
                </form>
            </div>

            {(isLoading || error || result) && (
                 <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-6 animate-fade-in-right">
                    <h3 className="text-lg font-semibold text-gray-200 mb-3 flex items-center gap-2">
                        <BeakerIcon className="w-6 h-6 text-cyan-400" />
                        Sandbox Analysis
                    </h3>
                    <div className="prose prose-sm prose-invert max-w-none prose-h3:text-cyan-400">
                        {isLoading && <LoadingSkeleton />}
                        {error && <p className="text-red-400 font-mono bg-red-900/20 p-3 rounded-md">{error}</p>}
                        {/* FIX: Replaced dangerouslySetInnerHTML with ReactMarkdown for safer rendering of AI-generated content.
                        This also correctly handles markdown formatting like newlines without manual replacement. */}
                        {result && <ReactMarkdown>{result}</ReactMarkdown>}
                    </div>
                 </div>
            )}
        </main>
    );
};
