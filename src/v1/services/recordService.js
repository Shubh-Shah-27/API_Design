const record = require('../database/record');

const getRecordForWorkout = (workoutId) => {
    try {
        const records = record.getRecordForWorkout(workoutId);
        return records;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getRecordForWorkout,
};