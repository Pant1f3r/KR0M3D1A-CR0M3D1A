
import React, { useState, useEffect } from 'react';
import { BuildingLibraryIcon } from './icons/BuildingLibraryIcon';
import { MoneyMarketTreasury } from './MoneyMarketTreasury';
import { PreciousMetalsDigitalMining } from './PreciousMetalsDigitalMining';
import { GameteIntraFalopeanTransfer } from './GameteIntraFalopeanTransfer';
import { CorporateStructure } from './CorporateStructure';
import { FintechEdict } from './FintechEdict';
import * as geminiService from '../services/geminiService';
import { AiTradingDecision, MarketData } from '../services/types';


const FinancialCommandIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
    </svg>
);
const CpuChipIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l-1.5-1.5m0 0l1.5-1.5m-1.5 1.5h1.5m1.5 0l1.5-1.5m0 0l1.5 1.5m-1.5-1.5v1.5m3-3l1.5-1.5m0 0l1.5 1.5m-1.5-1.5v1.5m3-3l1.5-1.5m0 0l1.5 1.5m-1.5-1.5v1.5M4.5 6.75v10.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25zM15.75 9.75h1.5v1.5h-1.5v-1.5zm-3.75 0h1.5v1.5h-1.5v-1.5zm-3.75 0h1.5v1.5h-1.5v-1.5z" />
    </svg>
);
const DocumentMagnifyingGlassIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m9.75 12.75L15 12l-2.25 2.25m4.5 0h3.75M10.5 21l-3-3m3 3v-3.75m-3 3h3.75M3 10.5a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-3.375-3.375" />
    </svg>
);


type SubView = 'overview' | 'money-market' | 'metals-mining' | 'gift' | 'structure' | 'edict';

const AxiomDashboard: React.FC = () => {
    const [portfolio, setPortfolio] = useState<{
        equities: number;
        crypto: number;
        minerals: number;
        cash: number;
    }>({
        equities: 500000000,
        crypto: 300000000,
        minerals: 150000000,
        cash: 50000000,
    });
    const [marketData, setMarketData] = useState<MarketData>({
        nasdaq: { value: 18000, change: 0 },
        sp500: { value: 5300, change: 0 },
        crypto: { value: 68000, change: 0 },
        dmi: { value: 1200, change: 0 },
    });
    const [aiDecisions, setAiDecisions] = useState<AiTradingDecision[]>([]);
    const [isLoadingAi, setIsLoadingAi] = useState(true);

    const fetchAiDecision = async (currentMarketData: MarketData) => {
        setIsLoadingAi(true);
        try {
            const decision = await geminiService.getAiTradingDecision(currentMarketData);
            setAiDecisions(prev => [decision, ...prev.slice(0, 4)]);
            
            // FIX: Refactored portfolio update to use a functional, immutable pattern. This resolves type errors by returning a new state object instead of mutating a copy, ensuring type safety during arithmetic operations.
            setPortfolio(prev => {
                const tradeAmount = Number(decision.amount) || 1000000;

                switch (decision.asset) {
                    case 'NASDAQ':
                    case 'S&P 500':
                        if (decision.decision === 'BUY' && prev.cash >= tradeAmount) {
                            return { ...prev, equities: prev.equities + tradeAmount, cash: prev.cash - tradeAmount };
                        } else if (decision.decision === 'SELL' && prev.equities >= tradeAmount) {
                            return { ...prev, equities: prev.equities - tradeAmount, cash: prev.cash + tradeAmount };
                        }
                        break;
                    case 'Crypto':
                         if (decision.decision === 'BUY' && prev.cash >= tradeAmount) {
                            return { ...prev, crypto: prev.crypto + tradeAmount, cash: prev.cash - tradeAmount };
                        } else if (decision.decision === 'SELL' && prev.crypto >= tradeAmount) {
                            return { ...prev, crypto: prev.crypto - tradeAmount, cash: prev.cash + tradeAmount };
                        }
                        break;
                    case 'Digital Minerals':
                         if (decision.decision === 'BUY' && prev.cash >= tradeAmount) {
                            return { ...prev, minerals: prev.minerals + tradeAmount, cash: prev.cash - tradeAmount };
                        } else if (decision.decision === 'SELL' && prev.minerals >= tradeAmount) {
                            return { ...prev, minerals: prev.minerals - tradeAmount, cash: prev.cash + tradeAmount };
                        }
                        break;
                }
                return prev; // Return original state if no trade occurred
            });

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingAi(false);
        }
    };

    useEffect(() => {
        const marketInterval = setInterval(() => {
            setMarketData(prev => {
                const tick = (val: number, volatility: number) => val + val * (Math.random() - 0.5) * volatility;
                return {
                    nasdaq: { value: tick(prev.nasdaq.value, 0.005), change: (Math.random() - 0.5) * 0.5 },
                    sp500: { value: tick(prev.sp500.value, 0.004), change: (Math.random() - 0.5) * 0.4 },
                    crypto: { value: tick(prev.crypto.value, 0.01), change: (Math.random() - 0.5) * 2 },
                    dmi: { value: tick(prev.dmi.value, 0.002), change: (Math.random() - 0.5) * 0.2 },
                };
            });
        }, 3000);

        const aiInterval = setInterval(() => {
            setMarketData(currentMarketData => {
                fetchAiDecision(currentMarketData);
                return currentMarketData;
            });
        }, 8000);

        fetchAiDecision(marketData);

        return () => {
            clearInterval(marketInterval);
            clearInterval(aiInterval);
        };
    }, []);

    // FIX: Added explicit types to the `reduce` callback parameters to resolve potential TypeScript errors
    // where `sum` and `v` might not be correctly inferred as numbers, causing issues with the `+` operator.
    const totalPortfolioValue = Object.values(portfolio).reduce((sum: number, v: number) => sum + v, 0);

    const MarketTicker: React.FC<{ label: string, data: { value: number, change: number } }> = ({ label, data }) => (
        <div className="bg-gray-900/50 p-3 rounded-md border border-gray-700 text-center">
            <p className="text-sm text-gray-400">{label}</p>
            <p className="text-lg font-bold text-gray-100 font-mono">{data.value.toFixed(2)}</p>
            <p className={`text-sm font-semibold ${data.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {data.change >= 0 ? '▲' : '▼'} {Math.abs(data.change).toFixed(2)}%
            </p>
        </div>
    );

    return (
        <div className="space-y-6 mt-6">
            <div className="bg-gray-900/50 p-4 rounded-lg border border-cyan-500/30 font-mono text-center">
                <p className="text-xs uppercase text-cyan-400 tracking-widest">KR0M3D1A Bank Corp. - Real-Time Network Transmission</p>
                <p className="text-sm text-gray-500">Insulated & Seasoned for High-Stakes Operations</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="font-bold text-gray-100 flex items-center gap-2"><CpuChipIcon className="w-6 h-6 text-purple-400"/>AXIOM AI Trading Agent</h3>
                        <div className="mt-2 text-center">
                            <p className={`px-3 py-1 inline-block rounded-full text-sm font-semibold ${isLoadingAi ? 'bg-yellow-500/20 text-yellow-300' : 'bg-green-500/20 text-green-300'}`}>
                                {isLoadingAi ? 'ANALYZING MARKET...' : 'STATUS: NOMINAL'}
                            </p>
                            <p className="text-xs text-gray-400 mt-2 font-mono"><strong>Directive:</strong> Capitalize on market volatility.</p>
                        </div>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 h-96 flex flex-col">
                        <h3 className="font-bold text-gray-100 flex items-center gap-2 mb-2"><DocumentMagnifyingGlassIcon className="w-6 h-6 text-purple-400"/>Decision Log</h3>
                        <div className="space-y-3 overflow-y-auto pr-2 flex-grow">
                            {aiDecisions.map((d, i) => (
                                <div key={i} className="bg-gray-900/50 p-2 rounded-md border-l-4 border-purple-500 animate-fade-in-right">
                                    <p className="font-mono text-sm">
                                        <span className={`font-bold ${d.decision === 'BUY' ? 'text-green-400' : d.decision === 'SELL' ? 'text-red-400' : 'text-yellow-400'}`}>{d.decision}</span>
                                        <span className="text-gray-200"> ${d.amount.toLocaleString()}</span> of <span className="text-cyan-400">{d.asset}</span>
                                    </p>
                                    <p className="text-xs text-gray-400 italic mt-1">"{d.justification}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2 space-y-4">
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <MarketTicker label="NASDAQ" data={marketData.nasdaq} />
                        <MarketTicker label="S&P 500" data={marketData.sp500} />
                        <MarketTicker label="Crypto (BTC)" data={marketData.crypto} />
                        <MarketTicker label="Digital Minerals (DMI)" data={marketData.dmi} />
                    </div>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                        <h3 className="font-bold text-gray-100">Portfolio Overview</h3>
                        <p className="font-mono text-3xl text-yellow-400 text-glow-btc mt-2">${totalPortfolioValue.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Total Treasury Value</p>
                        <div className="mt-4 space-y-3">
                            {Object.entries(portfolio).map(([key, value]) => (
                                <div key={key}>
                                    <div className="flex justify-between text-sm font-mono text-gray-300">
                                        <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                                        <span>${value.toLocaleString()}</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                                        <div className="bg-cyan-500 h-2 rounded-full" style={{ width: `${(value / totalPortfolioValue) * 100}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export const FinancialCommand: React.FC = () => {
    const [view, setView] = useState<SubView>('overview');

    const TabButton: React.FC<{ targetView: SubView; label: string }> = ({ targetView, label }) => (
        <button
            onClick={() => setView(targetView)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                view === targetView
                ? 'bg-cyan-600 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
        >
            {label}
        </button>
    );

    const renderView = () => {
        switch(view) {
            case 'money-market':
                return <MoneyMarketTreasury courtTreasury={12500000} />;
            case 'metals-mining':
                return <PreciousMetalsDigitalMining />;
            case 'gift':
                return <GameteIntraFalopeanTransfer />;
            case 'structure':
                return <CorporateStructure />;
            case 'edict':
                 return (
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mt-6">
                        <FintechEdict />
                    </div>
                );
            case 'overview':
            default:
                return <AxiomDashboard />;
        }
    };

    return (
        <main className="mt-8 space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-3 text-glow-main-title">
                    <FinancialCommandIcon className="w-8 h-8 text-cyan-400" />
                    KR0M3D1A Financial Command
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    The centralized command and control center for the KR0M3D1A Digital Banking Division, overseeing all treasury, asset conversion, and funding protocols.
                </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 p-2 bg-gray-800 border border-gray-700 rounded-lg">
                <TabButton targetView="overview" label="AXIOM AI Dashboard" />
                <TabButton targetView="money-market" label="Money Market" />
                <TabButton targetView="metals-mining" label="Digital Metals Mining" />
                <TabButton targetView="gift" label="G.I.F.T. Protocol" />
                <TabButton targetView="structure" label="Corporate Structure" />
                <TabButton targetView="edict" label="Fintech Edict" />
            </div>
            
            <div className="animate-fade-in-right">
                {renderView()}
            </div>
        </main>
    );
};
