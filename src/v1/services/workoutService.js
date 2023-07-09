const workout = require("../database/workout");
const { v4: uuid } = require("uuid");


const getAllWorkouts = () => {
  try {
    const allWorkouts = workout.getAllWorkouts();
    return allWorkouts;
  } catch (error) {
    throw error;
  }
  };
  
  const getOneWorkout = (workoutId) => {
    try {
          const currentWorkout = workout.getOneWorkout(workoutId);
          return currentWorkout;
    } catch (error) {
      throw error;
    }
  };
  
  const createNewWorkout = (newWorkout) => {
    const workoutToInsert = {
      // The spread operator (...) is used to merge the properties of the newWorkout object into the workoutToInsert object. 
      // This ensures that the properties from newWorkout are included in workoutToInsert.
      ...newWorkout,
      id: uuid(),
      createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    try {
      const createdWorkout = workout.createNewWorkout(workoutToInsert);
      return createdWorkout;
    } catch (error) {
      throw error;
    }
  };
  
  const updateOneWorkout = (workoutId, changes) => {
    try {
      const updatedWorkout = workout.updateOneWorkout(workoutId, changes);
      return updatedWorkout;
    } catch (error) {
      throw error;
    }
  };
  
  const deleteOneWorkout = (workoutId) => {
      try {
        const deletedWorkout = workout.deleteOneWorkout(workoutId);
        return deletedWorkout;
      } catch (error) {
        throw error;
      }
  };
  
  module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout,
  };