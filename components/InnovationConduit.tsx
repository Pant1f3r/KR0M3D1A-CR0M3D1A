
import React, { useState } from 'react';
import { BeakerIcon } from './icons/BeakerIcon';
import { LightBulbIcon } from './icons/LightBulbIcon';
import { BrainCircuitIcon } from './icons/BrainCircuitIcon';
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

interface InnovationConduitProps {
    onPropose: (title: string, description: string) => void;
    isLoading: boolean;
    error: string;
    result: string;
}

export const InnovationConduit: React.FC<InnovationConduitProps> = ({ onPropose, isLoading, error, result }) => {
    const [title, setTitle] = useState('Decentralized Identity via Biometric Hashing');
    const [description, setDescription] = useState('A proposal to develop a new protocol that converts biometric data (e.g., retinal scans) into a non-reversible cryptographic hash. This hash would act as a universal, secure, and private digital identifier, replacing traditional username/password systems and eliminating the need to store raw biometric data.');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onPropose(title, description);
    };

    return (
        <main className="mt-8 space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-3 text-glow-main-title">
                    <BeakerIcon className="w-8 h-8 text-purple-400" />
                    Frontier Innovation Conduit
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    A dedicated pipeline for scaffolding and integrating next-generation infrastructure protocols. Propose bleeding-edge technologies and receive an AI-generated feasibility analysis before assimilation into the core KR0M3D1A framework.
                </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-6">
                <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto">
                    <div>
                        <label htmlFor="proposal-title" className="block text-sm font-medium text-gray-300 flex items-center gap-2"><LightBulbIcon className="w-4 h-4" />Proposal Title</label>
                        <input
                            id="proposal-title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={isLoading}
                            className="mt-1 block w-full p-2 bg-gray-900/50 border-gray-600 rounded-md"
                        />
                    </div>
                     <div>
                        <label htmlFor="proposal-description" className="block text-sm font-medium text-gray-300">High-Level Description</label>
                        <textarea
                            id="proposal-description"
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={isLoading}
                            className="mt-1 block w-full p-2 bg-gray-900/50 border-gray-600 rounded-md"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading || !title.trim() || !description.trim()}
                        className="w-full flex justify-center items-center py-3 text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600"
                    >
                        <BrainCircuitIcon className="w-5 h-5 mr-2" />
                        {isLoading ? 'Analyzing...' : 'Generate Feasibility & Impact Analysis'}
                    </button>
                </form>
            </div>

            {(isLoading || error || result) && (
                 <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-6 animate-fade-in-right">
                    <h3 className="text-lg font-semibold text-gray-200 mb-3 flex items-center gap-2">
                        <BrainCircuitIcon className="w-6 h-6 text-purple-400" />
                        AI Feasibility Analysis
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
