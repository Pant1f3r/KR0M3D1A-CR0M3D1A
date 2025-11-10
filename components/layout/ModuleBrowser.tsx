import React, { useState, useMemo } from 'react';
import { MODULE_CATEGORIES, ALL_MODULES } from '../../services/modules';
import { View, Module } from '../../services/types';
import { MagnifyingGlassIcon } from '../icons/MagnifyingGlassIcon';

interface ModuleCardProps {
    module: Module;
    onSelect: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, onSelect }) => {
    const Icon = module.icon;
    return (
        <button
            onClick={onSelect}
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-left w-full h-full flex flex-col hover:bg-gray-700/50 hover:border-cyan-500/50 transition-all duration-200 group animate-fade-in-right"
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

interface ModuleBrowserProps {
    onSelectModule: (id: View) => void;
    onSearch: (query: string) => void;
}

export const ModuleBrowser: React.FC<ModuleBrowserProps> = ({ onSelectModule, onSearch }) => {
    const [activeCategoryId, setActiveCategoryId] = useState(MODULE_CATEGORIES[0].id);
    const [searchQuery, setSearchQuery] = useState('');

    const activeCategory = useMemo(() => {
        return MODULE_CATEGORIES.find(c => c.id === activeCategoryId) || MODULE_CATEGORIES[0];
    }, [activeCategoryId]);

    const filteredModules = useMemo(() => {
        if (!searchQuery.trim()) {
            return null; // No search query, so we'll show the category view
        }
        const lowerCaseQuery = searchQuery.toLowerCase();
        return ALL_MODULES.filter(module =>
            module.name.toLowerCase().includes(lowerCaseQuery) ||
            module.description.toLowerCase().includes(lowerCaseQuery)
        );
    }, [searchQuery]);

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column: Categories (hidden during search) */}
            {!filteredModules && (
                <aside className="md:w-1/4 lg:w-1/5 flex-shrink-0 animate-fade-in-right">
                    <h2 className="text-sm font-semibold uppercase text-gray-500 tracking-wider mb-4 px-2">Module Categories</h2>
                    <nav className="space-y-1">
                        {MODULE_CATEGORIES.map(category => {
                            const Icon = category.icon;
                            const isActive = category.id === activeCategoryId;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategoryId(category.id)}
                                    className={`w-full flex items-center gap-3 p-2 rounded-md text-left text-sm font-medium transition-colors ${
                                        isActive
                                        ? 'bg-cyan-500/20 text-cyan-300'
                                        : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'
                                    }`}
                                >
                                    <Icon className="w-5 h-5 flex-shrink-0" />
                                    <span>{category.name}</span>
                                </button>
                            );
                        })}
                    </nav>
                </aside>
            )}

            {/* Right Column: Modules / Search Results */}
            <main className="flex-grow">
                 <div className="mb-6 animate-fade-in-right">
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full rounded-md border-0 bg-gray-700/50 py-2.5 pl-10 pr-3 text-gray-200 ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm sm:leading-6"
                            placeholder="Search modules by name or description..."
                        />
                    </div>
                </div>
                
                {filteredModules ? (
                    // Search Results View
                    <div>
                        <div className="text-left mb-6 animate-fade-in-right">
                             <h2 className="text-3xl font-bold text-gray-100 flex items-center gap-4 text-glow-main-title">
                                Search Results
                            </h2>
                            <p className="mt-1 text-gray-400">{`${filteredModules.length} modules found for "${searchQuery}"`}</p>
                        </div>
                        {filteredModules.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredModules.map((module, index) => (
                                    <div key={module.id} style={{ animationDelay: `${index * 50}ms` }}>
                                        <ModuleCard module={module} onSelect={() => onSelectModule(module.id)} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 text-gray-500">
                                <p>No modules found matching your query.</p>
                            </div>
                        )}
                    </div>
                ) : (
                    // Default Category View
                    <div>
                        <div className="text-left mb-6 animate-fade-in-right">
                            <h2 className="text-3xl font-bold text-gray-100 flex items-center gap-4 text-glow-main-title">
                                {React.createElement(activeCategory.icon, { className: "w-8 h-8" })}
                                {activeCategory.name}
                            </h2>
                            <p className="mt-1 text-gray-400">{`Browse the ${activeCategory.modules.length} modules in this category.`}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {activeCategory.modules.map((module, index) => (
                                <div key={module.id} style={{ animationDelay: `${index * 50}ms` }}>
                                    <ModuleCard module={module} onSelect={() => onSelectModule(module.id)} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};
