import { useState, useEffect, useCallback } from 'react';

export const useActivityDraft = <T>(activityId: string, step: number, initialData: T) => {
    const storageKey = `activityDraft_${activityId}_step${step}`;
    
    // Also save to a consolidated draft
    const draftKey = `activityDraft_${activityId}_complete`;
    
    const [data, setData] = useState<T>(initialData);
    const [isSaving, setIsSaving] = useState(false);

    // Load on mount
    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            try {
                setData(JSON.parse(saved));
            } catch (e) {
                console.warn(`Failed to load draft for step ${step}`);
            }
        }
    }, [storageKey, step]);

    // Save function
    const saveDraft = useCallback(async (newData: T) => {
        setIsSaving(true);
        
        try {
            // Save step data
            localStorage.setItem(storageKey, JSON.stringify(newData));
            
            // Also update consolidated draft
            const completeDraft = JSON.parse(localStorage.getItem(draftKey) || '{}');
            completeDraft[`step${step}`] = newData;
            completeDraft.lastUpdated = new Date().toISOString();
            localStorage.setItem(draftKey, JSON.stringify(completeDraft));
            
            // Update in-memory data
            setData(newData);
        } catch (error) {
            console.error('Failed to save draft:', error);
        } finally {
            setIsSaving(false);
        }
    }, [storageKey, draftKey, step]);

    // Auto-save on changes
    useEffect(() => {
        if (JSON.stringify(data) !== JSON.stringify(initialData)) {
            const timeoutId = setTimeout(() => {
                saveDraft(data);
            }, 500); // Debounce 500ms
            
            return () => clearTimeout(timeoutId);
        }
    }, [data, saveDraft, initialData]);

    return {
        data,
        setData,
        isSaving,
        saveDraft
    };
};