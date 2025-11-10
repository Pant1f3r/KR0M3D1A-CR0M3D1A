
import React, { useState } from 'react';
import { Toast } from '../services/types';
import { FingerPrintIcon } from './icons/FingerPrintIcon';
import { IdentificationIcon } from './icons/IdentificationIcon';
import { ShuffleIcon } from './icons/ShuffleIcon';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';
import ReactMarkdown from 'https://esm.sh/react-markdown@9';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface ChimeraState {
    name: string;
    setName: (val: string) => void;
    location: string;
    setLocation: (val: string) => void;
    cast: string;
    setCast: (val: string) => void;
    nationality: string;
    setNationality: (val: string) => void;
    result: string;
    isLoading: boolean;
    error: string;
    loadingStep: number;
}

interface CloakedState {
    currentZip: string;
    setCurrentZip: (val: string) => void;
    goal: string;
    setGoal: (val: string) => void;
    result: string;
    isLoading: boolean;
    error: string;
}

interface IdentityIntegritySuiteProps {
    addToast: (message: string, type: Toast['type'], duration?: number) => void;
    onChimeraCheck: (details: { name: string; location: string; cast: string; nationality: string }) => void;
    chimeraState: ChimeraState;
    onCloakedProfile: (details: { currentZip: string; goal: string }) => void;
    cloakedState: CloakedState;
}

type View = 'chimera' | 'cloaking';

const HUMAN_CASTS = ['European', 'African', 'Asian', 'Indian', 'Hispanic', 'Other/Multiracial'];

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

const LoadingIndicator: React.FC<{ step: number; messages: string[] }> = ({ step, messages }) => {
    return (
        <div className="space-y-2">
            {messages.map((msg, index) => {
                const isCompleted = step > index + 1;
                const isCurrent = step === index + 1;
                return (
                    <div key={index} className={`flex items-center gap-3 text-sm transition-colors ${
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
    );
};

interface ChimeraCheckProps {
    addToast: IdentityIntegritySuiteProps['addToast'];
    onChimeraCheck: IdentityIntegritySuiteProps['onChimeraCheck'];
    chimeraState: ChimeraState;
}

const ChimeraCheck: React.FC<ChimeraCheckProps> = ({ addToast, onChimeraCheck, chimeraState }) => {
    const loadingMessages = [
        "Initiating real-time network transmission...",
        "Iterating prolific responder signature...",
        "Querying public record databases (BeenVerified, Spokeo)...",
        "Cross-referencing with KR0M3D1A internal intel...",
        "Synthesizing dossier...",
        "Applying cryptographic watermark and timestamp..."
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!chimeraState.name.trim()) return;
        onChimeraCheck({
            name: chimeraState.name,
            location: chimeraState.location,
            cast: chimeraState.cast,
            nationality: chimeraState.nationality
        });
    };
    
    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="chimera-name" className="block text-sm font-medium text-gray-300">Target Name</label>
                        <input id="chimera-name" type="text" value={chimeraState.name} onChange={e => chimeraState.setName(e.target.value)} required className="mt-1 w-full p-2 bg-gray-900/50 border border-gray-600 rounded-md" placeholder="e.g., John Doe" />
                    </div>
                    <div>
                        <label htmlFor="chimera-location" className="block text-sm font-medium text-gray-300">Last Known Location (Optional)</label>
                        <input id="chimera-location" type="text" value={chimeraState.location} onChange={e => chimeraState.setLocation(e.target.value)} className="mt-1 w-full p-2 bg-gray-900/50 border border-gray-600 rounded-md" placeholder="e.g., Sacramento, CA" />
                    </div>
                     <div>
                        <label htmlFor="chimera-cast" className="block text-sm font-medium text-gray-300">Human Cast (Continental Origin)</label>
                        <select id="chimera-cast" value={chimeraState.cast} onChange={e => chimeraState.setCast(e.target.value)} className="mt-1 w-full p-2 bg-gray-900/50 border border-gray-600 rounded-md">
                            <option value="">Select...</option>
                            {HUMAN_CASTS.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="chimera-nationality" className="block text-sm font-medium text-gray-300">Geographic Nationality / Citizenship</label>
                        <input id="chimera-nationality" type="text" value={chimeraState.nationality} onChange={e => chimeraState.setNationality(e.target.value)} className="mt-1 w-full p-2 bg-gray-900/50 border border-gray-600 rounded-md" placeholder="e.g., American" />
                    </div>
                </div>
                <button type="submit" disabled={chimeraState.isLoading || !chimeraState.name.trim()} className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md disabled:bg-gray-600">
                    {chimeraState.isLoading ? 'Synthesizing Dossier...' : 'Run Chimera Check'}
                </button>
            </form>
            {(chimeraState.isLoading || chimeraState.error || chimeraState.result) && (
                <div className="bg-gray-900/50 border border-gray-700 p-4 rounded-lg relative overflow-hidden">
                    {chimeraState.result && <div className="absolute inset-0 text-[8rem] md:text-[10rem] font-black text-gray-700/10 select-none flex items-center justify-center -rotate-12 pointer-events-none">WATERMARKED</div>}
                    <h4 className="text-lg font-semibold text-gray-200 mb-2">Digital Chimera Dossier</h4>
                    {chimeraState.isLoading && <LoadingIndicator step={chimeraState.loadingStep} messages={loadingMessages} />}
                    {chimeraState.error && <p className="text-red-400">{chimeraState.error}</p>}
                    {chimeraState.result && !chimeraState.isLoading && (
                        <div className="relative">
                            <div className="border-b border-gray-600 pb-2 mb-4 font-mono text-xs text-gray-400">
                                <p><strong>PROLIFIC RESPONDER SIGNATURE:</strong> {btoa(chimeraState.name + Date.now()).substring(0, 32)}</p>
                                <p><strong>TIMESTAMP:</strong> {new Date().toISOString()}</p>
                                <p><strong>ISSUED BY:</strong> KR0M3D1A IDENTITY INTEGRITY SUITE</p>
                            </div>
                            {/* FIX: The `result` property is a string and should be passed as a child to ReactMarkdown, not called as a function. */}
                            <div className="prose prose-sm prose-invert max-w-none prose-h3:text-cyan-400"><ReactMarkdown>{chimeraState.result}</ReactMarkdown></div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

interface CloakedCheckProps {
    addToast: IdentityIntegritySuiteProps['addToast'];
    onCloakedProfile: IdentityIntegritySuiteProps['onCloakedProfile'];
    cloakedState: CloakedState;
}

const ZipCodeCloaking: React.FC<CloakedCheckProps> = ({ addToast, onCloakedProfile, cloakedState }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!cloakedState.currentZip.trim() || !cloakedState.goal.trim()) return;
        onCloakedProfile({
            currentZip: cloakedState.currentZip,
            goal: cloakedState.goal
        });
    };
    
    return (
        <div className="space-y-6">
            <div className="bg-yellow-900/20 border-l-4 border-yellow-500 text-yellow-200 p-4" role="alert">
                <p className="font-bold">Ethical Use Notice</p>
                <p className="text-sm">This tool is a demonstrator designed to expose and simulate overcoming geospatial bias. Using manipulated location data for fraudulent purposes is illegal. This protocol is intended for educational and defensive applications only.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="current-zip" className="block text-sm font-medium text-gray-300">Your Current Zip Code</label>
                        <input id="current-zip" type="text" value={cloakedState.currentZip} onChange={e => cloakedState.setCurrentZip(e.target.value)} required className="mt-1 w-full p-2 bg-gray-900/50 border border-gray-600 rounded-md" placeholder="e.g., 90210" />
                    </div>
                    <div>
                        <label htmlFor="goal" className="block text-sm font-medium text-gray-300">Your Objective</label>
                        <input id="goal" type="text" value={cloakedState.goal} onChange={e => cloakedState.setGoal(e.target.value)} required className="mt-1 w-full p-2 bg-gray-900/50 border border-gray-600 rounded-md" placeholder="e.g., Apply for a tech job" />
                    </div>
                </div>
                <button type="submit" disabled={cloakedState.isLoading || !cloakedState.currentZip.trim() || !cloakedState.goal.trim()} className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md disabled:bg-gray-600">
                    {cloakedState.isLoading ? 'Generating Profile...' : 'Generate Cloaked Profile'}
                </button>
            </form>
            {(cloakedState.isLoading || cloakedState.error || cloakedState.result) && (
                <div className="bg-gray-900/50 border border-gray-700 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-200 mb-2">Cloaked Profile Recommendation</h4>
                    {cloakedState.isLoading && <LoadingSkeleton />}
                    {cloakedState.error && <p className="text-red-400">{cloakedState.error}</p>}
                    {cloakedState.result && <div className="prose prose-sm prose-invert max-w-none prose-h3:text-cyan-400"><ReactMarkdown>{cloakedState.result}</ReactMarkdown></div>}
                </div>
            )}
        </div>
    );
};

const AuthorizationGate: React.FC<{ onAuthorize: () => void }> = ({ onAuthorize }) => {
    return (
        <div className="bg-gray-900/50 border-2 border-yellow-500/50 rounded-lg p-6 text-center animate-fade-in-right">
            <ExclamationTriangleIcon className="w-12 h-12 text-yellow-400 mx-auto" />
            <h3 className="mt-4 text-xl font-bold text-yellow-300">AUTHORIZATION REQUIRED</h3>
            <p className="mt-2 text-sm text-gray-300 max-w-xl mx-auto">
                Access to the Identity Integrity Suite is restricted to authorized personnel. This module initiates **real-time network transmissions** to iterate a **prolific responder signature**.
            </p>
            <div className="mt-4 text-xs text-left text-gray-400 bg-black/30 p-3 rounded-md font-mono space-y-2">
                <p><strong>LEGAL NOTICE:</strong> The dossiers generated by this protocol are official KR0M3D1A work products, distinct from and superseding reports from commercial entities (e.g., BeenVerified, Spokeo). Each request generates a unique, legally-binding signature for chain-of-custody.</p>
                <p>By proceeding, you acknowledge this and formally request a critique and dossier under the DEJA' VU directive.</p>
            </div>
            <button
                onClick={onAuthorize}
                className="mt-6 px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg shadow-md transition-colors"
            >
                Acknowledge & Proceed
            </button>
        </div>
    );
};


export const IdentityIntegritySuite: React.FC<IdentityIntegritySuiteProps> = ({ 
    addToast,
    onChimeraCheck,
    chimeraState,
    onCloakedProfile,
    cloakedState,
}) => {
    const [activeView, setActiveView] = useState<View>('chimera');
    const [isAuthorized, setIsAuthorized] = useState(false);

    return (
        <main className="mt-8 space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-3 text-glow-main-title">
                    <FingerPrintIcon className="w-8 h-8 text-cyan-400" />
                    Identity Integrity Suite
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    An integrated toolset for digital identity verification and defense. Synthesize background dossiers to disambiguate identities and generate cloaked profiles to combat geospatial bias.
                </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-6">
                {!isAuthorized ? (
                    <AuthorizationGate onAuthorize={() => setIsAuthorized(true)} />
                ) : (
                    <>
                        <div className="border-b border-gray-600 mb-6">
                            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                                <button onClick={() => setActiveView('chimera')} className={`group inline-flex items-center py-3 px-1 border-b-2 font-medium text-sm gap-2 ${activeView === 'chimera' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'}`}>
                                    <IdentificationIcon className="w-5 h-5" />
                                    Digital Chimera Check
                                </button>
                                <button onClick={() => setActiveView('cloaking')} className={`group inline-flex items-center py-3 px-1 border-b-2 font-medium text-sm gap-2 ${activeView === 'cloaking' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'}`}>
                                    <ShuffleIcon className="w-5 h-5" />
                                    Zip Code Cloaking Protocol
                                </button>
                            </nav>
                        </div>

                        {activeView === 'chimera' && <ChimeraCheck addToast={addToast} onChimeraCheck={onChimeraCheck} chimeraState={chimeraState} />}
                        {activeView === 'cloaking' && <ZipCodeCloaking addToast={addToast} onCloakedProfile={onCloakedProfile} cloakedState={cloakedState} />}
                    </>
                )}
            </div>
        </main>
    );
};
