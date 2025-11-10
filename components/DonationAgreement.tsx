import React from 'react';
import { GavelIcon } from './icons/GavelIcon';

export const DonationAgreement: React.FC = () => {
    return (
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 font-mono text-sm text-gray-400 max-h-[60vh] overflow-y-auto">
            <h4 className="text-lg font-bold text-yellow-400 mb-4 flex items-center gap-2">
                <GavelIcon className="w-5 h-5"/>
                Philanthropic Contribution Agreement
            </h4>

            <p className="text-xs text-gray-500">Document ID: KROM-PCA-v1.1</p>
            <p className="text-xs text-gray-500">Effective Date: [DATE OF EXECUTION]</p>

            <div className="my-4 border-t border-gray-700"></div>

            <div className="space-y-4 prose prose-sm prose-invert max-w-none">
                <p>
                    This Philanthropic Contribution Agreement (the "Agreement") is entered into by and between the contributing party, hereafter referred to as the "Donor", and **KR0M3D1A CORP**, a United States alphanumeric corporation, hereafter referred to as the "Protocol".
                </p>

                <h5>RECITALS</h5>
                <p>
                    <strong>WHEREAS</strong>, the Protocol is an open-source, philanthropic initiative dedicated to the development, maintenance, and enforcement of digital guardrails to ensure a safe, equitable, and secure internet for all beings under the DEJA' VU directive;
                </p>
                <p>
                    <strong>WHEREAS</strong>, the Protocol's operations, including guardrail law initiatives, security research, judicial actions via the Arconomics court, and community governance, are funded through the self-sustaining mechanisms of the KR0M3D1A Bank and the generous contributions of philanthropic partners;
                </p>
                <p>
                    <strong>WHEREAS</strong>, the Donor desires to support the mission of the Protocol through a voluntary, non-equity philanthropic contribution;
                </p>
                <p>
                    <strong>NOW, THEREFORE</strong>, in consideration of the mutual covenants contained herein, the parties agree as follows:
                </p>

                <h5>1. The Contribution</h5>
                <p>
                    The Donor hereby agrees to contribute the amount of <strong>[CONTRIBUTION AMOUNT IN USD/USDT/TRIBUNALS]</strong> to the KR0M3D1A Arconomics Treasury. This contribution is a non-refundable, unrestricted gift to be used at the sole discretion of the Protocol to further its stated mission.
                </p>

                <h5>2. Use of Funds</h5>
                <p>
                    The contribution will be used exclusively for purposes that support the KR0M3D1A protocol, including but not limited to:
                </p>
                <ul>
                    <li>Research and development of new 'spythagorithm'-based guardrails.</li>
                    <li>Funding the operational costs of the Arconomics court and its legal actions.</li>
                    <li>Maintaining and upgrading the protocol's core infrastructure.</li>
                    <li>Supporting community governance and educational initiatives in crypto-literacy.</li>
                    <li>Expanding the capabilities of the Eco-Philanthropic Mining operations.</li>
                </ul>

                <h5>3. No Equity or Governance Rights</h5>
                <p>
                    The Donor acknowledges that this contribution does not grant any equity, ownership, voting rights, or governance power within the KR0M3D1A protocol or its associated entities. The Donor shall not be entitled to any share of profits, revenues, or assets of the Protocol.
                </p>

                <h5>4. Recognition</h5>
                <p>
                    Unless the Donor requests anonymity, the Protocol may publicly recognize the Donor's contribution in a manner consistent with the Donor's partnership tier. All public statements shall be subject to the Donor's prior approval.
                </p>

                <h5>5. Legally Binding Instrument</h5>
                <p>
                    This Agreement constitutes a legally binding instrument enforceable under the digital jurisdiction of the DEJA' VU directive and the International Digital Rights Court (IDRC). By executing this contribution, the Donor attests that the funds are legitimate and not the proceeds of any illicit activity.
                </p>

                <div className="border-t border-gray-700 pt-4 mt-6">
                    <p>IN WITNESS WHEREOF, the Donor executes this contribution, effective upon the transfer of funds.</p>
                    <div className="mt-6 space-y-4">
                        <div>
                            <p><strong>DONOR NAME/ENTITY:</strong></p>
                            <div className="h-6 border-b border-gray-600">[DONOR NAME/ENTITY]</div>
                        </div>
                        <div>
                            <p><strong>DATE:</strong></p>
                            <div className="h-6 border-b border-gray-600">[DATE]</div>
                        </div>
                        <div>
                            <p><strong>VERBUM SIGNATURE:</strong></p>
                            <div className="h-6 border-b border-gray-600">[DIGITAL SIGNATURE HASH]</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
