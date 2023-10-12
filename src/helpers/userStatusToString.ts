export const getStatusText = (isActive: boolean): string => {
    return isActive ? 'Aktywny' : 'Nieaktywny';
};