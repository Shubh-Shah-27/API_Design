const DB = require('./db.json');

const getRecordForWorkout= (workoutId) => {
    try {
        const records = DB.records.filter((record) => record.workout === workoutId);
        if(records === null)
        {
            throw{
                status: 400, 
                message : `Can't find record for the WorkOut Id: '${workoutId}'`,
            }
        }
        return records;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
}

module.exports = {
    getRecordForWorkout,
};