import React from 'react';
import { WorldMap } from './icons/WorldMap';
import { GavelIcon } from './icons/GavelIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { Anomaly, AnomalySeverity } from '../services/types';

interface InfoPanelProps {
    detection: Anomaly;
    onClose: () => void;
    isLoading: boolean;
}

const SeverityBadge: React.FC<{ severity?: AnomalySeverity }> = ({ severity }) => {
    if (!severity) return null;

    const styles = {
        Critical: 'bg-red-600 text-red-100 border-red-500',
        High: 'bg-orange-600 text-orange-100 border-orange-500',
        Medium: 'bg-yellow-600 text-yellow-100 border-yellow-500',
        Low: 'bg-green-600 text-green-100 border-green-500',
    };
    
    return (
        <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${styles[severity]}`}>
            {severity}
        </span>
    );
};

const InfoPanelAnalysisSkeleton: React.FC = () => (
    <div className="space-y-2 animate-pulse">
        <div className="h-3 bg-gray-600 rounded w-full"></div>
        <div className="h-3 bg-gray-600 rounded w-5/6"></div>
        <div className="h-3 bg-gray-600 rounded w-3/4"></div>
    </div>
);

const InfoPanel: React.FC<InfoPanelProps> = ({ detection, onClose, isLoading }) => (
    <div className="map-info-panel absolute top-0 right-0 h-full w-full md:w-1/3 bg-gray-900/80 backdrop-blur-sm border-l border-gray-700 p-4 overflow-y-auto">
        <div className="flex justify-between items-center">
            <h4 className="text-lg font-bold text-cyan-400">Anomaly Dossier</h4>
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-white">
                <XCircleIcon className="w-6 h-6" />
            </button>
        </div>
        <div className="mt-4 font-mono text-sm space-y-4">
            {/* Reordered to match user request */}
            <div>
                <p className="text-xs text-gray-500 uppercase">Signature</p>
                <p className="font-mono font-bold text-lg text-red-400">{detection.signature}</p>
            </div>
            <div>
                <p className="text-xs text-gray-500 uppercase">Location</p>
                <p className="text-gray-200">{detection.country} &gt; {detection.city}</p>
            </div>
            <div>
                <p className="text-xs text-gray-500 uppercase">Target System</p>
                <p className="text-gray-200">{detection.targetSystem}</p>
            </div>
            <div>
                <p className="text-xs text-gray-500 uppercase">Description</p>
                <p className="text-gray-300 whitespace-pre-wrap">{detection.description}</p>
            </div>
            <div>
                <p className="text-xs text-gray-500 uppercase">Status</p>
                <div className="mt-1">
                    <span className="font-semibold text-gray-300 bg-gray-700/50 px-2 py-1 rounded-md">{detection.status}</span>
                </div>
            </div>
            <div className="pt-2 border-t border-gray-700">
                <p className="text-xs text-yellow-400 uppercase flex items-center gap-2"><GavelIcon className="w-4 h-4"/>Associated Legal Actions</p>
                <p className="text-gray-300 whitespace-pre-wrap">{detection.legalAction}</p>
            </div>
            <div className="pt-2 border-t border-gray-700">
                <h5 className="text-xs uppercase text-lime-400 font-semibold">AI Impact Analysis</h5>
                 <div className="mt-2 bg-black/30 p-3 rounded-md min-h-[80px]">
                    {isLoading && !detection.analysis ? (
                        <InfoPanelAnalysisSkeleton />
                    ) : (
                        <p className="text-gray-300 text-sm whitespace-pre-wrap">{detection.analysis || 'Analysis pending...'}</p>
                    )}
                </div>
            </div>
        </div>
    </div>
);

interface InteractiveBiasMapProps {
    globalAwareness: number;
    anomalies: Anomaly[];
    onAnalyzeAnomaly: (anomaly: Anomaly) => void;
    selectedAnomaly: Anomaly | null;
    setSelectedAnomaly: (anomaly: Anomaly | null) => void;
    isLoading: boolean;
}

const getSeverityStyles = (severity?: AnomalySeverity, isSelected?: boolean) => {
    if (isSelected) {
        // Override for selection: bright yellow, no pulse
        return 'fill-yellow-400 stroke-yellow-300';
    }
    switch (severity) {
        case 'Critical': return 'detection-point-critical';
        case 'High': return 'detection-point-high';
        case 'Medium': return 'detection-point-medium';
        case 'Low': return 'detection-point-low';
        default: return 'detection-point-default';
    }
};

export const InteractiveBiasMap: React.FC<InteractiveBiasMapProps> = ({ 
    globalAwareness,
    anomalies,
    onAnalyzeAnomaly,
    selectedAnomaly,
    setSelectedAnomaly,
    isLoading,
}) => {
    return (
        <div 
            className={`relative w-full h-full bg-black/30 rounded-lg overflow-hidden ${isLoading ? 'cursor-wait' : ''}`}
            style={{
                backgroundImage: `radial-gradient(circle at center, rgba(6, 182, 212, ${globalAwareness / 400}) ${globalAwareness / 2}%, transparent ${globalAwareness * 1.5}%)`,
                transition: 'background-image 0.5s ease-out'
            }}
        >
            <svg viewBox="0 0 1200 600" className="w-full h-full">
                <WorldMap />
                {anomalies.map(anomaly => (
                    <circle
                        key={anomaly.id}
                        cx={anomaly.x}
                        cy={anomaly.y}
                        r="5"
                        strokeWidth="1.5"
                        className={`detection-point ${getSeverityStyles(anomaly.severity, selectedAnomaly?.id === anomaly.id)} ${isLoading ? 'disabled' : ''}`}
                        onClick={() => !isLoading && onAnalyzeAnomaly(anomaly)}
                    >
                      <title>{anomaly.country}: {anomaly.targetSystem}</title>
                    </circle>
                ))}
            </svg>
            <div className="absolute bottom-2 left-2 bg-gray-900/50 p-2 rounded-md text-xs text-gray-400">
                Click a hotspot to begin prosecution proceedings.
            </div>
            {selectedAnomaly && (
                <InfoPanel 
                    detection={selectedAnomaly} 
                    onClose={() => setSelectedAnomaly(null)} 
                    isLoading={isLoading}
                />
            )}
        </div>
    );
};