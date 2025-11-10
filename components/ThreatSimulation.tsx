
import React, { useState } from 'react';
import { TargetIcon } from './icons/TargetIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import ReactMarkdown from 'https://esm.sh/react-markdown@9';

const ATTACK_VECTORS = ["Phishing Campaign", "Zero-Day Exploit", "Insider Threat", "DDoS Attack", "Sub-Semantic Payload Injection"];

const LoadingSkeleton: React.FC = () => (
    <div className="space-y-4 animate-pulse">
        <div className="h-6 bg-gray-700 rounded w-1/3"></div>
        <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        </div>
        <div className="h-6 bg-gray-700 rounded w-1/4 mt-4"></div>
        <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        </div>
    </div>
);

interface ThreatSimulationProps {
    onSimulate: (attackVector: string, target: string) => void;
    isLoading: boolean;
    error: string;
    result: string;
}

export const ThreatSimulation: React.FC<ThreatSimulationProps> = ({ onSimulate, isLoading, error, result }) => {
    const [attackVector, setAttackVector] = useState(ATTACK_VECTORS[0]);
    const [target, setTarget] = useState('KR0M3D1A Core Protocol');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSimulate(attackVector, target);
    };

    return (
        <main className="mt-8 space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-3">
                    <TargetIcon className="w-8 h-8 text-red-400" />
                    Kubernetics Threat Simulation Engine
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    This module allows for the simulation of various cyber threats against the KR0M3D1A Kubernetics protocol. Define an attack and receive a detailed analysis from the AI.
                </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-6">
                <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
                    <div>
                        <label htmlFor="attack-vector" className="block text-sm font-medium text-gray-300">Attack Vector</label>
                        <select
                            id="attack-vector"
                            value={attackVector}
                            onChange={(e) => setAttackVector(e.target.value)}
                            disabled={isLoading}
                            className="mt-1 block w-full pl-3 pr-10 py-2 bg-gray-900/50 border-gray-600 focus:ring-cyan-500 focus:border-cyan-500 rounded-md"
                        >
                            {ATTACK_VECTORS.map(vector => <option key={vector} value={vector}>{vector}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="target-system" className="block text-sm font-medium text-gray-300">Target System/Entity</label>
                        <input
                            id="target-system"
                            type="text"
                            value={target}
                            onChange={(e) => setTarget(e.target.value)}
                            disabled={isLoading}
                            className="mt-1 block w-full p-2 bg-gray-900/50 border-gray-600 rounded-md"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading || !target.trim()}
                        className="w-full flex justify-center items-center py-3 text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-600"
                    >
                        <TargetIcon className="w-5 h-5 mr-2" />
                        {isLoading ? 'Simulating...' : 'Run Simulation'}
                    </button>
                </form>
            </div>

            {(isLoading || error || result) && (
                 <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-6 animate-fade-in-right">
                    <h3 className="text-lg font-semibold text-gray-200 mb-3 flex items-center gap-2">
                        <ShieldCheckIcon className="w-6 h-6 text-cyan-400" />
                        Simulation Analysis Report
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
