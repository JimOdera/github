'use client';

import React, { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';

interface CustomMetric {
    id: string;
    name: string;
    value: string;
    target: string;
    source: string;
}

const MetricTracker = () => {
    const [metrics, setMetrics] = useState<CustomMetric[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        value: '',
        target: '',
        source: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddMetric = () => {
        if (!formData.name || !formData.target) return;

        const newMetric: CustomMetric = {
            id: Date.now().toString(),
            name: formData.name,
            value: formData.value,
            target: formData.target,
            source: formData.source,
        };

        setMetrics((prev) => [...prev, newMetric]);
        setFormData({ name: '', value: '', target: '', source: '' });
        setIsAdding(false);
    };

    const handleRemoveMetric = (id: string) => {
        setMetrics((prev) => prev.filter((m) => m.id !== id));
    };

    return (
        <form className="w-full mx-auto px-0 py-0 flex-1 space-y-6">
          
            {/* Add Button */}
            {!isAdding && (
                <button
                    type="button"
                    onClick={() => setIsAdding(true)}
                    className="flex items-center gap-2 px-5 py-2 bg-[#044D5E] hover:bg-[#044D5E]/90 text-xs text-white rounded-lg transition-all duration-300"
                >
                    <Plus size={16} />
                    Add another custom Metric
                </button>
            )}

            {/* Add Form */}
            {isAdding && (
                <div className="border border-gray-200 rounded-lg p-6 space-y-6 bg-white">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium text-gray-700">Add Custom Metric</p>
                        <button
                            type="button"
                            onClick={() => setIsAdding(false)}
                            className="text-xs text-gray-500 hover:text-gray-700 transition"
                        >
                            Cancel
                        </button>
                    </div>

                    {/* Metric Name */}
                    <div>
                        <p className="text-xs text-gray-700 mb-2 font-medium">Metric Name*</p>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                            placeholder="e.g., Renewable Energy Usage"
                            required
                        />
                    </div>

                    {/* Value */}
                    <div>
                        <p className="text-xs text-gray-700 mb-2 font-medium">Value</p>
                        <input
                            type="text"
                            name="value"
                            value={formData.value}
                            onChange={handleInputChange}
                            className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                            placeholder="e.g., 45%"
                        />
                    </div>

                    {/* Target */}
                    <div>
                        <p className="text-xs text-gray-700 mb-2 font-medium">Target*</p>
                        <input
                            type="text"
                            name="target"
                            value={formData.target}
                            onChange={handleInputChange}
                            className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-400 transition"
                            placeholder="e.g., 60% by 2030"
                            required
                        />
                    </div>

                    {/* Source/Notes */}
                    <div>
                        <p className="text-xs text-gray-700 mb-2 font-medium">Source/Notes*</p>
                        <textarea
                            name="source"
                            value={formData.source}
                            onChange={handleInputChange}
                            className="w-full h-24 text-xs border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-gray-400 transition"
                            placeholder="e.g., Internal energy audit, Q3 2025"
                            required
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="button"
                        onClick={handleAddMetric}
                        disabled={!formData.name || !formData.target}
                        className="w-full mt-4 bg-[#044D5E] hover:bg-[#044D5E]/90 text-xs text-white px-5 py-2 rounded-lg transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        Add Metric
                    </button>
                </div>
            )}

            {/* Metrics Table */}
            {metrics.length > 0 && (
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full text-xs text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-5 py-3 font-medium text-gray-700">Metric Name</th>
                                <th className="px-5 py-3 font-medium text-gray-700">Value</th>
                                <th className="px-5 py-3 font-medium text-gray-700">Target</th>
                                <th className="px-5 py-3 font-medium text-gray-700">Source/Notes</th>
                                <th className="px-5 py-3 w-10"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {metrics.map((metric) => (
                                <tr key={metric.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                    <td className="px-5 py-3 text-gray-800 font-medium">{metric.name}</td>
                                    <td className="px-5 py-3 text-gray-600">{metric.value || '-'}</td>
                                    <td className="px-5 py-3 text-gray-800">{metric.target}</td>
                                    <td className="px-5 py-3 text-gray-600 max-w-xs truncate">
                                        {metric.source}
                                    </td>
                                    <td className="px-5 py-3 text-center">
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveMetric(metric.id)}
                                            className="text-red-500 hover:text-red-700 transition"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Empty State */}
            {!isAdding && metrics.length === 0 && (
                <p className="text-center text-xs text-gray-500 py-8">
                    {'No custom metrics added yet. Click "Add another custom Metric" to start.'}
                </p>
            )}
        </form>
    );
};

export default MetricTracker;