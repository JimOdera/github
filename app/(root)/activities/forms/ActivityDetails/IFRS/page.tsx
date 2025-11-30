'use client';

import React, { useState } from 'react';

const IFRS = () => {
    // General Sustainability-Related Disclosure
    const [genGovDisclosed, setGenGovDisclosed] = useState<boolean | null>(null);
    const [stratDisclosed, setStratDisclosed] = useState<boolean | null>(null);
    const [riskOppDisclosed, setRiskOppDisclosed] = useState<boolean | null>(null);
    const [metricsTargetsDisclosed, setMetricsTargetsDisclosed] = useState<boolean | null>(null);

    // Climate-Related Disclosures
    const [climGovDisclosed, setClimGovDisclosed] = useState<boolean | null>(null);
    const [climStratDisclosed, setClimStratDisclosed] = useState<boolean | null>(null);
    const [climRiskDisclosed, setClimRiskDisclosed] = useState<boolean | null>(null);
    const [ghgDisclosed, setGhgDisclosed] = useState<boolean | null>(null);
    const [climTargetsDisclosed, setClimTargetsDisclosed] = useState<boolean | null>(null);

    // IFRS Assurance Status
    const [assuranceGovDisclosed, setAssuranceGovDisclosed] = useState<boolean | null>(null);

    return (
        <form className="w-full mx-auto px-0 py-0 flex-1 space-y-6">
            
            {/* Governance of sustainability */}
            <div className="mb-6">
                <p className="text-xs text-gray-700 mb-2 font-medium">Governance of sustainability</p>
                <div className="mb-4">
                    <p className="text-xs text-gray-700 mb-2">Is this disclosed?*</p>
                    <div className="flex gap-3 mb-3">
                        <button
                            type="button"
                            onClick={() => setGenGovDisclosed((v) => (v === true ? null : true))}
                            className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                                genGovDisclosed === true
                                    ? 'bg-green-100 border-green-500'
                                    : 'hover:bg-gray-50 border-gray-300'
                            } focus:outline-none focus:border-green-500`}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            onClick={() => setGenGovDisclosed((v) => (v === false ? null : false))}
                            className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                                genGovDisclosed === false
                                    ? 'bg-red-100 border-red-500'
                                    : 'hover:bg-gray-50 border-gray-300'
                            } focus:outline-none focus:border-red-500`}
                        >
                            No
                        </button>
                    </div>
                </div>

                <div className="mb-3">
                    <p className="text-xs text-gray-700 mb-2 font-medium">Data Source/Reference*</p>
                    <input
                        type="text"
                        className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                        placeholder="e.g., Annual Report p.45"
                        name="genGovSource"
                        required
                    />
                </div>

                <div>
                    <p className="text-xs text-gray-700 mb-2 font-medium">Comments or Gaps*</p>
                    <textarea
                        className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                        placeholder="Any gaps, notes, or context"
                        name="genGovComments"
                        required
                    />
                </div>
            </div>

            {/* Sustainability Strategy */}
            <div className="mb-6">
                <p className="text-xs text-gray-700 mb-2 font-medium">Sustainability Strategy</p>
                <div className="mb-4">
                    <p className="text-xs text-gray-700 mb-2">Is this disclosed?*</p>
                    <div className="flex gap-3 mb-3">
                        <button
                            type="button"
                            onClick={() => setStratDisclosed((v) => (v === true ? null : true))}
                            className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                                stratDisclosed === true
                                    ? 'bg-green-100 border-green-500'
                                    : 'hover:bg-gray-50 border-gray-300'
                            } focus:outline-none focus:border-green-500`}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            onClick={() => setStratDisclosed((v) => (v === false ? null : false))}
                            className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                                stratDisclosed === false
                                    ? 'bg-red-100 border-red-500'
                                    : 'hover:bg-gray-50 border-gray-300'
                            } focus:outline-none focus:border-red-500`}
                        >
                            No
                        </button>
                    </div>
                </div>

                <div className="mb-3">
                    <p className="text-xs text-gray-700 mb-2 font-medium">Data Source/Reference*</p>
                    <input
                        type="text"
                        className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                        placeholder="e.g., Sustainability Report p.12"
                        name="stratSource"
                        required
                    />
                </div>

                <div>
                    <p className="text-xs text-gray-700 mb-2 font-medium">Comments or Gaps*</p>
                    <textarea
                        className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                        placeholder="Any gaps, notes, or context"
                        name="stratComments"
                        required
                    />
                </div>
            </div>

            {/* Risk & Opportunity Management */}
            <div className="mb-6">
                <p className="text-xs text-gray-700 mb-2 font-medium">Risk & Opportunity Management</p>
                <div className="mb-4">
                    <p className="text-xs text-gray-700 mb-2">Is this disclosed?*</p>
                    <div className="flex gap-3 mb-3">
                        <button
                            type="button"
                            onClick={() => setRiskOppDisclosed((v) => (v === true ? null : true))}
                            className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                                riskOppDisclosed === true
                                    ? 'bg-green-100 border-green-500'
                                    : 'hover:bg-gray-50 border-gray-300'
                            } focus:outline-none focus:border-green-500`}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            onClick={() => setRiskOppDisclosed((v) => (v === false ? null : false))}
                            className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                                riskOppDisclosed === false
                                    ? 'bg-red-100 border-red-500'
                                    : 'hover:bg-gray-50 border-gray-300'
                            } focus:outline-none focus:border-red-500`}
                        >
                            No
                        </button>
                    </div>
                </div>

                <div className="mb-3">
                    <p className="text-xs text-gray-700 mb-2 font-medium">Data Source/Reference*</p>
                    <input
                        type="text"
                        className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                        placeholder="e.g., Risk Register, p.8"
                        name="riskOppSource"
                        required
                    />
                </div>

                <div>
                    <p className="text-xs text-gray-700 mb-2 font-medium">Comments or Gaps*</p>
                    <textarea
                        className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                        placeholder="Any gaps, notes, or context"
                        name="riskOppComments"
                        required
                    />
                </div>
            </div>

            {/* Metrics and targets */}
            <div className="mb-6">
                <p className="text-xs text-gray-700 mb-2 font-medium">Metrics and targets</p>
                <div className="mb-4">
                    <p className="text-xs text-gray-700 mb-2">Is this disclosed?*</p>
                    <div className="flex gap-3 mb-3">
                        <button
                            type="button"
                            onClick={() => setMetricsTargetsDisclosed((v) => (v === true ? null : true))}
                            className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                                metricsTargetsDisclosed === true
                                    ? 'bg-green-100 border-green-500'
                                    : 'hover:bg-gray-50 border-gray-300'
                            } focus:outline-none focus:border-green-500`}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            onClick={() => setMetricsTargetsDisclosed((v) => (v === false ? null : false))}
                            className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                                metricsTargetsDisclosed === false
                                    ? 'bg-red-100 border-red-500'
                                    : 'hover:bg-gray-50 border-gray-300'
                            } focus:outline-none focus:border-red-500`}
                        >
                            No
                        </button>
                    </div>
                </div>

                <div className="mb-3">
                    <p className="text-xs text-gray-700 mb-2 font-medium">Data Source/Reference*</p>
                    <input
                        type="text"
                        className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                        placeholder="e.g., ESG Dashboard"
                        name="metricsTargetsSource"
                        required
                    />
                </div>

                <div>
                    <p className="text-xs text-gray-700 mb-2 font-medium">Comments or Gaps*</p>
                    <textarea
                        className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                        placeholder="Any gaps, notes, or context"
                        name="metricsTargetsComments"
                        required
                    />
                </div>
            </div>

            <hr className="border-t border-gray-200 my-8" />

            {/* ---------- Climate-Related Disclosures ---------- */}
            <h1 className="text-lg font-medium text-gray-600 mb-6">
                Climate-Related Disclosures
            </h1>

            {/* Climate Governance */}
            <div className="mb-6">
                <p className="text-xs text-gray-700 mb-2 font-medium">Climate Governance</p>
                <div className="mb-4">
                    <p className="text-xs text-gray-700 mb-2">Is this disclosed?*</p>
                    <div className="flex gap-3 mb-3">
                        <button
                            type="button"
                            onClick={() => setClimGovDisclosed((v) => (v === true ? null : true))}
                            className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                                climGovDisclosed === true
                                    ? 'bg-green-100 border-green-500'
                                    : 'hover:bg-gray-50 border-gray-300'
                            } focus:outline-none focus:border-green-500`}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            onClick={() => setClimGovDisclosed((v) => (v === false ? null : false))}
                            className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                                climGovDisclosed === false
                                    ? 'bg-red-100 border-red-500'
                                    : 'hover:bg-gray-50 border-gray-300'
                            } focus:outline-none focus:border-red-500`}
                        >
                            No
                        </button>
                    </div>
                </div>

                <div className="mb-3">
                    <p className="text-xs text-gray-700 mb-2 font-medium">Data Source/Reference*</p>
                    <input
                        type="text"
                        className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                        placeholder="e.g., TCFD Report p.10"
                        name="climGovSource"
                        required
                    />
                </div>

                <div>
                    <p className="text-xs text-gray-700 mb-2 font-medium">Comments or Gaps*</p>
                    <textarea
                        className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                        placeholder="Any gaps, notes, or context"
                        name="climGovComments"
                        required
                    />
                </div>
            </div>

            {/* Climate Strategy & Scenario Analysis */}
            <div className="mb-6">
                <p className="text-xs text-gray-700 mb-2 font-medium">Climate Strategy & Scenario Analysis</p>
                <div className="mb-4">
                    <p className="text-xs text-gray-700 mb-2">Is this disclosed?*</p>
                    <div className="flex gap-3 mb-3">
                        <button
                            type="button"
                            onClick={() => setClimStratDisclosed((v) => (v === true ? null : true))}
                            className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                                climStratDisclosed === true
                                    ? 'bg-green-100 border-green-500'
                                    : 'hover:bg-gray-50 border-gray-300'
                            } focus:outline-none focus:border-green-500`}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            onClick={() => setClimStratDisclosed((v) => (v === false ? null : false))}
                            className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                                climStratDisclosed === false
                                    ? 'bg-red-100 border-red-500'
                                    : 'hover:bg-gray-50 border-gray-300'
                            } focus:outline-none focus:border-red-500`}
                        >
                            No
                        </button>
                    </div>
                </div>

                <div className="mb-3">
                    <p className="text-xs text-gray-700 mb-2 font-medium">Data Source/Reference*</p>
                    <input
                        type="text"
                        className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                        placeholder="e.g., Climate Risk Assessment"
                        name="climStratSource"
                        required
                    />
                </div>

                <div>
                    <p className="text-xs text-gray-700 mb-2 font-medium">Comments or Gaps*</p>
                    <textarea
                        className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                        placeholder="Any gaps, notes, or context"
                        name="climStratComments"
                        required
                    />
                </div>
            </div>

            {/* Climate Risk Management */}
            <div className="mb-6">
                <p className="text-xs text-gray-700 mb-2 font-medium">Climate Risk Management</p>
                <div className="mb-4">
                    <p className="text-xs text-gray-700 mb-2">Is this disclosed?*</p>
                    <div className="flex gap-3 mb-3">
                        <button
                            type="button"
                            onClick={() => setClimRiskDisclosed((v) => (v === true ? null : true))}
                            className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                                climRiskDisclosed === true
                                    ? 'bg-green-100 border-green-500'
                                    : 'hover:bg-gray-50 border-gray-300'
                            } focus:outline-none focus:border-green-500`}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            onClick={() => setClimRiskDisclosed((v) => (v === false ? null : false))}
                            className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                                climRiskDisclosed === false
                                    ? 'bg-red-100 border-red-500'
                                    : 'hover:bg-gray-50 border-gray-300'
                            } focus:outline-none focus:border-red-500`}
                        >
                            No
                        </button>
                    </div>
                </div>

                <div className="mb-3">
                    <p className="text-xs text-gray-700 mb-2 font-medium">Data Source/Reference*</p>
                    <input
                        type="text"
                        className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                        placeholder="e.g., Risk Register"
                        name="climRiskSource"
                        required
                    />
                </div>

                <div>
                    <p className="text-xs text-gray-700 mb-2 font-medium">Comments or Gaps*</p>
                    <textarea
                        className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                        placeholder="Any gaps, notes, or context"
                        name="climRiskComments"
                        required
                    />
                </div>
            </div>

            {/* GHG emissions (scope 1,2 & 3) */}
            <div className="mb-6">
                <p className="text-xs text-gray-700 mb-2 font-medium">GHG emissions (scope 1,2 & 3)</p>
                <div className="mb-4">
                    <p className="text-xs text-gray-700 mb-2">Is this disclosed?*</p>
                    <div className="flex gap-3 mb-3">
                        <button
                            type="button"
                            onClick={() => setGhgDisclosed((v) => (v === true ? null : true))}
                            className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                                ghgDisclosed === true
                                    ? 'bg-green-100 border-green-500'
                                    : 'hover:bg-gray-50 border-gray-300'
                            } focus:outline-none focus:border-green-500`}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            onClick={() => setGhgDisclosed((v) => (v === false ? null : false))}
                            className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                                ghgDisclosed === false
                                    ? 'bg-red-100 border-red-500'
                                    : 'hover:bg-gray-50 border-gray-300'
                            } focus:outline-none focus:border-red-500`}
                        >
                            No
                        </button>
                    </div>
                </div>

                <div className="mb-3">
                    <p className="text-xs text-gray-700 mb-2 font-medium">Data Source/Reference*</p>
                    <input
                        type="text"
                        className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                        placeholder="e.g., CDP Submission"
                        name="ghgSource"
                        required
                    />
                </div>

                <div>
                    <p className="text-xs text-gray-700 mb-2 font-medium">Comments or Gaps*</p>
                    <textarea
                        className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                        placeholder="Any gaps, notes, or context"
                        name="ghgComments"
                        required
                    />
                </div>
            </div>

            {/* Climate targets */}
            <div className="mb-6">
                <p className="text-xs text-gray-700 mb-2 font-medium">Climate targets</p>
                <div className="mb-4">
                    <p className="text-xs text-gray-700 mb-2">Is this disclosed?*</p>
                    <div className="flex gap-3 mb-3">
                        <button
                            type="button"
                            onClick={() => setClimTargetsDisclosed((v) => (v === true ? null : true))}
                            className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                                climTargetsDisclosed === true
                                    ? 'bg-green-100 border-green-500'
                                    : 'hover:bg-gray-50 border-gray-300'
                            } focus:outline-none focus:border-green-500`}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            onClick={() => setClimTargetsDisclosed((v) => (v === false ? null : false))}
                            className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                                climTargetsDisclosed === false
                                    ? 'bg-red-100 border-red-500'
                                    : 'hover:bg-gray-50 border-gray-300'
                            } focus:outline-none focus:border-red-500`}
                        >
                            No
                        </button>
                    </div>
                </div>

                <div className="mb-3">
                    <p className="text-xs text-gray-700 mb-2 font-medium">Data Source/Reference*</p>
                    <input
                        type="text"
                        className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                        placeholder="e.g., Net Zero Plan"
                        name="climTargetsSource"
                        required
                    />
                </div>

                <div>
                    <p className="text-xs text-gray-700 mb-2 font-medium">Comments or Gaps*</p>
                    <textarea
                        className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                        placeholder="Any gaps, notes, or context"
                        name="climTargetsComments"
                        required
                    />
                </div>
            </div>

            <hr className="border-t border-gray-200 my-8" />

            {/* ---------- IFRS Assurance Status ---------- */}
            <h1 className="text-lg font-medium text-gray-600 mb-6">
                IFRS Assurance Status
            </h1>

            {/* Governance of sustainability (Assurance) */}
            <div className="mb-6">
                <p className="text-xs text-gray-700 mb-2 font-medium">Governance of sustainability</p>
                <div className="mb-4">
                    <p className="text-xs text-gray-700 mb-2">Is this disclosed?*</p>
                    <div className="flex gap-3 mb-3">
                        <button
                            type="button"
                            onClick={() => setAssuranceGovDisclosed((v) => (v === true ? null : true))}
                            className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                                assuranceGovDisclosed === true
                                    ? 'bg-green-100 border-green-500'
                                    : 'hover:bg-gray-50 border-gray-300'
                            } focus:outline-none focus:border-green-500`}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            onClick={() => setAssuranceGovDisclosed((v) => (v === false ? null : false))}
                            className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                                assuranceGovDisclosed === false
                                    ? 'bg-red-100 border-red-500'
                                    : 'hover:bg-gray-50 border-gray-300'
                            } focus:outline-none focus:border-red-500`}
                        >
                            No
                        </button>
                    </div>
                </div>

                <div className="mb-3">
                    <p className="text-xs text-gray-700 mb-2 font-medium">Data Source/Reference*</p>
                    <input
                        type="text"
                        className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                        placeholder="e.g., Auditor Statement"
                        name="assuranceGovSource"
                        required
                    />
                </div>

                <div>
                    <p className="text-xs text-gray-700 mb-2 font-medium">Comments or Gaps*</p>
                    <textarea
                        className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                        placeholder="Any gaps, notes, or context"
                        name="assuranceGovComments"
                        required
                    />
                </div>
            </div>
        </form>
    );
};

export default IFRS;