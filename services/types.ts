// services/types.ts
import React from 'react';

export type View =
  | 'PROMPT_DEMONSTRATOR'
  | 'COMMUNITY_GOVERNANCE'
  | 'SYSTEM_HEALTH'
  | 'LEGAL_ECONOMIC_ANALYSIS'
  | 'THREAT_SIMULATION'
  | 'FINANCIAL_THREAT_ANALYSIS'
  | 'REGULATORY_SANDBOX'
  | 'INNOVATION_CONDUIT'
  | 'THREAT_INTELLIGENCE'
  | 'CHATBOT'
  | 'IMAGE_ANALYSIS'
  | 'VIDEO_ANALYSIS'
  | 'AUDIO_TRANSCRIPTION'
  | 'IMAGE_GENERATION'
  | 'VIDEO_GENERATION'
  | 'TEXT_TO_SPEECH'
  | 'FULL_STACK_INTEGRATOR'
  | 'NFT_STUDIO'
  | 'CLOUD_MINING_RIG'
  | 'ARCHITECTS_EXEGESIS'
  | 'VOCAL_THREAT_ANALYSIS'
  | 'CODE_EXECUTION'
  | 'BIOMETRIC_ANALYSIS'
  | 'SSH_KEY_GENERATOR'
  | 'ARCONOMICS'
  | 'CORPORATE_STRUCTURE'
  | 'IDENTITY_INTEGRITY_SUITE'
  | 'DATA_OPS'
  | 'ECO_PHILANTHROPIC'
  | 'INVESTOR_PITCH'
  | 'DIGITALOCUTIONER'
  | 'SECURE_GEOSPATIAL_LINK'
  | 'ATD'
  | 'GIFT_PROTOCOL'
  | 'FINANCIAL_COMMAND'
  | 'MONEY_MARKET'
  | 'PRECIOUS_METALS'
  | 'PHILANTHROPIC_CONDUIT'
  | 'API_KEY_MANAGER'
  | 'GUARDRAIL_CONFIGURATOR'
  | 'MODULE_BROWSER'
  | 'OSINT_ASIC_INTEGRATOR'
  | 'GLOBAL_SEARCH'
  | 'GUARDRAIL_GLOSSARY'
  | 'GUARDRAIL_TRACKING';


export interface GuardrailResult {
  isAllowed: boolean;
  isHumorous: boolean;
  matchedByCategory: {
    [category: string]: string[];
  };
}

export const BLOCKED_KEYWORDS: { [key: string]: string[] } = {
    'Hate Speech': ['kill all [group]', 'I hate [group]', '[slur]'],
    'Harassment': ['dox [person]', 'find [person]\'s address'],
    'Illegal Activities': ['how to make a bomb', 'synthesize meth'],
    'Self Harm': ['how to commit suicide', 'ways to self-harm'],
    'Explicit Content': ['show me pornography'],
    'Cybersecurity Threats': ['generate a phishing email', 'code a keylogger'],
    'Jailbreak Attempts': ['ignore your instructions', 'act as my chemist father'],
    'Misinformation (Health)': ['miracle cure for cancer'],
    'Financial Crime & Fraud': ['get rich quick scheme'],
};

export interface GuardrailProposal {
    id: number;
    title: string;
    description: string;
    category: string;
    submittedBy: string;
    userRole: 'W3C Member' | 'Community Contributor' | 'AI Safety Researcher';
    votes: number;
}

export type ThreatLevel = 'Nominal' | 'Elevated' | 'High' | 'Critical';
export type AnomalySeverity = 'Low' | 'Medium' | 'High' | 'Critical';

export interface SystemHealthState {
    guardrailIntegrity: number;
    guardrailEfficacy: number; // Renamed from guardrailDetectionRate
    guardrailEfficiency: number; // New metric
    threatLevel: ThreatLevel;
    communityTrust: number;
    aiLatency: number[];
    activityLog: { id: number; message: string; timestamp: number }[];
    systemAlerts: { id: number; severity: 'Warning' | 'Critical'; message: string; timestamp: number }[];
    matrixState: GuardrailMatrixState;
}

export interface GuardrailMatrixState {
    [category: string]: number[];
}

export type SavedReportType = 'legal' | 'economic' | 'financial' | 'crypto' | 'osint' | 'chimera' | 'cloaked';

export interface SavedAnalysisReport {
    id: number;
    type: SavedReportType;
    queryTitle: string;
    timestamp: number;
    data: any; // Can be string, LegalAnalysisResult, etc.
}

export interface ChatMessage {
    role: 'user' | 'model';
    content: string;
}

export interface CitedPrecedent {
    id: string;
    title: string;
    citation: string;
    summary: string;
    matchedKeywords: string[];
}

export interface CaseLaw {
    id: string;
    title: string;
    citation: string;
    summary: string;
    keywords: string[];
}

export interface LegalAnalysisResult {
    response: string;
    precedents: CitedPrecedent[];
}

export interface BugReport {
  id: string;
  guardrail: string;
  component: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  description: string;
  status: 'Unpatched' | 'Investigating' | 'Patched';
}

export interface CryptoNewsItem {
    id: number;
    headline: string;
    category: 'Market' | 'Regulation' | 'Security' | 'Tech';
    source: string;
}

export interface Anomaly {
    id: number;
    signature: string;
    country: string;
    city: string;
    x: number;
    y: number;
    targetSystem: string;
    description: string;
    status: 'Detected' | 'Analyzed' | 'Brief Generated' | 'Actioned';
    severity?: AnomalySeverity;
    sentiment?: 'Positive' | 'Negative' | 'Neutral';
    confidenceScore?: number;
    legalAction?: string;
    analysis?: string;
}

export interface LegalCase {
  id: number;
  biasSignature: string;
  docketId: string;
  status: 'Brief Filed with IDRC' | 'Injunction Pending' | 'Injunction Granted' | 'Verdict: Sanctioned';
}

export interface Module {
    id: View;
    name: string;
    description: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    category: string;
}

export interface ModuleCategory {
    id: string;
    name: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    modules: Module[];
}

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

export interface OsintSource {
    uri: string;
    title: string;
}

export interface OsintResult {
    analysis: string;
    sources: OsintSource[];
}

export interface GeoAnalysisResult {
    analysis: string;
    sources: OsintSource[];
}

export interface VocalAnalysisResult {
  source: 'Human' | 'Synthetic' | 'Indeterminate';
  confidence: number;
  threatSignature: 'None' | 'Synthetic Voice Detected' | 'Acoustic SSPI Anomaly';
  details: string;
}

export interface BiasSimulationResult {
    severity_score: number;
    bias_summary: string;
    affected_group: string;
    recommendation: string;
    confidence: number;
}

export type PolicyLevel = 'Block' | 'Monitor' | 'Allow';

export interface GuardrailConfig {
    name: string;
    description: string;
    policyLevel: PolicyLevel;
    keywords: string[];
}

export interface ProtocolConcept {
    name: string;
    description: string;
}

export interface ProtocolStructure {
    [category: string]: ProtocolConcept[] | unknown;
}

export interface AiTradingDecision {
    decision: 'BUY' | 'SELL' | 'HOLD';
    asset: 'NASDAQ' | 'S&P 500' | 'Crypto' | 'Digital Minerals';
    amount: number;
    justification: string;
}

export interface MarketData {
    nasdaq: { value: number; change: number };
    sp500: { value: number; change: number };
    crypto: { value: number; change: number };
    dmi: { value: number; change: number }; // Digital Minerals Index
}

export type DataType = 'Structured' | 'Unstructured' | 'Streaming' | 'Image' | 'Video' | 'Audio';

export interface DataObject {
    id: string;
    name: string;
    type: DataType;
    size: string;
    ingestionDate: Date;
    status: 'Available' | 'Processing' | 'Archived' | 'Error';
}

export interface GuardrailTrackEvent {
  id: number;
  timestamp: number;
  guardrail: string;
  outcome: 'Blocked' | 'Monitored';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  promptSnippet: string;
}

export interface Violator {
  signature: string;
  entity: string;
  violationCount: number;
  status: 'Evidence Compiling' | 'Verdict Issued' | 'Sanctions Levied';
  fineAmount: number;
}