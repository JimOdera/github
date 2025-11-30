'use client';

import React, { useState } from 'react';

const HumanRights = () => {
    const [policyInPlace, setPolicyInPlace] = useState<boolean | null>(null);
    const [assessmentConducted, setAssessmentConducted] = useState<boolean | null>(null);

    return (
        <form className="w-full mx-auto px-0 py-0 flex-1 space-y-6">
            
            {/* Policy in place? */}
            <div className="mb-6">
                <p className="text-xs text-gray-700 mb-2 font-medium">
                    Policy in place?*
                </p>
                <div className="flex gap-3 mb-4">
                    <button
                        type="button"
                        onClick={() => setPolicyInPlace((v) => (v === true ? null : true))}
                        className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                            policyInPlace === true
                                ? 'bg-green-100 border-green-500'
                                : 'hover:bg-gray-50 border-gray-300'
                        } focus:outline-none focus:border-green-500`}
                    >
                        Yes
                    </button>
                    <button
                        type="button"
                        onClick={() => setPolicyInPlace((v) => (v === false ? null : false))}
                        className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                            policyInPlace === false
                                ? 'bg-red-100 border-red-500'
                                : 'hover:bg-gray-50 border-gray-300'
                        } focus:outline-none focus:border-red-500`}
                    >
                        No
                    </button>
                </div>
            </div>

            {/* Recent Assessment conducted? */}
            <div className="mb-6">
                <p className="text-xs text-gray-700 mb-2 font-medium">
                    Recent Assessment conducted?*
                </p>
                <div className="flex gap-3 mb-4">
                    <button
                        type="button"
                        onClick={() => setAssessmentConducted((v) => (v === true ? null : true))}
                        className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                            assessmentConducted === true
                                ? 'bg-green-100 border-green-500'
                                : 'hover:bg-gray-50 border-gray-300'
                        } focus:outline-none focus:border-green-500`}
                    >
                        Yes
                    </button>
                    <button
                        type="button"
                        onClick={() => setAssessmentConducted((v) => (v === false ? null : false))}
                        className={`px-4 py-2 rounded-lg border text-xs font-medium text-gray-500 transition-all duration-200 ${
                            assessmentConducted === false
                                ? 'bg-red-100 border-red-500'
                                : 'hover:bg-gray-50 border-gray-300'
                        } focus:outline-none focus:border-red-500`}
                    >
                        No
                    </button>
                </div>
            </div>

            {/* Grievances logged [Human Rights Related] */}
            <div className="mb-6">
                <p className="text-xs text-gray-700 mb-2 font-medium">
                    Grievances logged [Human Rights Related]*
                </p>
                <textarea
                    className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                    placeholder="List any grievances logged (e.g., discrimination, forced labor, etc.)"
                    name="grievancesLogged"
                    required
                />
            </div>

            {/* Remediation Actions Taken */}
            <div className="mb-6">
                <p className="text-xs text-gray-700 mb-2 font-medium">
                    Remediation Actions Taken*
                </p>
                <textarea
                    className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                    placeholder="Describe actions taken to address grievances or risks"
                    name="remediationActions"
                    required
                />
            </div>
        </form>
    );
};

export default HumanRights;