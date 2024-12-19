import client from './client';

// 일정 생성
export const createSchedule = async (scheduleData) => {
    const response = await client.post('/schedules', scheduleData);
    return response.data;
};

// 일정 수정
export const updateSchedule = async (scheduleId, updateData) => {
    const response = await client.put(`/schedules/${scheduleId}`, updateData);
    return response.data;
};

// 일정 삭제
export const deleteSchedule = async (scheduleId) => {
    await client.delete(`/schedules/${scheduleId}`);
};

// 전체 일정 조회
export const getAllSchedules = async () => {
    const response = await client.get('/schedules/all');
    return response.data;
};

// 기간별 일정 조회
export const getSchedulesByPeriod = async (startDate, endDate) => {
    const response = await client.get('/schedules/period', {
        params: { startDate, endDate }
    });
    return response.data;
};