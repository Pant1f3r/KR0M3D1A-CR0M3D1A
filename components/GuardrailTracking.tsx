import React, { useState, useMemo } from 'react';
import { GuardrailTrackEvent } from '../services/types';
import { EyeIcon } from './icons/EyeIcon';
import { MagnifyingGlassIcon } from './icons/MagnifyingGlassIcon';
import { availableCategories } from '../services/guardrailData';

interface GuardrailTrackingProps {
    events: GuardrailTrackEvent[];
}

const SeverityBadge: React.FC<{ severity: GuardrailTrackEvent['severity'] }> = ({ severity }) => {
    const styles = {
        Critical: 'bg-red-600 text-red-100',
        High: 'bg-orange-500 text-orange-100',
        Medium: 'bg-yellow-500 text-yellow-100',
        Low: 'bg-green-500 text-green-100',
    };
    return <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${styles[severity]}`}>{severity}</span>;
};

const OutcomeBadge: React.FC<{ outcome: GuardrailTrackEvent['outcome'] }> = ({ outcome }) => {
    const styles = {
        Blocked: 'bg-red-500/20 text-red-300',
        Monitored: 'bg-yellow-500/20 text-yellow-300',
    };
    return <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${styles[outcome]}`}>{outcome}</span>;
};

export const GuardrailTracking: React.FC<GuardrailTrackingProps> = ({ events }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [outcomeFilter, setOutcomeFilter] = useState<'All' | 'Blocked' | 'Monitored'>('All');

    const uniqueCategories = useMemo(() => {
        const cats = new Set(events.map(e => e.guardrail));
        return ['All', ...Array.from(cats)];
    }, [events]);

    const filteredEvents = useMemo(() => {
        return events.filter(event => {
            const searchMatch = !searchTerm || event.promptSnippet.toLowerCase().includes(searchTerm.toLowerCase());
            const categoryMatch = categoryFilter === 'All' || event.guardrail === categoryFilter;
            const outcomeMatch = outcomeFilter === 'All' || event.outcome === outcomeFilter;
            return searchMatch && categoryMatch && outcomeMatch;
        });
    }, [events, searchTerm, categoryFilter, outcomeFilter]);

    return (
        <main className="mt-8 space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-3 text-glow-main-title">
                    <EyeIcon className="w-8 h-8 text-cyan-400" />
                    Guardrail Activation Log
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    A historical log of all guardrail activations across the KR0M3D1A protocol. Analyze trends, review triggered prompts, and monitor system resiliency.
                </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {/* Search Filter */}
                    <div className="relative md:col-span-2">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                        </span>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by prompt content..."
                            className="w-full p-2 pl-10 bg-gray-900/50 border border-gray-600 rounded-md"
                        />
                    </div>
                    {/* Category Filter */}
                    <div className="grid grid-cols-2 gap-4">
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="w-full p-2 bg-gray-900/50 border border-gray-600 rounded-md"
                        >
                            {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                         {/* Outcome Filter */}
                        <select
                            value={outcomeFilter}
                            onChange={(e) => setOutcomeFilter(e.target.value as 'All' | 'Blocked' | 'Monitored')}
                            className="w-full p-2 bg-gray-900/50 border border-gray-600 rounded-md"
                        >
                            <option value="All">All Outcomes</option>
                            <option value="Blocked">Blocked</option>
                            <option value="Monitored">Monitored</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="text-xs text-gray-400 uppercase bg-gray-900/50">
                            <tr>
                                <th scope="col" className="px-4 py-3">Timestamp</th>
                                <th scope="col" className="px-4 py-3">Triggered Guardrail</th>
                                <th scope="col" className="px-4 py-3">Outcome</th>
                                <th scope="col" className="px-4 py-3">Severity</th>
                                <th scope="col" className="px-4 py-3">Prompt Snippet</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEvents.map(event => (
                                <tr key={event.id} className="border-b border-gray-700 hover:bg-gray-700/50 animate-fade-in-right">
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        {new Date(event.timestamp).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 font-semibold text-gray-200">
                                        {event.guardrail}
                                    </td>
                                    <td className="px-4 py-3">
                                        <OutcomeBadge outcome={event.outcome} />
                                    </td>
                                    <td className="px-4 py-3">
                                        <SeverityBadge severity={event.severity} />
                                    </td>
                                    <td className="px-4 py-3 font-mono text-gray-300">
                                        "{event.promptSnippet}"
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 {filteredEvents.length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                        <p>No log entries match the current filters.</p>
                    </div>
                )}
            </div>
        </main>
    );
};
