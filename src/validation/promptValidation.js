import { z } from 'zod';

export const preferenceSchema = z.object({
    totalDays: z.coerce.number().int().min(1, { message: "Total days must be at least 1" }).max(14, { message: "Total days cannot exceed 14" })
});

const validateTotalDays = (value) => {
    const totalDaysSchema = preferenceSchema.pick({ totalDays: true });
    const result = totalDaysSchema.safeParse({totalDays: value});
    if(!result.success){
        return {status: false, errorData: result.error.flatten().fieldErrors.totalDays?.[0] || "Invalid input"};
    }else{
        return {status: true, data: result.data.totalDays};
    }
}

export const validateField = (id, value) => {
    const handlers = {
        totalDays: validateTotalDays(value) 
    }
    return id ? handlers[id] : null; 
}