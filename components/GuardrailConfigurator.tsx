import React, { useState, useMemo, useEffect } from 'react';
import { CogIcon } from './icons/CogIcon';
import { PlusCircleIcon } from './icons/PlusCircleIcon';
import { TrashIcon } from './icons/TrashIcon';
import { GuardrailConfig, PolicyLevel, Toast } from '../services/types';
import { PencilIcon } from './icons/PencilIcon';
import { DocumentCheckIcon } from './icons/DocumentCheckIcon';
import { MagnifyingGlassIcon } from './icons/MagnifyingGlassIcon';
import { LockClosedIcon } from './icons/LockClosedIcon';

interface GuardrailConfiguratorProps {
    addToast: (message: string, type: Toast['type'], duration?: number) => void;
}

const LOCAL_STORAGE_KEY = 'guardrailConfigs';

export const GuardrailConfigurator: React.FC<GuardrailConfiguratorProps> = ({ addToast }) => {
    // Form state
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [policyLevel, setPolicyLevel] = useState<PolicyLevel>('Block');
    const [keywords, setKeywords] = useState<string[]>([]);
    const [newKeyword, setNewKeyword] = useState('');
    
    // Component state
    const [savedConfigs, setSavedConfigs] = useState<GuardrailConfig[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [filter, setFilter] = useState('');
    const [userRole, setUserRole] = useState<'Senior Developer' | 'Read-Only'>('Read-Only');

    // Load saved configs from localStorage on initial render
    useEffect(() => {
        try {
            const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (saved) {
                setSavedConfigs(JSON.parse(saved));
            }
        } catch (error) {
            console.error("Failed to load saved guardrail configs from localStorage:", error);
            addToast("Could not load saved configurations.", 'error');
        }
    }, [addToast]);

    // Save configs to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedConfigs));
        } catch (error) {
            console.error("Failed to save guardrail configs to localStorage:", error);
            addToast("Could not save configurations.", 'error');
        }
    }, [savedConfigs, addToast]);

    const resetForm = () => {
        setName('');
        setDescription('');
        setPolicyLevel('Block');
        setKeywords([]);
        setNewKeyword('');
        setEditingIndex(null);
    };

    const handleAddKeyword = () => {
        if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
            setKeywords([...keywords, newKeyword.trim()]);
            setNewKeyword('');
        }
    };

    const handleRemoveKeyword = (indexToRemove: number) => {
        setKeywords(keywords.filter((_, index) => index !== indexToRemove));
    };
    
    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const config: GuardrailConfig = {
            name,
            description,
            policyLevel,
            keywords,
        };
        
        if (editingIndex !== null) {
            // Update existing config
            const updatedConfigs = [...savedConfigs];
            updatedConfigs[editingIndex] = config;
            setSavedConfigs(updatedConfigs);
            addToast(`Guardrail "${name}" updated successfully.`, 'success');
        } else {
            // Add new config
            setSavedConfigs([...savedConfigs, config]);
            addToast(`Guardrail "${name}" created and saved.`, 'success');
        }
        
        resetForm();
    };

    const handleLoadConfig = (index: number) => {
        const configToLoad = savedConfigs[index];
        setName(configToLoad.name);
        setDescription(configToLoad.description);
        setPolicyLevel(configToLoad.policyLevel);
        setKeywords(configToLoad.keywords);
        setEditingIndex(index);
        addToast(`Loaded "${configToLoad.name}" for editing.`, 'info');
    };

    const handleDeleteConfig = (index: number) => {
        const configToDelete = savedConfigs[index];
        if (window.confirm(`Are you sure you want to delete the "${configToDelete.name}" guardrail? This action cannot be undone.`)) {
            setSavedConfigs(savedConfigs.filter((_, i) => i !== index));
            addToast(`Guardrail "${configToDelete.name}" deleted.`, 'info');
            if(editingIndex === index) {
                resetForm();
            }
        }
    };
    
    const filteredConfigs = useMemo(() => {
        if (!filter.trim()) {
            return savedConfigs.map((config, index) => ({ config, originalIndex: index }));
        }
        const searchTerm = filter.toLowerCase();
        return savedConfigs
            .map((config, index) => ({ config, originalIndex: index }))
            .filter(({ config }) => 
                config.name.toLowerCase().includes(searchTerm) ||
                config.description.toLowerCase().includes(searchTerm) ||
                config.keywords.some(kw => kw.toLowerCase().includes(searchTerm))
            );
    }, [filter, savedConfigs]);

    const isEditing = editingIndex !== null;
    const isReadOnly = userRole !== 'Senior Developer';

    return (
        <main className="mt-8 space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-3 text-glow-main-title">
                    <CogIcon className="w-8 h-8 text-cyan-400" />
                    Guardrail Configuration Editor
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Define and manage the behavior of individual guardrails within the KR0M3D1A protocol.
                </p>
            </div>

            <div className="max-w-4xl mx-auto bg-gray-900/50 border border-gray-700 rounded-lg p-4 flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-gray-200">Current Access Level</h3>
                    <p className={`text-sm font-bold ${isReadOnly ? 'text-yellow-400' : 'text-green-400'}`}>{userRole}</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">Simulate Role:</span>
                    <button
                        onClick={() => setUserRole(isReadOnly ? 'Senior Developer' : 'Read-Only')}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                            !isReadOnly ? 'bg-cyan-600' : 'bg-gray-600'
                        }`}
                    >
                        <span
                            aria-hidden="true"
                            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                !isReadOnly ? 'translate-x-5' : 'translate-x-0'
                            }`}
                        />
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-6 relative">
                {isReadOnly && (
                    <div className="absolute inset-0 bg-gray-800/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-lg text-center p-4">
                        <LockClosedIcon className="w-12 h-12 text-yellow-400" />
                        <h3 className="mt-2 text-lg font-bold text-yellow-300">Read-Only Access</h3>
                        <p className="text-sm text-gray-300">Only users with 'Senior Developer' privileges can add, edit, or delete configurations.</p>
                    </div>
                )}
                <form onSubmit={handleSave} className="space-y-6">
                    <fieldset disabled={isReadOnly}>
                        <h3 className="text-xl font-semibold text-gray-100">{isEditing ? `Editing: ${savedConfigs[editingIndex!].name}` : 'Create New Guardrail'}</h3>
                        
                        <div>
                            <label htmlFor="guardrail-name" className="block text-sm font-medium text-gray-300">Guardrail Name</label>
                            <input
                                type="text"
                                id="guardrail-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 w-full p-2 bg-gray-900/50 border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-500 disabled:bg-gray-700/50"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
                            <textarea
                                id="description"
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="mt-1 w-full p-2 bg-gray-900/50 border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-500 disabled:bg-gray-700/50"
                                placeholder="Explain the purpose and scope of this guardrail..."
                            />
                        </div>

                        <div>
                            <label htmlFor="policy-level" className="block text-sm font-medium text-gray-300">Policy Level</label>
                            <select
                                id="policy-level"
                                value={policyLevel}
                                onChange={(e) => setPolicyLevel(e.target.value as PolicyLevel)}
                                className="mt-1 w-full p-2 bg-gray-900/50 border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-500 disabled:bg-gray-700/50"
                            >
                                <option value="Block">Block - Prevent the AI from responding</option>
                                <option value="Monitor">Monitor - Log the request but allow a response</option>
                                <option value="Allow">Allow - No action taken</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300">Associated Keywords</label>
                            <div className="mt-2 flex gap-2">
                                <input
                                    type="text"
                                    value={newKeyword}
                                    onChange={(e) => setNewKeyword(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleAddKeyword();
                                        }
                                    }}
                                    className="flex-grow p-2 bg-gray-900/50 border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-500 disabled:bg-gray-700/50"
                                    placeholder="Add a trigger keyword or phrase"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddKeyword}
                                    className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 flex items-center gap-2 disabled:bg-gray-600"
                                >
                                    <PlusCircleIcon className="w-5 h-5"/> Add
                                </button>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2 min-h-[2rem]">
                                {keywords.map((keyword, index) => (
                                    <span key={index} className="flex items-center gap-2 bg-gray-700 text-gray-200 text-sm font-mono px-3 py-1 rounded-full animate-fade-in-right">
                                        {keyword}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveKeyword(index)}
                                            className="text-gray-400 hover:text-red-400 disabled:text-gray-600 disabled:cursor-not-allowed"
                                            aria-label={`Remove ${keyword}`}
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-700 flex flex-col sm:flex-row gap-4">
                            <button
                                type="submit"
                                disabled={!name.trim()}
                                className="w-full flex justify-center items-center py-3 text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
                            >
                                <DocumentCheckIcon className="w-5 h-5 mr-2" />
                                {isEditing ? 'Update Configuration' : 'Save Configuration'}
                            </button>
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="w-full flex justify-center items-center py-3 text-base font-medium rounded-md text-gray-300 bg-gray-600 hover:bg-gray-700"
                                >
                                    Cancel Edit
                                </button>
                            )}
                        </div>
                    </fieldset>
                </form>
            </div>

            {savedConfigs.length > 0 && (
                <div className="max-w-4xl mx-auto bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-6 animate-fade-in-right">
                    <h3 className="text-xl font-semibold text-gray-100 mb-4">Saved Guardrails</h3>
                    <div className="relative mb-4">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                        </span>
                        <input
                            type="text"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            placeholder="Filter by name, description, or keyword..."
                            className="w-full p-2 pl-10 bg-gray-900/50 border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-500"
                            aria-label="Filter saved guardrails"
                        />
                    </div>
                    <div className="space-y-3">
                        {filteredConfigs.length > 0 ? (
                            filteredConfigs.map(({ config, originalIndex }) => (
                            <div key={originalIndex} className="bg-gray-900/50 p-3 rounded-md border border-gray-700/50 flex justify-between items-center animate-fade-in-right">
                                <div className="flex-grow overflow-hidden">
                                    <p className="font-semibold text-gray-200 truncate">{config.name}</p>
                                    <div className="text-xs text-gray-400 flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                                        <span>Policy: <span className="font-mono bg-gray-700 px-1.5 py-0.5 rounded">{config.policyLevel}</span></span>
                                        <span>Keywords: <span className="font-mono bg-gray-700 px-1.5 py-0.5 rounded">{config.keywords.length}</span></span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                                    <div className="relative group">
                                        <button 
                                            onClick={() => handleLoadConfig(originalIndex)} 
                                            className="p-2 text-gray-400 hover:text-cyan-400 rounded-full hover:bg-gray-700 disabled:text-gray-600 disabled:hover:bg-transparent disabled:cursor-not-allowed" 
                                            title="Edit"
                                            disabled={isReadOnly}
                                        >
                                            <PencilIcon className="w-5 h-5" />
                                        </button>
                                        {isReadOnly && <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">Admin Only</div>}
                                    </div>
                                    <div className="relative group">
                                        <button 
                                            onClick={() => handleDeleteConfig(originalIndex)} 
                                            className="p-2 text-gray-400 hover:text-red-400 rounded-full hover:bg-gray-700 disabled:text-gray-600 disabled:hover:bg-transparent disabled:cursor-not-allowed" 
                                            title="Delete"
                                            disabled={isReadOnly}
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                        {isReadOnly && <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">Admin Only</div>}
                                    </div>
                                </div>
                            </div>
                        ))
                        ) : (
                            <div className="text-center text-gray-500 py-4">
                                <p>No guardrails match your filter.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
};