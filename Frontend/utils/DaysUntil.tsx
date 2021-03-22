import { differenceInDays } from "date-fns";

const daysUntil = (date?: string | Date | null): string => {

    if (!date) {
        return "";
    }
    const origin = new Date(date);

    const today = new Date();
    const currentYear = today.getFullYear();

    origin.setFullYear(currentYear);
    if (origin < today) {
        origin.setFullYear(currentYear + 1);
    }

    const diff = differenceInDays(origin, today) + 1;

    return ("in " + (diff === 365 ? 0 : diff) + " days");
};

export default daysUntil;
