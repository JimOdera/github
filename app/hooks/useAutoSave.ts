import { useEffect, useRef, useCallback } from 'react';

export const useAutoSave = <T>(
    saveFunction: (data: T) => Promise<void> | void,
    data: T,
    debounceTime: number = 800
) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastSavedRef = useRef<T>(data);
    const isInitialMount = useRef(true);

    const debouncedSave = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            // Only save if data has actually changed
            if (JSON.stringify(data) !== JSON.stringify(lastSavedRef.current)) {
                saveFunction(data);
                lastSavedRef.current = JSON.parse(JSON.stringify(data)); // Deep clone
            }
        }, debounceTime);
    }, [data, saveFunction, debounceTime]);

    // Auto-save on data changes
    useEffect(() => {
        // Don't save on initial mount
        if (isInitialMount.current) {
            isInitialMount.current = false;
            lastSavedRef.current = JSON.parse(JSON.stringify(data));
            return;
        }

        debouncedSave();

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [data, debouncedSave]);

    // Manual save function
    const manualSave = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        saveFunction(data);
        lastSavedRef.current = JSON.parse(JSON.stringify(data));
    }, [data, saveFunction]);

    return { manualSave };
};