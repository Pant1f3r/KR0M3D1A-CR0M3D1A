import React, { useMemo, useState, useEffect } from 'react';
import { OsintResult, Module, View } from '../services/types';
import { ALL_MODULES } from '../services/modules';
import { ChipIcon } from './icons/ChipIcon';
import { LinkIcon } from './icons/LinkIcon';
import { MagnifyingGlassIcon } from './icons/MagnifyingGlassIcon';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';
import { DashboardIcon } from './icons/DashboardIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface GlobalIntelSearchProps {
    query: string;
    isLoading: boolean;
    result: OsintResult | null;
    error: string;
    onSelectModule: (view: View) => void;
}

const LoadingAnimation: React.FC<{ query: string }> = ({ query }) => {
    const [step, setStep] = useState(0);
    const steps = [
        "Connecting to Global Intel Network...",
        "Querying Dark Web Archives (Simulated)...",
        "Cross-referencing with Arconomics Docket...",
        "Compiling & Brewing Dossier..."
    ];

    useEffect(() => {
        setStep(0); // Reset on new query
        const interval = setInterval(() => {
            setStep(prev => (prev < steps.length ? prev + 1 : prev));
        }, 1200); // Change step every 1.2s

        return () => clearInterval(interval);
    }, [query]);

    return (
        <div className="p-8 bg-gray-900/50 rounded-lg border border-gray-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-cyan opacity-10 z-0"></div>
            <div className="scanline" style={{animationDuration: '5s'}}></div>

            <div className="relative z-10">
                 <p className="font-mono text-cyan-300 text-lg text-flicker">[ ASIC-7: GATHERING INTEL ]</p>
                 <p className="text-sm text-gray-500">Query: <span className="font-bold text-gray-400">{query}</span></p>

                <div className="mt-6 space-y-3 font-mono text-sm">
                    {steps.map((msg, index) => {
                        const isCompleted = step > index + 1;
                        const isCurrent = step === index + 1;

                        return (
                            <div key={index} className={`flex items-center gap-3 transition-colors duration-300 ${
                                isCompleted ? 'text-gray-500' : isCurrent ? 'text-cyan-300' : 'text-gray-600'
                            }`}>
                                <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                                    {isCompleted ? <CheckCircleIcon className="w-5 h-5 text-green-400" /> :
                                     isCurrent ? <div className="w-4 h-4 border-2 border-t-cyan-400 border-gray-600 rounded-full animate-spin"></div> :
                                     <div className="w-2 h-2 bg-gray-600 rounded-full"></div>}
                                </div>
                                <span>{msg}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};


const ResultParser: React.FC<{ text: string }> = ({ text }) => {
    // Enhanced parser for the new dossier format
    const sections = text.split('### ').filter(s => s.trim());

    return (
        <div className="space-y-6 font-mono">
            {sections.map((section, index) => {
                const lines = section.split('\n').filter(l => l.trim());
                if (lines.length === 0) return null;

                const title = lines.shift()?.trim() || 'Untitled Section';
                const content = lines;

                // Special handling for Threat Assessment
                if (title.toUpperCase().includes('THREAT ASSESSMENT')) {
                    const levelMatch = content.join('\n').match(/threat level:\s*(nominal|guarded|elevated|critical)/i);
                    const level = levelMatch ? levelMatch[1].toUpperCase() : 'UNKNOWN';
                    
                    const levelStyles: { [key: string]: { color: string; border: string } } = {
                        NOMINAL: { color: 'text-cyan-400', border: 'border-cyan-500' },
                        GUARDED: { color: 'text-yellow-400', border: 'border-yellow-500' },
                        ELEVATED: { color: 'text-orange-400', border: 'border-orange-500' },
                        CRITICAL: { color: 'text-red-400', border: 'border-red-500 threatscape-glitch' },
                        UNKNOWN: { color: 'text-gray-500', border: 'border-gray-600' },
                    };
                    const style = levelStyles[level as keyof typeof levelStyles] || levelStyles.UNKNOWN;

                    return (
                        <div key={index} className="p-4 border border-gray-700 rounded-lg bg-gray-900/50">
                            <h3 className="text-lg font-bold text-cyan-400 mb-3">{title}</h3>
                            <div className={`p-3 border-l-4 ${style.border} bg-black/30`}>
                                <p className="text-sm text-gray-300">{content.join('\n').replace(/threat level:.*$/i, '').trim()}</p>
                                <p className="mt-3 font-bold text-sm"><span className="text-gray-500">Calculated Threat Level:</span> <span className={style.color}>{level}</span></p>
                            </div>
                        </div>
                    );
                }

                // Default section rendering
                return (
                    <div key={index} className="p-4 border border-gray-700 rounded-lg bg-gray-900/50">
                        <h3 className="text-lg font-bold text-cyan-400 mb-3">{title}</h3>
                        <ul className="space-y-2 list-disc list-inside text-gray-300 text-sm">
                            {content.map((item, itemIndex) => (
                                <li key={itemIndex}>{item.replace(/^(\* |- )/, '').trim()}</li>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};

const ModuleCard: React.FC<{ module: Module, onSelect: () => void }> = ({ module, onSelect }) => {
    const Icon = module.icon;
    return (
        <button
            onClick={onSelect}
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-left w-full h-full flex flex-col hover:bg-gray-700/50 hover:border-cyan-500/50 transition-all duration-200 group"
        >
            <div className="flex items-center gap-3">
                <div className="bg-gray-900/50 p-2 rounded-lg border border-gray-600 group-hover:border-cyan-500">
                    <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-base font-bold text-gray-100 group-hover:text-cyan-300">{module.name}</h3>
            </div>
            <p className="mt-3 text-xs text-gray-400 flex-grow">{module.description}</p>
        </button>
    );
};


export const GlobalIntelSearch: React.FC<GlobalIntelSearchProps> = ({
    query,
    isLoading,
    result,
    error,
    onSelectModule,
}) => {
    const filteredModules = useMemo(() => {
        if (!query.trim()) return [];
        const lowerCaseQuery = query.toLowerCase();
        return ALL_MODULES.filter(module =>
            module.name.toLowerCase().includes(lowerCaseQuery) ||
            module.description.toLowerCase().includes(lowerCaseQuery)
        );
    }, [query]);

    return (
        <main className="mt-8 space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-3 text-glow-main-title">
                    <MagnifyingGlassIcon className="w-8 h-8 text-cyan-400"/>
                    Global Intel Search
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-mono">
                    SEARCHING FOR: <strong className="text-cyan-400">{query}</strong>
                </p>
            </div>

            {/* Module Results */}
            {filteredModules.length > 0 && (
                <div className="animate-fade-in-right">
                    <h3 className="text-xl font-bold text-gray-100 mb-4 flex items-center gap-3">
                        <DashboardIcon className="w-6 h-6 text-purple-400"/>
                        Matching Modules
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredModules.map((module) => (
                            <ModuleCard key={module.id} module={module} onSelect={() => onSelectModule(module.id)} />
                        ))}
                    </div>
                </div>
            )}
            
            {filteredModules.length > 0 && <hr className="border-gray-700 animate-fade-in-right" />}

            {/* Data Results */}
            <div className="animate-fade-in-right">
                <h3 className="text-xl font-bold text-gray-100 mb-4 flex items-center gap-3">
                    <ChipIcon className="w-6 h-6 text-blue-400"/>
                    Global Intelligence Dossier
                </h3>
                {isLoading ? (
                    <LoadingAnimation query={query} />
                ) : error ? (
                    <div className="bg-red-900/20 border-l-4 border-red-500 text-red-300 p-4" role="alert">
                        <p className="font-bold">INTEL GATHERING FAILED</p>
                        <p>{error}</p>
                    </div>
                ) : result ? (
                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg shadow-inner p-6 space-y-6">
                        <ResultParser text={result.analysis} />
                        {result.sources.length > 0 && (
                            <div className="pt-6 border-t border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-200 mb-3 font-mono">// DATA SOURCE LOG</h3>
                                <div className="space-y-2">
                                    {result.sources.map((source, index) => (
                                        <a
                                            key={index}
                                            href={source.uri}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-md border border-gray-700/50 hover:bg-gray-700/50 transition-colors"
                                        >
                                            <LinkIcon className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-blue-300 font-semibold">{source.title}</p>
                                                <p className="text-xs text-gray-500 truncate">{source.uri}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500 bg-gray-900/50 rounded-lg border border-gray-700/50">
                        <p>No OSINT data found for "{query}".</p>
                    </div>
                )}
            </div>

            {filteredModules.length === 0 && !isLoading && !result && !error && (
                <div className="text-center py-16 text-gray-500 animate-fade-in-right">
                    <p>No modules or data found matching your query.</p>
                </div>
            )}
        </main>
    );
};