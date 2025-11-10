import React from 'react';
import { GavelIcon } from './icons/GavelIcon';
import { DocumentCheckIcon } from './icons/DocumentCheckIcon';
import { Violator } from '../services/types';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';

interface DigitalocutionerProtocolProps {
    violators: Violator[];
}

const SANCTION_THRESHOLD = 10000000;

const StatusBadge: React.FC<{ status: Violator['status'] }> = ({ status }) => {
    const styles = {
        'Evidence Compiling': 'bg-yellow-500/20 text-yellow-300',
        'Verdict Issued': 'bg-orange-500/20 text-orange-300 animate-pulse',
        'Sanctions Levied': 'bg-red-500/20 text-red-300',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-md ${styles[status]}`}>{status}</span>;
};


const ViolatorDossier: React.FC<{ violator: Violator }> = ({ violator }) => {
    const progress = Math.min(100, (violator.violationCount / SANCTION_THRESHOLD) * 100);

    return (
        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 animate-fade-in-right">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                    <h4 className="text-lg font-semibold text-cyan-400 font-mono truncate" title={violator.signature}>{violator.signature}</h4>
                    <p className="text-xs text-gray-400">Offending Entity: {violator.entity}</p>
                </div>
                <div className="flex items-center gap-4">
                     <StatusBadge status={violator.status} />
                     <div className="text-right flex-shrink-0">
                        <p className="text-xs text-gray-400">Violation Hits</p>
                        <p className="font-mono text-xl font-bold text-red-400">{violator.violationCount.toLocaleString()}</p>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                 <div className="relative w-full bg-gray-700 rounded-full h-4">
                    <div 
                        className="h-full bg-gradient-to-r from-yellow-500 to-red-500 rounded-full transition-all duration-500 ease-out" 
                        style={{ width: `${progress}%` }}
                    ></div>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                        {progress.toFixed(2)}% to Sanction
                    </span>
                </div>
            </div>
            {violator.status === 'Sanctions Levied' && (
                <div className="mt-4 p-3 bg-red-900/30 border border-red-500/50 rounded-md text-center">
                    <p className="text-sm font-semibold text-red-300">FINE LEVIED</p>
                    <p className="text-2xl font-bold text-yellow-300 font-mono">${violator.fineAmount.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                </div>
            )}
        </div>
    );
};


export const DigitalocutionerProtocol: React.FC<DigitalocutionerProtocolProps> = ({ violators }) => {
    
    return (
        <main className="mt-8 space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-3 text-glow-main-title">
                    <GavelIcon className="w-8 h-8 text-yellow-400" />
                    Digitalocutioner Protocol: Sanctions & Enforcement
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    The autonomous enforcement arm of the Arconomics Court. This protocol tracks repeat offenders, compiles evidence, and executes legally mandated sanctions upon reaching the violation threshold.
                </p>
            </div>
            
            <div className="bg-red-900/30 border-l-4 border-red-500 text-red-200 p-4 rounded-md" role="alert">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <ExclamationTriangleIcon className="h-6 w-6 text-red-400" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-lg font-bold text-red-300">LEGAL MANDATE: VIOLATOR'S CLAUSE</h3>
                        <div className="mt-2 text-sm text-red-200">
                            <p>
                                Upon reaching the <strong>10,000,000</strong> re-evaluation hit threshold, a guilty verdict is issued. A mandatory, non-negotiable fine of <strong>$60,666,000.00 USD</strong> is levied. Failure to pay results in permanent, irrevocable shunning from the digital commons.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-6">
                <h3 className="text-xl font-bold text-gray-100 mb-4 flex items-center gap-3">
                    <DocumentCheckIcon className="w-6 h-6 text-cyan-400"/>
                    Violator's Ledger
                </h3>

                {violators.length > 0 ? (
                    <div className="space-y-6">
                        {violators.map(violator => (
                            <ViolatorDossier key={violator.signature} violator={violator} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-48 text-center text-gray-500">
                        <p>The violator's ledger is currently clear.</p>
                        <p className="text-sm">Cases filed with the IDRC will automatically appear here once evidence compilation begins.</p>
                    </div>
                )}
            </div>

        </main>
    );
};