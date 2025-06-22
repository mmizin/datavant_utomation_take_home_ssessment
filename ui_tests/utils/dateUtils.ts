import { format } from 'date-fns';

export const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];


export function formatDateFromNow(daysFromNow: number, strFormat: string = 'd MMMM, yyyy'): string {
    const msInDay = 86_400_000;
    const targetDate = new Date(Date.now() + daysFromNow * msInDay);
    return format(targetDate, strFormat);
}
