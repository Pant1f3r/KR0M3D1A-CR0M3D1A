import React, { useState, useEffect, useMemo } from 'react';
import { CodeIcon } from './icons/CodeIcon';
import { ServerStackIcon } from './icons/ServerStackIcon';
import { ClockIcon } from './icons/ClockIcon';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';
import { ArrowsRightLeftIcon } from './icons/ArrowsRightLeftIcon';
import { DataObject, DataType } from '../services/types';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import { PhotoIcon } from './icons/PhotoIcon';
import { VideoCameraIcon } from './icons/VideoCameraIcon';
import { SpeakerWaveIcon } from './icons/SpeakerWaveIcon';
import { MagnifyingGlassIcon } from './icons/MagnifyingGlassIcon';

// Define priority type
type PipelinePriority = 'High' | 'Medium' | 'Low';

// Update mock data to include priority
const initialPipelines: { id: number; name: string; status: 'Running' | 'Degraded' | 'Failed'; lastRun: string; priority: PipelinePriority; }[] = [
    { id: 1, name: 'Guardrail Intel Feed Ingestion', status: 'Running', lastRun: 'Just now', priority: 'High' },
    { id: 2, name: 'Anomaly Detection Triangulation', status: 'Running', lastRun: '2m ago', priority: 'High' },
    { id: 3, name: 'Legal Brief Cross-Referencing', status: 'Degraded', lastRun: '1m ago', priority: 'Medium' },
    { id: 4, name: 'Economic Simulation Datamart', status: 'Failed', lastRun: '1h ago', priority: 'Low' },
    { id: 5, name: 'Philanthropic Yield Distribution', status: 'Running', lastRun: '5m ago', priority: 'Medium' },
];

const mockInitialLogs = [
    '[SUCCESS] Job 742: Guardrail Intel Feed Ingestion completed in 1.2s.',
    '[INFO] Starting Job 743: Anomaly Detection Triangulation.',
    '[WARNING] Job 741: Legal Brief Cross-Referencing has a latency of 3.5s (threshold: 2.0s).',
    '[SUCCESS] Job 740: Philanthropic Yield Distribution completed.',
    '[ERROR] Job 739: Economic Simulation Datamart failed. Reason: Timeout connecting to source API.',
];

// --- START: NEW DATA LAKE COMPONENT ---
const initialData: DataObject[] = [
    { id: 'd2a8f5', name: 'anomaly_feed_q2.json', type: 'Structured', size: '1.2 GB', ingestionDate: new Date('2025-07-15T10:30:00Z'), status: 'Available' },
    { id: 'b9c3e1', name: 'legal_brief_idrc_734.pdf', type: 'Unstructured', size: '15.4 MB', ingestionDate: new Date('2025-07-15T09:45:00Z'), status: 'Available' },
    { id: 'f4g7h2', name: 'kafka_stream_sector7g', type: 'Streaming', size: '25.1 GB/hr', ingestionDate: new Date('2025-07-15T11:00:00Z'), status: 'Processing' },
    { id: 'k1lmn5', name: 'sat_img_bermuda_quadrant.tiff', type: 'Image', size: '8.9 GB', ingestionDate: new Date('2025-07-14T22:15:00Z'), status: 'Archived' },
    { id: 'pqrst6', name: 'bodycam_evidence_007.mp4', type: 'Video', size: '4.3 GB', ingestionDate: new Date('2025-07-15T10:55:00Z'), status: 'Available' },
    { id: 'uvwxy7', name: 'interrogation_audio_log.wav', type: 'Audio', size: '256 MB', ingestionDate: new Date('2025-07-15T08:20:00Z'), status: 'Available' },
    { id: 'z1a2b3', name: 'failed_ingest_log.txt', type: 'Unstructured', size: '1.1 KB', ingestionDate: new Date('2025-07-15T11:05:00Z'), status: 'Error' },
];

const DATA_TYPES: DataType[] = ['Structured', 'Unstructured', 'Streaming', 'Image', 'Video', 'Audio'];

const DataTypeIcon: React.FC<{ type: DataType }> = ({ type }) => {
    const commonClasses = "w-5 h-5 flex-shrink-0";
    switch (type) {
        case 'Structured': return <DocumentTextIcon className={`${commonClasses} text-green-400`} />;
        case 'Unstructured': return <DocumentTextIcon className={`${commonClasses} text-blue-400`} />;
        case 'Streaming': return <ArrowsRightLeftIcon className={`${commonClasses} text-purple-400`} />;
        case 'Image': return <PhotoIcon className={`${commonClasses} text-yellow-400`} />;
        case 'Video': return <VideoCameraIcon className={`${commonClasses} text-orange-400`} />;
        case 'Audio': return <SpeakerWaveIcon className={`${commonClasses} text-red-400`} />;
        default: return <DocumentTextIcon className={`${commonClasses} text-gray-400`} />;
    }
};

const StatusBadge: React.FC<{ status: DataObject['status'] }> = ({ status }) => {
    const styles = {
        Available: 'bg-green-500/20 text-green-300',
        Processing: 'bg-cyan-500/20 text-cyan-300 animate-pulse',
        Archived: 'bg-gray-500/20 text-gray-400',
        Error: 'bg-red-500/20 text-red-300',
    };
    return <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${styles[status]}`}>{status}</span>;
};

const DataLake: React.FC = () => {
    const [dataObjects, setDataObjects] = useState<DataObject[]>(initialData);
    const [filter, setFilter] = useState('');
    const [newUri, setNewUri] = useState('s3://kromedia-intel-bucket/new_evidence_batch.csv');
    const [newType, setNewType] = useState<DataType>('Structured');
    const [isIngesting, setIsIngesting] = useState(false);

    const handleIngest = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newUri.trim()) return;

        setIsIngesting(true);
        const newId = Math.random().toString(36).substring(2, 8);
        const newName = newUri.split('/').pop() || `ingest_${newId}`;
        const newObject: DataObject = {
            id: newId,
            name: newName,
            type: newType,
            size: `${(Math.random() * 1000).toFixed(1)} MB`,
            ingestionDate: new Date(),
            status: 'Processing',
        };
        
        setTimeout(() => {
            setDataObjects(prev => [newObject, ...prev]);
            
            setTimeout(() => {
                setDataObjects(prev => prev.map(obj => obj.id === newId ? { ...obj, status: 'Available' } : obj));
                setIsIngesting(false);
            }, 2000); // Time for processing
        }, 1500); // Time for ingestion
    };

    const filteredData = useMemo(() => {
        if (!filter.trim()) return dataObjects;
        const searchTerm = filter.toLowerCase();
        return dataObjects.filter(obj => 
            obj.name.toLowerCase().includes(searchTerm) ||
            obj.type.toLowerCase().includes(searchTerm) ||
            obj.id.toLowerCase().includes(searchTerm)
        );
    }, [filter, dataObjects]);

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mt-8 animate-fade-in-right">
            <h3 className="text-xl font-bold text-gray-100 mb-4 flex items-center gap-3">
                <ServerStackIcon className="w-6 h-6 text-cyan-400" />
                KR0M3D1A Central Data Lake
            </h3>
            
            <form onSubmit={handleIngest} className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 flex flex-col md:flex-row gap-4 items-end mb-6">
                <div className="flex-grow w-full">
                    <label htmlFor="data-uri" className="block text-sm font-medium text-gray-300">Data Source URI</label>
                    <input type="text" id="data-uri" value={newUri} onChange={e => setNewUri(e.target.value)} className="mt-1 w-full p-2 bg-gray-900/50 border border-gray-600 rounded-md font-mono" placeholder="s3://bucket/path/to/data" required />
                </div>
                <div className="flex-shrink-0 w-full md:w-auto">
                    <label htmlFor="data-type" className="block text-sm font-medium text-gray-300">Data Type</label>
                    <select id="data-type" value={newType} onChange={e => setNewType(e.target.value as DataType)} className="mt-1 w-full p-2 bg-gray-900/50 border border-gray-600 rounded-md">
                        {DATA_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                </div>
                <button type="submit" disabled={isIngesting} className="w-full md:w-auto px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md disabled:bg-gray-600">
                    {isIngesting ? 'Ingesting...' : 'Initiate Ingestion'}
                </button>
            </form>
            {isIngesting && (
                <div className="w-full bg-gray-700 rounded-full h-1.5 mb-6">
                    <div className="bg-purple-600 h-1.5 rounded-full" style={{ animation: 'ingest-progress 3.5s ease-out forwards' }}></div>
                    <style>{`
                        @keyframes ingest-progress {
                            from { width: 0%; }
                            to { width: 100%; }
                        }
                    `}</style>
                </div>
            )}
            
            <div>
                <div className="relative mb-4">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                    </span>
                    <input type="text" value={filter} onChange={e => setFilter(e.target.value)} placeholder="Filter data objects..." className="w-full p-2 pl-10 bg-gray-900/50 border border-gray-600 rounded-md" />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="text-xs text-gray-400 uppercase bg-gray-900/50">
                            <tr>
                                <th scope="col" className="px-4 py-3">ID</th>
                                <th scope="col" className="px-4 py-3">Name</th>
                                <th scope="col" className="px-4 py-3">Type</th>
                                <th scope="col" className="px-4 py-3">Size</th>
                                <th scope="col" className="px-4 py-3">Ingested On</th>
                                <th scope="col" className="px-4 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map(obj => (
                                <tr key={obj.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                    <td className="px-4 py-2 font-mono text-gray-500">{obj.id}</td>
                                    <td className="px-4 py-2 font-medium text-gray-200">{obj.name}</td>
                                    <td className="px-4 py-2"><div className="flex items-center gap-2"><DataTypeIcon type={obj.type} /> {obj.type}</div></td>
                                    <td className="px-4 py-2">{obj.size}</td>
                                    <td className="px-4 py-2">{obj.ingestionDate.toLocaleDateString()}</td>
                                    <td className="px-4 py-2"><StatusBadge status={obj.status} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredData.length === 0 && <p className="text-center text-gray-500 py-4">No data objects match your filter.</p>}
            </div>
        </div>
    );
};
// --- END: NEW DATA LAKE COMPONENT ---


const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 flex items-center gap-4">
        <div className="text-cyan-400">{icon}</div>
        <div>
            <p className="text-sm text-gray-400">{label}</p>
            <p className="text-xl font-bold text-gray-100">{value}</p>
        </div>
    </div>
);

const PipelineStatus: React.FC<{ status: 'Running' | 'Degraded' | 'Failed' }> = ({ status }) => {
    const styles = {
        Running: { bg: 'bg-green-500/20', text: 'text-green-400', icon: '●' },
        Degraded: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', icon: '▲' },
        Failed: { bg: 'bg-red-500/20', text: 'text-red-400', icon: '■' },
    };
    const style = styles[status];
    return (
        <span className={`px-2 py-1 text-xs font-semibold rounded-md ${style.bg} ${style.text} flex items-center gap-1.5`}>
            {style.icon} {status}
        </span>
    );
};

const PrioritySelector: React.FC<{
    id: number;
    currentPriority: PipelinePriority;
    onChange: (id: number, priority: PipelinePriority) => void;
}> = ({ id, currentPriority, onChange }) => {
    const priorityStyles: {[key in PipelinePriority]: string} = {
        High: 'bg-red-500/20 text-red-300 border-red-500/30',
        Medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
        Low: 'bg-green-500/20 text-green-300 border-green-500/30',
    };

    return (
        <select
            value={currentPriority}
            onChange={(e) => onChange(id, e.target.value as PipelinePriority)}
            className={`text-xs font-semibold rounded-md border py-1 pl-2 pr-7 bg-gray-900/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${priorityStyles[currentPriority]}`}
            aria-label={`Set priority for task ${id}`}
        >
            <option value="High" className="bg-gray-800 text-red-300">High</option>
            <option value="Medium" className="bg-gray-800 text-yellow-300">Medium</option>
            <option value="Low" className="bg-gray-800 text-green-300">Low</option>
        </select>
    );
};

export const DataOpsPlatform: React.FC = () => {
    const [pipelines, setPipelines] = useState(initialPipelines);
    const [logs, setLogs] = useState(mockInitialLogs);
    const [stats, setStats] = useState({
        dataProcessed: 1.2, // TB
        latency: 125, // ms
        errorRate: 0.02, // %
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                dataProcessed: prev.dataProcessed + 0.01,
                latency: Math.max(80, prev.latency + (Math.random() - 0.5) * 10),
                errorRate: Math.max(0.01, Math.min(0.1, prev.errorRate + (Math.random() - 0.5) * 0.005)),
            }));

            const newLogEntry = Math.random() > 0.1 
                ? `[SUCCESS] Job ${Math.floor(744 + Math.random()*10)} completed.`
                : `[WARNING] Latency detected in pipeline ${pipelines[Math.floor(Math.random()*pipelines.length)].name}.`;
            
            setLogs(prev => [newLogEntry, ...prev.slice(0, 10)]);

        }, 3000);
        return () => clearInterval(interval);
    }, [pipelines]);

    const handlePriorityChange = (id: number, newPriority: PipelinePriority) => {
        setPipelines(prevPipelines =>
            prevPipelines.map(p => (p.id === id ? { ...p, priority: newPriority } : p))
        );
    };

    const activePipelines = pipelines.filter(p => p.status === 'Running').length;
    const totalPipelines = pipelines.length;

    return (
        <main className="mt-8 space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-3 text-glow-main-title">
                    <CodeIcon className="w-8 h-8 text-cyan-400" />
                    Data Operations Platform
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Monitor and manage data pipelines, ETL jobs, and system integrations for the KR0M3D1A protocol.
                </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={<ServerStackIcon className="w-8 h-8"/>} label="Data Processed (24h)" value={`${stats.dataProcessed.toFixed(2)} TB`} />
                <StatCard icon={<ClockIcon className="w-8 h-8"/>} label="Avg. Pipeline Latency" value={`${stats.latency.toFixed(0)} ms`} />
                <StatCard icon={<ExclamationTriangleIcon className="w-8 h-8"/>} label="Job Error Rate" value={`${stats.errorRate.toFixed(3)}%`} />
                <StatCard icon={<ArrowsRightLeftIcon className="w-8 h-8"/>} label="Active Pipelines" value={`${activePipelines} / ${totalPipelines}`} />
            </div>

            {/* Pipelines and Logs */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-gray-800 border border-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-200 mb-4">Pipeline Status</h3>
                    <div className="space-y-3">
                        {pipelines.map(pipeline => (
                            <div key={pipeline.id} className="bg-gray-900/50 p-3 rounded-md flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-gray-300">{pipeline.name}</p>
                                    <p className="text-xs text-gray-500">Last run: {pipeline.lastRun}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <PrioritySelector 
                                        id={pipeline.id}
                                        currentPriority={pipeline.priority}
                                        onChange={handlePriorityChange}
                                    />
                                    <PipelineStatus status={pipeline.status} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-2 bg-black border border-gray-700 rounded-lg p-4 font-mono text-sm h-[350px] flex flex-col">
                    <h3 className="text-cyan-400 mb-2 flex-shrink-0">[LIVE JOB LOG]</h3>
                    <div className="overflow-y-auto flex-grow">
                        {logs.map((entry, index) => {
                            const isError = entry.startsWith('[ERROR]');
                            const isWarning = entry.startsWith('[WARNING]');
                            const colorClass = isError ? 'text-red-400' : isWarning ? 'text-yellow-400' : 'text-green-400';
                            return (
                                <p key={index} className={`whitespace-pre-wrap animate-fade-in-right ${colorClass}`}>
                                    <span className="text-gray-500 mr-2">&gt;</span>{entry}
                                </p>
                            );
                        })}
                    </div>
                </div>
            </div>

            <DataLake />
        </main>
    );
};
