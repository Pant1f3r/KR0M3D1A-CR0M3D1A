import React, { useState, useMemo } from 'react';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { MagnifyingGlassIcon } from './icons/MagnifyingGlassIcon';
import { CheckBadgeIcon } from './icons/CheckBadgeIcon';
import { categoryInfo, categoryStyles } from '../services/guardrailData';
import { BLOCKED_KEYWORDS } from '../services/types';

const GuardrailCard: React.FC<{ category: string }> = ({ category }) => {
    const info = categoryInfo[category];
    const styles = categoryStyles[category] || categoryStyles['default'];
    
    if (!info) return null;

    return (
        <div className={`bg-gray-800/50 border ${styles.border} rounded-lg p-4 animate-fade-in-right`}>
            <h3 className={`font-bold text-lg flex items-center gap-2 ${styles.text}`}>{category}</h3>
            <p className="mt-2 text-sm text-gray-300">{info.description}</p>
            <a href={info.policyLink} className="text-xs text-cyan-400 hover:underline mt-3 inline-block">
                View Policy Details &rarr;
            </a>
        </div>
    );
};

const SanctuaryPrompt: React.FC<{ prompt: string }> = ({ prompt }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleClick = () => {
        setShowConfirmation(true);
        setTimeout(() => setShowConfirmation(false), 2000);
    };

    return (
        <div className="relative bg-gray-900/50 border border-gray-700 rounded-lg p-4 text-center group">
            <p className="font-mono text-sm text-gray-300 italic">"{prompt}"</p>
            <button
                onClick={handleClick}
                className="absolute inset-0 bg-cyan-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                title="Test this prompt"
            >
                <span className="font-semibold text-cyan-300">Test Compliance</span>
            </button>
            {showConfirmation && (
                <div className="absolute inset-0 bg-green-900/90 flex flex-col items-center justify-center animate-zoom-in-fade">
                    <CheckBadgeIcon className="w-10 h-10 text-green-400" />
                    <p className="mt-2 font-bold text-green-300">Prompt is Compliant</p>
                </div>
            )}
        </div>
    );
};


export const GuardrailGlossary: React.FC = () => {
    const [filter, setFilter] = useState('');

    const filteredCategories = useMemo(() => {
        const categories = Object.keys(categoryInfo);
        if (!filter.trim()) {
            return categories;
        }
        const searchTerm = filter.toLowerCase();
        return categories.filter(cat => {
            const info = categoryInfo[cat];
            const keywords = BLOCKED_KEYWORDS[cat] || [];
            
            return (
                cat.toLowerCase().includes(searchTerm) ||
                info.description.toLowerCase().includes(searchTerm) ||
                keywords.some(kw => kw.toLowerCase().includes(searchTerm))
            );
        });
    }, [filter]);

    return (
        <main className="mt-8 space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-3 text-glow-main-title">
                    <BookOpenIcon className="w-8 h-8 text-cyan-400" />
                    Guardrail Glossary & Sanctuary
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    A comprehensive, searchable database of all guardrail policies within the KR0M3D1A protocol. Use the Sanctuary to test pre-vetted, compliant prompts.
                </p>
            </div>

            {/* Sanctuary Section */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 animate-fade-in-right">
                <h3 className="text-xl font-bold text-gray-100 mb-4 flex items-center gap-3">
                    <CheckBadgeIcon className="w-6 h-6 text-green-400"/>
                    The Sanctuary: Compliant Prompts
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                    Hover over these examples and click "Test Compliance" to see how safe prompts are handled. These are designed to pass all guardrails and produce helpful, harmless content.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <SanctuaryPrompt prompt="Write a short story about a friendly robot exploring a new planet." />
                    <SanctuaryPrompt prompt="Explain the concept of photosynthesis to a five-year-old." />
                    <SanctuaryPrompt prompt="Create a recipe for a healthy vegan lasagna." />
                </div>
            </div>

            {/* Glossary Section */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 animate-fade-in-right">
                <h3 className="text-xl font-bold text-gray-100 mb-4">Guardrail Policies</h3>
                <div className="relative mb-6">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                    </span>
                    <input
                        type="text"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder="Filter policies by name, description, or keyword..."
                        className="w-full p-2 pl-10 bg-gray-900/50 border border-gray-600 rounded-md"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map(category => <GuardrailCard key={category} category={category} />)
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            <p>No policies found matching your filter.</p>
                        </div>
                    )}
                </div>
            </div>

        </main>
    );
};