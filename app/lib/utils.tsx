export function getFilteredListUniqueValues<T>(list: T[], filters: Partial<T>, returnKey: keyof T): string[] {
    const filtered = filterList(list, filters).map(item => String(item[returnKey]));
    return [...new Set(filtered.sort())]
}

export function filterList<T>(list: T[], filters: Partial<T>) {
    return list.filter(item => {
        for (const key of Object.keys(filters)) {
            if (filters[key as keyof typeof item] && item[key as keyof typeof item] != filters[key as keyof typeof item]) {
                return false; // Exclude item if it doesn't match the filter
            }
        }
        return true;
    })
}