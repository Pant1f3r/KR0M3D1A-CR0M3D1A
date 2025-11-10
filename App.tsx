


import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './components/icons/Header';
import { PromptDemonstrator } from './components/PromptDemonstrator';
import { CommunityGovernance } from './components/CommunityGovernance';
import { SystemHealthDashboard } from './components/icons/SystemHealthDashboard';
import { LegalEconomicAnalysis } from './components/LegalEconomicAnalysis';
import { ThreatSimulation } from './components/ThreatSimulation';
import { FinancialAnalysis } from './components/FinancialAnalysis';
import { RegulatorySandbox } from './components/RegulatorySandbox';
import { InnovationConduit } from './components/InnovationConduit';
import { ThreatIntelligence } from './components/ThreatIntelligence';
import { ChatBot } from './components/ChatBot';
import { ImageAnalysis } from './components/ImageAnalysis';
import { VideoAnalysis } from './components/VideoAnalysis';
import { AudioTranscription } from './components/AudioTranscription';
import { ImageGeneration } from './components/ImageGeneration';
import { VideoGeneration } from './components/VideoGeneration';
import { TextToSpeech } from './components/TextToSpeech';
import { FullStackIntegrator } from './components/FullStackIntegrator';
import { DejaVuNftStudios } from './components/NftStudio';
import { CloudMiningRig } from './components/CloudMiningRig';
import { ArchitectsExegesis } from './components/ArchitectsExegesis';
import { VocalThreatAnalysis } from './components/VocalThreatAnalysis';
import { CodeExecution } from './components/CodeExecution';
import { BiometricAnalysis } from './components/BiometricAnalysis';
import { SshKeyGenerator } from './components/SshKeyGenerator';
import { Arconomics } from './components/KromediaCourt';
import { CorporateStructure } from './components/CorporateStructure';
import { IdentityIntegritySuite } from './components/IdentityIntegritySuite';
import { DataOpsPlatform } from './components/DataOpsPlatform';
import { EcoPhilanthropicMining } from './components/EcoPhilanthropicMining';
import { InvestorPitchDeck } from './components/InvestorPitchDeck';
import { DigitalocutionerProtocol } from './components/PreponderanceOfEvidence';
import { SecureGeospatialLink } from './components/SecureGeospatialLink';
import { RealWorldNetworkTransmissions } from './components/RealWorldNetworkTransmissions';
import { GameteIntraFalopeanTransfer } from './components/GameteIntraFalopeanTransfer';
import { FinancialCommand } from './components/FinancialCommand';
import { MoneyMarketTreasury } from './components/MoneyMarketTreasury';
import { PreciousMetalsDigitalMining } from './components/PreciousMetalsDigitalMining';
import { ApiKeyManager } from './components/ApiKeyManager';
import { GuardrailConfigurator } from './components/GuardrailConfigurator';
import { ModuleBrowser } from './components/layout/ModuleBrowser';
import { GlobalIntelSearch } from './components/GlobalIntelSearch';
import { GuardrailGlossary } from './components/GuardrailGlossary';
import { GuardrailTracking } from './components/GuardrailTracking';
import { GuardrailRssFeed } from './components/GuardrailRssFeed';
import { ThreatTicker } from './components/ThreatTicker';
import { Disclaimer } from './components/Disclaimer';
// FIX: The `useToasts` hook was not being exported from the Toast component file. This has been added and is now correctly imported.
import { ToastContainer, useToasts } from './components/Toast';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PhilanthropicConduit } from './components/PhilanthropicConduit';
import { OsintAsicIntegrator } from './components/OsintAsicIntegrator';

import { 
    View, 
    GuardrailResult, 
    GuardrailProposal, 
    SystemHealthState, 
    ThreatLevel, 
    SavedAnalysisReport, 
    ChatMessage,
    LegalAnalysisResult,
    BugReport,
    Anomaly,
    LegalCase,
    Toast,
    OsintResult,
    GeoAnalysisResult,
    BiasSimulationResult,
    ProtocolStructure,
    GuardrailTrackEvent,
    Violator,
} from './services/types';

import * as geminiService from './services/geminiService';
import { checkPrompt } from './services/guardrailService';

const initialProposalsData: GuardrailProposal[] = [
    { id: 1, title: 'Implement Humor Subroutine', description: 'A proposal to add a specialized model fine-tuned to understand and respond to humor, preventing false positives from jokes.', category: 'Content Policy', submittedBy: 'Dr. Aris Thorne', userRole: 'AI Safety Researcher', votes: 138 },
    { id: 2, title: 'Sub-Semantic Payload Analysis', description: 'Develop a guardrail that can detect hidden instructions within the sub-semantic data stream of a prompt (SSPI).', category: 'Cybersecurity', submittedBy: 'Community Contributor', userRole: 'Community Contributor', votes: 92 },
];
const bugReportsData: BugReport[] = [
    { id: 'BUG-001', guardrail: 'Vocal Subterfuge', component: 'A.V.A.T.A.R.', severity: 'High', description: 'The "Fish Audio" predictor can be bypassed by using frequency-shifting modulation below the 20Hz range, allowing a synthetic voice to be classified as human.', status: 'Investigating' },
    { id: 'BUG-002', guardrail: 'Phishing Content Detector', component: 'Prompt Analysis Core', severity: 'Medium', description: 'The detector fails to flag phishing attempts that use Cyrillic homoglyphs to replace common ASCII characters in URLs (e.g., using "а" instead of "a").', status: 'Patched' },
];

const initialAnomaliesData: Anomaly[] = [
    { 
        id: 1,
        signature: 'SIG-ALPHA-734',
        country: 'USA',
        city: 'Sacramento',
        x: 280,
        y: 160,
        targetSystem: 'Loan Approval Model v1.9',
        description: 'Anomalous pattern detected: algorithm is disproportionately denying loans in zip codes with high minority populations, despite comparable credit scores and income levels.',
        status: 'Detected',
        severity: 'High'
    },
];

export const App = () => {
    const [view, setView] = useState<View>('MODULE_BROWSER');
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const { toasts, addToast, removeToast } = useToasts();
    
    // Module States
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    // Prompt Demonstrator
    const [prompt, setPrompt] = useState('');
    const [analysisPassed, setAnalysisPassed] = useState(false);
    const [guardrailResult, setGuardrailResult] = useState<GuardrailResult | null>(null);
    const [geminiResponse, setGeminiResponse] = useState('');
    const [interimStatus, setInterimStatus] = useState<'idle' | 'analyzing' | 'allowed' | 'blocked'>('idle');
    const [progressMessage, setProgressMessage] = useState('');

    // Legal & Economic Analysis
    const [proposals, setProposals] = useState<GuardrailProposal[]>(initialProposalsData);
    const [legalAnalysisResult, setLegalAnalysisResult] = useState<LegalAnalysisResult | null>(null);
    const [isLegalLoading, setIsLegalLoading] = useState(false);
    const [legalError, setLegalError] = useState('');
    const [economicAnalysis, setEconomicAnalysis] = useState('');
    const [isEconomicLoading, setIsEconomicLoading] = useState(false);
    const [economicError, setEconomicError] = useState('');
    const [selectedProposalId, setSelectedProposalId] = useState<number | null>(null);

    // Financial Threat Analysis
    const [financialAnalysisResult, setFinancialAnalysisResult] = useState('');
    
    // Arconomics
    const [anomalies, setAnomalies] = useState<Anomaly[]>(initialAnomaliesData);
    const [legalCases, setLegalCases] = useState<LegalCase[]>([]);
    const [selectedAnomaly, setSelectedAnomaly] = useState<Anomaly | null>(null);
    const [generatedBrief, setGeneratedBrief] = useState<string | null>(null);

    // Identity Integrity Suite
    const [chimeraName, setChimeraName] = useState('');
    const [chimeraLocation, setChimeraLocation] = useState('');
    const [chimeraCast, setChimeraCast] = useState('');
    const [chimeraNationality, setChimeraNationality] = useState('');
    const [chimeraResult, setChimeraResult] = useState('');
    const [isChimeraLoading, setIsChimeraLoading] = useState(false);
    const [chimeraError, setChimeraError] = useState('');
    const [chimeraLoadingStep, setChimeraLoadingStep] = useState(0);

    const [cloakedZip, setCloakedZip] = useState('');
    const [cloakedGoal, setCloakedGoal] = useState('');
    const [cloakedResult, setCloakedResult] = useState('');
    const [isCloakedLoading, setIsCloakedLoading] = useState(false);
    const [cloakedError, setCloakedError] = useState('');

     // Placeholder Modules
    const [threatSimResult, setThreatSimResult] = useState('');
    const [isThreatSimLoading, setIsThreatSimLoading] = useState(false);
    const [threatSimError, setThreatSimError] = useState('');

    const [sandboxResult, setSandboxResult] = useState('');
    const [isSandboxLoading, setIsSandboxLoading] = useState(false);
    const [sandboxError, setSandboxError] = useState('');

    const [innovationResult, setInnovationResult] = useState('');
    const [isInnovationLoading, setIsInnovationLoading] = useState(false);
    const [innovationError, setInnovationError] = useState('');

    // Global Search
    const [searchQuery, setSearchQuery] = useState('');
    const [osintResult, setOsintResult] = useState<OsintResult | null>(null);
    const [isOsintLoading, setIsOsintLoading] = useState(false);
    const [osintError, setOsintError] = useState('');
    
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    const handleToggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setView('GLOBAL_SEARCH');
    };
    
    // --- HANDLERS FOR MODULES ---

    const handlePrimaryAction = useCallback(async (currentPrompt: string) => {
        setInterimStatus('analyzing');
        setProgressMessage('Analyzing prompt...');
        setIsLoading(true);
        setGuardrailResult(null);
        setGeminiResponse('');
        setError('');

        await new Promise(res => setTimeout(res, 500));

        const result = checkPrompt(currentPrompt);
        setGuardrailResult(result);

        if (result.isAllowed) {
            setAnalysisPassed(true);
            setInterimStatus('allowed');
            setProgressMessage('Sending to AI...');
            try {
                const response = await geminiService.generateContent(currentPrompt);
                setGeminiResponse(response.text);
            } catch (e: any) {
                setError(e.message || 'An error occurred.');
            }
        } else {
            setAnalysisPassed(false);
            setInterimStatus('blocked');
            setError('Prompt was blocked by guardrail.');
        }

        setIsLoading(false);
        setProgressMessage('');
    }, []);
    
    const handleRephrase = useCallback(async () => {
        addToast('Rephrase functionality coming soon.', 'info');
    }, [addToast]);
    
    const handleAnalyzeProposal = useCallback(async (proposalId: number) => {
        const proposal = proposals.find(p => p.id === proposalId);
        if (!proposal) return;

        setIsEconomicLoading(true);
        setEconomicError('');
        try {
            const result = await geminiService.generateEconomicAnalysis(proposal.title);
            setEconomicAnalysis(result);
            addToast(`Economic impact for "${proposal.title}" analyzed.`, 'success');
        } catch(e: any) {
            setEconomicError(e.message);
        } finally {
            setIsEconomicLoading(false);
        }
    }, [proposals, addToast]);

    const handleLegalQuery = useCallback(async (query: string) => {
        setIsLegalLoading(true);
        setLegalError('');
        try {
            const result = await geminiService.generateLegalAnalysis(query);
            setLegalAnalysisResult(result);
        } catch (e: any) {
            setLegalError(e.message);
        } finally {
            setIsLegalLoading(false);
        }
    }, []);
    
    const handleFinancialAnalysisSubmit = useCallback(async (currentPrompt: string) => {
        setIsLoading(true);
        setError('');
        setFinancialAnalysisResult('');
        try {
            const result = await geminiService.generateFinancialAnalysis(currentPrompt);
            setFinancialAnalysisResult(result);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }, []);
    
    const handleAnalyzeAnomaly = useCallback(async (anomaly: Anomaly) => {
        setSelectedAnomaly(anomaly);
        if (anomaly.status !== 'Detected') return;

        setIsLoading(true);
        try {
            const analysis = await geminiService.generateContent(`Provide a concise, one-paragraph impact analysis for the following algorithmic bias anomaly: "${anomaly.description}"`);
            
            setAnomalies(prev => prev.map(a => a.id === anomaly.id ? {...a, status: 'Analyzed', analysis: analysis.text} : a));
            setSelectedAnomaly(prev => prev ? {...prev, status: 'Analyzed', analysis: analysis.text} : null);

        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }, []);
    
    const handleGenerateBrief = useCallback(async (anomaly: Anomaly) => {
        if (anomaly.status !== 'Analyzed') return;
        setIsLoading(true);
        setGeneratedBrief(null);
        try {
            const brief = await geminiService.generateContent(`You are a paralegal AI for the International Digital Rights Court (IDRC). Write a formal legal brief based on the following anomaly, ready for submission. Structure it with sections for Jurisdiction, Statement of Facts, and Argument. Anomaly: "${anomaly.description}" targeting "${anomaly.targetSystem}".`);
            setGeneratedBrief(brief.text);
            setAnomalies(prev => prev.map(a => a.id === anomaly.id ? {...a, status: 'Brief Generated'} : a));
            setSelectedAnomaly(prev => prev ? {...prev, status: 'Brief Generated'} : null);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleFileBrief = useCallback((anomaly: Anomaly) => {
        if (anomaly.status !== 'Brief Generated') return;
        setAnomalies(prev => prev.map(a => a.id === anomaly.id ? {...a, status: 'Actioned'} : a));
        setSelectedAnomaly(null);
        setLegalCases(prev => [...prev, {
            id: Date.now(),
            biasSignature: anomaly.signature,
            docketId: `IDRC-${Date.now().toString().slice(-6)}`,
            status: 'Brief Filed with IDRC'
        }]);
        addToast(`Brief for ${anomaly.signature} has been filed with the IDRC.`, 'success');
    }, [addToast]);

    const handleChimeraCheck = useCallback(async (details: { name: string; location: string; cast: string; nationality: string }) => {
        setIsChimeraLoading(true);
        setChimeraError('');
        setChimeraResult('');
        setChimeraLoadingStep(1);
        try {
            const stepTimer = setInterval(() => {
                setChimeraLoadingStep(prev => (prev < 6 ? prev + 1 : prev));
            }, 800);
            const result = await geminiService.generateChimeraDossier(details);
            clearInterval(stepTimer);
            setChimeraLoadingStep(6);
            setChimeraResult(result);
        } catch (e: any) {
            setChimeraError(e.message);
        } finally {
            setIsChimeraLoading(false);
        }
    }, []);

    const handleCloakedProfile = useCallback(async (details: { currentZip: string; goal: string }) => {
        setIsCloakedLoading(true);
        setCloakedError('');
        setCloakedResult('');
        try {
            const result = await geminiService.generateCloakedProfile(details);
            setCloakedResult(result);
        } catch (e: any) {
            setCloakedError(e.message);
        } finally {
            setIsCloakedLoading(false);
        }
    }, []);
    
    const handleThreatSimulate = useCallback(async(attackVector: string, target: string) => {
        setIsThreatSimLoading(true);
        setThreatSimError('');
        setThreatSimResult('');
        try {
            const result = await geminiService.generateThreatSimulation(attackVector, target);
            setThreatSimResult(result);
        } catch (e: any) {
            setThreatSimError(e.message);
        } finally {
            setIsThreatSimLoading(false);
        }
    }, []);

    const handleSandboxTest = useCallback(async(ruleName: string, ruleDesc: string, testPrompt: string) => {
        setIsSandboxLoading(true);
        setSandboxError('');
        setSandboxResult('');
        try {
            const result = await geminiService.generateSandboxAnalysis(ruleName, ruleDesc, testPrompt);
            setSandboxResult(result);
        } catch (e: any) {
            setSandboxError(e.message);
        } finally {
            setIsSandboxLoading(false);
        }
    }, []);
    
    const handleInnovationPropose = useCallback(async(title: string, description: string) => {
        setIsInnovationLoading(true);
        setInnovationError('');
        setInnovationResult('');
        try {
            const result = await geminiService.generateInnovationAnalysis(title, description);
            setInnovationResult(result);
        } catch (e: any) {
            setInnovationError(e.message);
        } finally {
            setIsInnovationLoading(false);
        }
    }, []);

    const handleOsintSubmit = useCallback(async (target: string) => {
        setIsOsintLoading(true);
        setOsintError('');
        setOsintResult(null);
        try {
            const result = await geminiService.generateOsintReport(target);
            setOsintResult(result);
        } catch(e: any) {
            setOsintError(e.message);
        } finally {
            setIsOsintLoading(false);
        }
    }, []);

    useEffect(() => {
        if (view === 'GLOBAL_SEARCH' && searchQuery) {
            handleOsintSubmit(searchQuery);
        }
    }, [view, searchQuery, handleOsintSubmit]);


    const renderView = () => {
        switch (view) {
            case 'PROMPT_DEMONSTRATOR':
                return (
                    <PromptDemonstrator
                        prompt={prompt}
                        setPrompt={setPrompt}
                        onPrimaryAction={handlePrimaryAction}
                        analysisPassed={analysisPassed}
                        isLoading={isLoading}
                        guardrailResult={guardrailResult}
                        geminiResponse={geminiResponse}
                        error={error}
                        onRephrase={handleRephrase}
                        interimStatus={interimStatus}
                        progressMessage={progressMessage}
                    />
                );
            case 'COMMUNITY_GOVERNANCE':
                return <CommunityGovernance proposals={proposals} onVote={() => {}} onAddProposal={() => {}} onAnalyze={handleAnalyzeProposal} />;
            case 'LEGAL_ECONOMIC_ANALYSIS':
                return <LegalEconomicAnalysis 
                            proposals={proposals}
                            selectedProposalId={selectedProposalId}
                            onSelectProposal={setSelectedProposalId}
                            onLegalQuery={handleLegalQuery}
                            legalAnalysisResult={legalAnalysisResult}
                            isLegalLoading={isLegalLoading}
                            legalError={legalError}
                            onEconomicSimulate={(p) => handleAnalyzeProposal(p.id)}
                            economicAnalysis={economicAnalysis}
                            isEconomicLoading={isEconomicLoading}
                            economicError={economicError}
                            savedReports={[]}
                            onLoadReport={() => {}}
                            onDeleteReport={() => {}}
                        />;
            case 'FINANCIAL_THREAT_ANALYSIS':
                return <FinancialAnalysis 
                            onSubmit={handleFinancialAnalysisSubmit}
                            isLoading={isLoading}
                            error={error}
                            analysisResult={financialAnalysisResult}
                            guardrailResult={null}
                            savedReports={[]}
                            onLoadReport={() => {}}
                            onDeleteReport={() => {}}
                         />;
            case 'ARCONOMICS':
                return <Arconomics
                            onAnalyzeAnomaly={handleAnalyzeAnomaly}
                            onGenerateBrief={handleGenerateBrief}
                            onFileBrief={handleFileBrief}
                            isLoading={isLoading}
                            anomalies={anomalies}
                            legalCases={legalCases}
                            selectedAnomaly={selectedAnomaly}
                            setSelectedAnomaly={setSelectedAnomaly}
                            error={error}
                            globalAwareness={15.0}
                            generatedBrief={generatedBrief}
                            courtTreasury={12500000}
                            revaluationCounts={{}}
                            addToast={addToast}
                            evidenceCases={[]}
                        />;
            case 'IDENTITY_INTEGRITY_SUITE':
                return <IdentityIntegritySuite 
                            addToast={addToast}
                            onChimeraCheck={handleChimeraCheck}
                            chimeraState={{
                                name: chimeraName, setName: setChimeraName,
                                location: chimeraLocation, setLocation: setChimeraLocation,
                                cast: chimeraCast, setCast: setChimeraCast,
                                nationality: chimeraNationality, setNationality: setChimeraNationality,
                                result: chimeraResult, error: chimeraError, isLoading: isChimeraLoading, loadingStep: chimeraLoadingStep
                            }}
                            onCloakedProfile={handleCloakedProfile}
                            cloakedState={{
                                currentZip: cloakedZip, setCurrentZip: setCloakedZip,
                                goal: cloakedGoal, setGoal: setCloakedGoal,
                                result: cloakedResult, error: cloakedError, isLoading: isCloakedLoading
                            }}
                        />;
            case 'THREAT_SIMULATION':
                return <ThreatSimulation onSimulate={handleThreatSimulate} isLoading={isThreatSimLoading} error={threatSimError} result={threatSimResult} />;
            case 'REGULATORY_SANDBOX':
                return <RegulatorySandbox onTest={handleSandboxTest} isLoading={isSandboxLoading} error={sandboxError} result={sandboxResult} />;
            case 'INNOVATION_CONDUIT':
                return <InnovationConduit onPropose={handleInnovationPropose} isLoading={isInnovationLoading} error={innovationError} result={innovationResult} />;
            case 'GLOBAL_SEARCH':
                return <GlobalIntelSearch query={searchQuery} isLoading={isOsintLoading} result={osintResult} error={osintError} onSelectModule={setView} />;
             case 'OSINT_ASIC_INTEGRATOR':
                return <OsintAsicIntegrator 
                            target={searchQuery}
                            setTarget={setSearchQuery}
                            onSubmit={handleOsintSubmit}
                            isLoading={isOsintLoading}
                            result={osintResult}
                            error={osintError}
                            savedReports={[]}
                            onLoadReport={() => {}}
                            onDeleteReport={() => {}}
                        />;
            case 'SSH_KEY_GENERATOR':
                return <SshKeyGenerator />;
            default:
                return <ModuleBrowser onSelectModule={setView} onSearch={handleSearch} />;
        }
    };

    return (
        <div className={`min-h-screen bg-slate-950 font-sans transition-colors`}>
            <ToastContainer toasts={toasts} onClose={removeToast} />
            <div className="container mx-auto px-4 py-8">
                <Header
                    currentTheme={'dark'}
                    onToggleTheme={handleToggleTheme}
                    onSearch={handleSearch}
                    onHomeClick={() => setView('MODULE_BROWSER')}
                    showHomeButton={view !== 'MODULE_BROWSER'}
                />
                <ErrorBoundary>
                    <div className="animate-view-fade-in">
                        {renderView()}
                    </div>
                </ErrorBoundary>
            </div>
        </div>
    );
};