const workout = require("../database/workout");
const { v4: uuid } = require("uuid");


const getAllWorkouts = () => {
    const allWorkouts = workout.getAllWorkouts();
    return allWorkouts;
  };
  
  const getOneWorkout = (workoutId) => {
    const currentWorkout = workout.getOneWorkout(workoutId);
    if(currentWorkout == false)
    {
      console.log("ID not Found");
      return;
    }
    else
    return currentWorkout;
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
    const createdWorkout = workout.createNewWorkout(workoutToInsert);
    return createdWorkout;
  };
  
  const updateOneWorkout = (workoutId, changes) => {
    const updatedWorkout = workout.updateOneWorkout(workoutId, changes);
    return updatedWorkout;
  };
  
  const deleteOneWorkout = (workoutId) => {
      const deletedWorkout = workout.deleteOneWorkout(workoutId);
      if(deletedWorkout == false)
      {
        console.log("In Service: ID not Found");
        return;
      }
      else
      {
        console.log("In Service: "+deletedWorkout);
        return deletedWorkout;
      }
  };
  
  module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout,
  };