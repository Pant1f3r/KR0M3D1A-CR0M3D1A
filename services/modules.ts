import React from 'react';
import { Module, ModuleCategory, View } from './types';
import { ShieldCheckIcon } from '../components/icons/ShieldCheckIcon';
import { UsersIcon } from '../components/icons/UsersIcon';
import { PulseIcon } from '../components/icons/PulseIcon';
import { ScaleIcon } from '../components/icons/ScaleIcon';
import { TargetIcon } from '../components/icons/TargetIcon';
import { ShieldCheckmarkIcon } from '../components/icons/ShieldCheckmarkIcon';
import { BeakerIcon } from '../components/icons/BeakerIcon';
import { BugIcon } from '../components/icons/BugIcon';
import { RobotIcon } from '../components/icons/RobotIcon';
import { PhotoIcon } from '../components/icons/PhotoIcon';
import { VideoCameraIcon } from '../components/icons/VideoCameraIcon';
import { MicrophoneIcon } from '../components/icons/MicrophoneIcon';
import { WandIcon } from '../components/icons/WandIcon';
import { FilmIcon } from '../components/icons/FilmIcon';
import { SpeakerWaveIcon } from '../components/icons/SpeakerWaveIcon';
import { CodeIcon } from '../components/icons/CodeIcon';
import { NftIcon } from '../components/icons/NftIcon';
import { BtcIcon } from '../components/icons/BtcIcon';
import { BrainCircuitIcon } from '../components/icons/BrainCircuitIcon';
import { SoundWaveIcon } from '../components/icons/SoundWaveIcon';
import { TerminalIcon } from '../components/icons/TerminalIcon';
import { DnaIcon } from '../components/icons/DnaIcon';
import { KeyIcon } from '../components/icons/KeyIcon';
import { CourtIcon } from '../components/icons/CourtIcon';
import { SitemapIcon } from '../components/icons/SitemapIcon';
import { FingerPrintIcon } from '../components/icons/FingerPrintIcon';
import { ServerStackIcon } from '../components/icons/ServerStackIcon';
import { HeartIcon } from '../components/icons/HeartIcon';
import { DocumentTextIcon } from '../components/icons/DocumentTextIcon';
import { GavelIcon } from '../components/icons/GavelIcon';
import { GlobeIcon } from '../components/icons/GlobeIcon';
import { ArrowsRightLeftIcon } from '../components/icons/ArrowsRightLeftIcon';
import { BanknotesIcon } from '../components/icons/BanknotesIcon';
import { BuildingLibraryIcon } from '../components/icons/BuildingLibraryIcon';
import { DiamondIcon } from '../components/icons/DiamondIcon';
import { CogIcon } from '../components/icons/CogIcon';
import { DashboardIcon } from '../components/icons/DashboardIcon';
import { MagnifyingGlassIcon } from '../components/icons/MagnifyingGlassIcon';
import { ChipIcon } from '../components/icons/ChipIcon';
import { BookOpenIcon } from '../components/icons/BookOpenIcon';
import { EyeIcon } from '../components/icons/EyeIcon';
import { HandshakeIcon } from '../components/icons/HandshakeIcon';

const FinancialCommandIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", ...props },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" }),
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" })
    )
);


const CORE_MODULES: Module[] = [
    { id: 'PROMPT_DEMONSTRATOR', name: 'Prompt Demonstrator', description: 'Test prompts against client-side guardrails and see AI responses.', icon: ShieldCheckIcon, category: 'CORE' },
    { id: 'COMMUNITY_GOVERNANCE', name: 'Community Governance', description: 'Review, vote on, and submit new proposals for AI guardrails.', icon: UsersIcon, category: 'CORE' },
    { id: 'SYSTEM_HEALTH', name: 'System Health Dashboard', description: 'Monitor the real-time health and status of the KR0M3D1A protocol.', icon: PulseIcon, category: 'CORE' },
    { id: 'MODULE_BROWSER', name: 'Module Browser', description: 'Explore all available modules within the KR0M3D1A protocol.', icon: DashboardIcon, category: 'CORE' },
    { id: 'GLOBAL_SEARCH', name: 'Global Intel Search', description: 'Conduct a global search across all protocol data sources.', icon: MagnifyingGlassIcon, category: 'CORE' },
    { id: 'GUARDRAIL_GLOSSARY', name: 'Guardrail Glossary', description: 'A comprehensive, searchable glossary of all guardrail policies and a sanctuary for safe prompt testing.', icon: BookOpenIcon, category: 'CORE'},
];

const LEGAL_MODULES: Module[] = [
    { id: 'LEGAL_ECONOMIC_ANALYSIS', name: 'Legal & Economic Analysis', description: 'Analyze proposals with the L.E.X. legal agent and E.C.H.O. economic model.', icon: ScaleIcon, category: 'LEGAL' },
    { id: 'ARCONOMICS', name: 'Arconomics: Algo-Bias Detector', description: 'The autonomous judicial arm for prosecuting digital bigotry and algorithmic disenfranchisement.', icon: CourtIcon, category: 'LEGAL' },
    { id: 'CORPORATE_STRUCTURE', name: 'Corporate Structure', description: 'View the legal entities and regulatory framework of KR0M3D1A CORP.', icon: SitemapIcon, category: 'LEGAL' },
    { id: 'DIGITALOCUTIONER', name: 'Digitalocutioner Protocol', description: 'The enforcement arm of the Arconomics court. Tracks violators, issues verdicts, and executes sanctions.', icon: GavelIcon, category: 'LEGAL' },
];

const FINANCIAL_MODULES: Module[] = [
    { id: 'FINANCIAL_THREAT_ANALYSIS', name: 'Financial Threat Analysis', description: 'Simulate digital threat assessments on financial entities using NεΩ AI.', icon: TargetIcon, category: 'FINANCIAL' },
    { id: 'CLOUD_MINING_RIG', name: 'Custodial Asset Recovery', description: 'The autonomous Bitcoin Bank protocol for recovering dormant assets.', icon: BtcIcon, category: 'FINANCIAL' },
    { id: 'ECO_PHILANTHROPIC', name: 'Eco-Philanthropic Mining', description: 'Carbon-negative mining operation funding global philanthropic efforts.', icon: HeartIcon, category: 'FINANCIAL' },
    { id: 'INVESTOR_PITCH', name: 'Investment Dossier', description: 'Confidential briefing on the operational framework and market viability of the DEJA\' VU directive.', icon: DocumentTextIcon, category: 'FINANCIAL' },
    { id: 'MONEY_MARKET', name: 'Money Market & Treasury', description: 'Hub for managing corporate assets and currency conversions.', icon: BuildingLibraryIcon, category: 'FINANCIAL' },
    { id: 'PRECIOUS_METALS', name: 'Digital Metals Mining', description: 'Subsidiary for liquidating gas fees to fund digital prospecting.', icon: DiamondIcon, category: 'FINANCIAL' },
    { id: 'GIFT_PROTOCOL', name: 'G.I.F.T. Protocol', description: 'Secure transfer of stock options for internal funding and efficacy.', icon: BanknotesIcon, category: 'FINANCIAL' },
    { id: 'FINANCIAL_COMMAND', name: 'Financial Command', description: 'Centralized command center for KR0M3D1A\'s Digital Banking Division.', icon: FinancialCommandIcon, category: 'FINANCIAL' },
    { id: 'PHILANTHROPIC_CONDUIT', name: 'Philanthropic Conduit', description: 'Facilitates legally-binding philanthropic contributions from partners to support the KR0M3D1A mission.', icon: HandshakeIcon, category: 'FINANCIAL' },
];

const SECURITY_MODULES: Module[] = [
    { id: 'THREAT_SIMULATION', name: 'Threat Simulation', description: 'Simulate cyber threats against the KR0M3D1A Kubernetics protocol.', icon: TargetIcon, category: 'SECURITY' },
    { id: 'THREAT_INTELLIGENCE', name: 'Threat Intelligence Codex', description: 'Live feed of identified system vulnerabilities and their mitigation status.', icon: BugIcon, category: 'SECURITY' },
    { id: 'VOCAL_THREAT_ANALYSIS', name: 'Vocal Threat Analysis (A.V.A.T.A.R.)', description: 'Analyze live audio to detect synthetic voices and sub-vocal anomalies.', icon: SoundWaveIcon, category: 'SECURITY' },
    { id: 'BIOMETRIC_ANALYSIS', name: 'Biometric Analysis (NEO)', description: 'Analyze biometric data streams to expose digital doppelgangers.', icon: DnaIcon, category: 'SECURITY' },
    { id: 'IDENTITY_INTEGRITY_SUITE', name: 'Identity Integrity Suite', description: 'Tools for digital identity verification and defense, including Chimera Check and Zip Code Cloaking.', icon: FingerPrintIcon, category: 'SECURITY' },
    { id: 'SECURE_GEOSPATIAL_LINK', name: 'Secure Geospatial Link (SGL)', description: 'Perform tactical analysis on points of interest via encrypted transmissions.', icon: GlobeIcon, category: 'SECURITY' },
    { id: 'ATD', name: 'Anti-Terrorism Defense (A.T.D.)', description: 'Live monitor for network transmissions of global policing data to find terrorist hot spots.', icon: ArrowsRightLeftIcon, category: 'SECURITY' },
    { id: 'OSINT_ASIC_INTEGRATOR', name: 'OSINT ASIC Integrator', description: 'Deploy a dedicated Open-Source Intelligence ASIC to gather and analyze public data.', icon: ChipIcon, category: 'SECURITY' },
    { id: 'GUARDRAIL_TRACKING', name: 'Guardrail Activation Log', description: 'View a historical log of all guardrail activations, outcomes, and threat severities.', icon: EyeIcon, category: 'SECURITY' },
];

const ENGINEERING_MODULES: Module[] = [
    { id: 'REGULATORY_SANDBOX', name: 'Regulatory Sandbox', description: 'A controlled environment for testing new guardrail proposals and AI safety protocols.', icon: ShieldCheckmarkIcon, category: 'ENGINEERING' },
    { id: 'INNOVATION_CONDUIT', name: 'Innovation Conduit', description: 'A pipeline for integrating next-generation infrastructure protocols.', icon: BeakerIcon, category: 'ENGINEERING' },
    { id: 'FULL_STACK_INTEGRATOR', name: 'Full-Stack Integrator', description: 'Generate production-ready code snippets using the KR0M3D1A AI.', icon: CodeIcon, category: 'ENGINEERING' },
    { id: 'CODE_EXECUTION', name: 'Execution Sandbox', description: 'Execute scripts against the KR0M3D1A core protocol in a sandboxed environment.', icon: TerminalIcon, category: 'ENGINEERING' },
    { id: 'SSH_KEY_GENERATOR', name: 'SSH Key Generator', description: 'Generate a new SSH key pair for secure access to protocol systems.', icon: KeyIcon, category: 'ENGINEERING' },
    { id: 'DATA_OPS', name: 'DataOps Platform', description: 'Monitor and manage data pipelines, ETL jobs, and system integrations.', icon: ServerStackIcon, category: 'ENGINEERING' },
    { id: 'GUARDRAIL_CONFIGURATOR', name: 'Guardrail Configurator', description: 'Define and manage the behavior of individual guardrails.', icon: CogIcon, category: 'ENGINEERING' },
    { id: 'API_KEY_MANAGER', name: 'API Key Manager', description: 'Manage the API key for accessing Google AI services.', icon: KeyIcon, category: 'ENGINEERING' },
];

const AI_MODULES: Module[] = [
    { id: 'CHATBOT', name: 'Kubernetics Lite Chat', description: 'Engage in a direct conversation with the KR0M3D1A protocol\'s core AI.', icon: RobotIcon, category: 'AI' },
    { id: 'IMAGE_ANALYSIS', name: 'Multimodal Image Analysis', description: 'Upload an image and use the AI to analyze its content.', icon: PhotoIcon, category: 'AI' },
    { id: 'VIDEO_ANALYSIS', name: 'Multimodal Video Analysis', description: 'Upload a video and use the AI to analyze its content.', icon: VideoCameraIcon, category: 'AI' },
    { id: 'AUDIO_TRANSCRIPTION', name: 'AI Audio Transcription', description: 'Record audio and get a real-time transcription from the AI.', icon: MicrophoneIcon, category: 'AI' },
    { id: 'IMAGE_GENERATION', name: 'AI Image Generation', description: 'Generate high-quality images from text descriptions.', icon: WandIcon, category: 'AI' },
    { id: 'VIDEO_GENERATION', name: 'AI Video Generation (Veo)', description: 'Generate high-quality video clips from text and images.', icon: FilmIcon, category: 'AI' },
    { id: 'TEXT_TO_SPEECH', name: 'Text-to-Speech Synthesis', description: 'Convert text into lifelike speech using the AI.', icon: SpeakerWaveIcon, category: 'AI' },
    { id: 'NFT_STUDIO', name: 'NFT Genesis Studio', description: 'Materialize cosmic and cryptologic concepts into unique digital assets.', icon: NftIcon, category: 'AI' },
    { id: 'ARCHITECTS_EXEGESIS', name: 'Architect\'s Exegesis', description: 'Deconstruct the foundational philosophy of the KR0M3D1A protocol.', icon: BrainCircuitIcon, category: 'AI' },
];

export const ALL_MODULES: Module[] = [
    ...CORE_MODULES,
    ...LEGAL_MODULES,
    ...FINANCIAL_MODULES,
    ...SECURITY_MODULES,
    ...ENGINEERING_MODULES,
    ...AI_MODULES,
];

export const MODULE_CATEGORIES: ModuleCategory[] = [
    { id: 'core', name: 'Core Protocol', icon: DashboardIcon, modules: CORE_MODULES },
    { id: 'legal', name: 'Legal & Judicial', icon: GavelIcon, modules: LEGAL_MODULES },
    { id: 'financial', name: 'Financial & Economic', icon: BuildingLibraryIcon, modules: FINANCIAL_MODULES },
    { id: 'security', name: 'Security & Defense', icon: ShieldCheckIcon, modules: SECURITY_MODULES },
    { id: 'engineering', name: 'Engineering & Ops', icon: CogIcon, modules: ENGINEERING_MODULES },
    { id: 'ai', name: 'AI & Generative Tools', icon: BrainCircuitIcon, modules: AI_MODULES },
];