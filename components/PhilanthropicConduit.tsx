import React from 'react';
import { HandshakeIcon } from './icons/HandshakeIcon';
import { DonationAgreement } from './DonationAgreement';
import { UserIcon } from './icons/UserIcon';
import { UserGroupIcon } from './icons/UserGroupIcon';
import { BuildingLibraryIcon } from './icons/BuildingLibraryIcon';
import { GlobeIcon } from './icons/GlobeIcon';

const PartnershipTier: React.FC<{ icon: React.ReactNode, title: string, description: string, range: string }> = ({ icon, title, description, range }) => (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center flex flex-col items-center">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-900/50 border-2 border-cyan-500/50 text-cyan-400 mb-4">
            {icon}
        </div>
        <h4 className="text-lg font-bold text-gray-100">{title}</h4>
        <p className="text-sm font-semibold text-cyan-400 font-mono">{range}</p>
        <p className="text-xs text-gray-400 mt-2 flex-grow">{description}</p>
    </div>
);

export const PhilanthropicConduit: React.FC = () => {
    return (
        <main className="mt-8 space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-3 text-glow-main-title">
                    <HandshakeIcon className="w-8 h-8 text-cyan-400" />
                    Philanthropic Conduit & Investment
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    KR0M3D1A is an open-source protocol built on the principle of a self-sustaining digital commons. We invite partners—from individuals and startups to Fortune 500 corporations and sovereign entities—to contribute to our mission of building a safer, more equitable internet.
                </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 animate-fade-in-right">
                <h3 className="text-xl font-bold text-gray-100 mb-4">The Mandate for Philanthropy</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    The digital world requires a dedicated, impartial guardian. The development, maintenance, and legal enforcement of robust AI guardrails is a monumental task that transcends traditional for-profit models. Your philanthropic contribution is not a donation in the conventional sense; it is an investment in the foundational security and ethical integrity of our shared digital future. All funds are directed to the Arconomics Treasury to ensure the perpetual, autonomous operation of the protocol's guardrail initiatives—from law and security to courts and community governance.
                </p>
            </div>

            <div className="animate-fade-in-right">
                <h3 className="text-xl font-bold text-gray-100 mb-4 text-center">Partnership Tiers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <PartnershipTier 
                        icon={<UserIcon className="w-8 h-8"/>} 
                        title="Guardian" 
                        range="Individuals & Startups"
                        description="Support the foundational layer of the protocol. Guardians are acknowledged in our annual transparency report." 
                    />
                    <PartnershipTier 
                        icon={<UserGroupIcon className="w-8 h-8"/>} 
                        title="Steward" 
                        range="Small to Medium Enterprises"
                        description="Fund specific research verticals, such as 'Vocal Subterfuge' or 'Sub-Semantic Analysis'. Stewards gain access to quarterly development briefings." 
                    />
                    <PartnershipTier 
                        icon={<BuildingLibraryIcon className="w-8 h-8"/>} 
                        title="Architect" 
                        range="Fortune 500 & Corporations"
                        description="Underwrite major protocol initiatives, like the deployment of a new Arconomics judicial circuit or funding a full cycle of the G.I.F.T. protocol." 
                    />
                    <PartnershipTier 
                        icon={<GlobeIcon className="w-8 h-8"/>} 
                        title="Sovereign" 
                        range="Governments & Foundations"
                        description="Establish a lasting legacy by endowing a permanent chair on the DEJA' VU Directive's oversight council (non-voting) and shaping global policy." 
                    />
                </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 animate-fade-in-right">
                <h3 className="text-xl font-bold text-gray-100 mb-4">The Legal Instrument of Contribution</h3>
                <p className="text-sm text-gray-400 mb-4">
                    To ensure full transparency and legal standing, all contributions are executed via the official Philanthropic Contribution Agreement. This legally binding edict outlines the terms of your support and the responsibilities of the KR0M3D1A protocol. Please review the document below.
                </p>
                <DonationAgreement />
                <div className="mt-6 text-center">
                    <button className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200">
                        Initiate Secure Contribution (Simulated)
                    </button>
                    <p className="text-xs text-gray-500 mt-2">
                        In a production environment, this would link to a secure, compliant contribution portal (e.g., powered by Stripe or a dedicated crypto payment gateway).
                    </p>
                </div>
            </div>

        </main>
    );
};