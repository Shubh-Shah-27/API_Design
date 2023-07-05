const { body } = require("express-validator");
const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllWorkouts = () => {
  return DB.workouts;
};

const getOneWorkout = (workoutId) => {
  // Check if the id already exists in the database
  const existingWorkout = DB.workouts.find((workout) => workout.id === workoutId);
  // Return the matching workout object if found, otherwise return false
  return existingWorkout || false;
};

const createNewWorkout = (newWorkout) => {
  const isAlreadyAdded = DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
  if (isAlreadyAdded) {
    console.log("Workout with same name is already present");
    return;
  }
  DB.workouts.push(newWorkout);
  saveToDatabase(DB);
  return newWorkout;
};

const deleteOneWorkout = (workoutId) => {
  // Check if the id already exists in the database
  const index = DB.workouts.findIndex((workout) => workout.id === workoutId);
  if (index !== -1) {
    // Remove the workout from the array
    const deletedWorkout = DB.workouts.splice(index, 1)[0];
    console.log("In Database: "+deletedWorkout);
    // Write the updated data back to the database.json file
    saveToDatabase(DB);

    // Return the deleted workout object
    return deletedWorkout;
  }
  console.log("In Database: ID not Found");
  // Return false if the workout with the specified id was not found
  return false;
};

const updateOneWorkout = (workoutId, changes) => {
  const indexForUpdate = DB.workouts.findIndex(
    (workout) => workout.id === workoutId
  );
  if (indexForUpdate === -1) {
    return;
  }
  const updatedWorkout = {
    ...DB.workouts[indexForUpdate],
    ...changes,
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };
  DB.workouts[indexForUpdate] = updatedWorkout;
  saveToDatabase(DB);
  return updatedWorkout;
};


module.exports = { 
  getAllWorkouts,
  createNewWorkout,
  getOneWorkout,
  deleteOneWorkout,
  updateOneWorkout,
 };