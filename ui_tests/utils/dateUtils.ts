import { format } from 'date-fns';

export function formatDateFromNow(daysFromNow: number, strFormat: string = 'd MMMM, yyyy'): string {
    const msInDay = 86_400_000;
    const targetDate = new Date(Date.now() + daysFromNow * msInDay);
    return format(targetDate, strFormat);
}