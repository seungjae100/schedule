import client from "./client";

export const getAllSchedules = async () => {
    try {
        const response = await client.get('/schedules/all');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getSchedule = async (scheduleId) => {
    try {
        const response = await client.get(`/schedules/${scheduleId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const  createSchedule = async (scheduleData) => {
    try {
        const response = await client.post('/schedules', scheduleData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateSchedule = async (scheduleId, updateData) => {
    try {
        const response = await client.put(`/schedules/${scheduleId}`, updateData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getScheduleByPeriod = async (startDate, endDate) => {
    try {
        const response = await client.get('/schedules/period', {
            params: { startDate, endDate }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const searchSchedules = async (keyword) => {
    try {
        const response = await client.get('/schedules/search', {
            params: { keyword }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getSchedulesByCategory = async (category) => {
    try {
        const response = await client.get(`schedules/category/${category}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}