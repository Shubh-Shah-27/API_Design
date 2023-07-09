const { body } = require("express-validator");
const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllWorkouts = () => {
  try {
    return DB.workouts;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneWorkout = (workoutId) => {
  try {
    const workout = DB.workouts.find((workout) => workout.id === workoutId);
    if (!workout) {
      console.log("ID not Found");
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }
    return workout;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewWorkout = (newWorkout) => {
try {
    const isAlreadyAdded = DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
    if (isAlreadyAdded) {
      console.log("Workout with same name is already present");
      throw {
        status: 400,
        message: `Workout with the name '${newWorkout.name}' already exists`,
      };
    }

    DB.workouts.push(newWorkout);
    saveToDatabase(DB);
    return newWorkout;
} catch (error) {
  throw { status: error?.status || 500, message: error?.message || error };
}
};

const updateOneWorkout = (workoutId, changes) => {
  try {
    const indexForUpdate = DB.workouts.findIndex(
      (workout) => workout.id === workoutId
    );
    if (indexForUpdate === -1) {
      console.log("ID not Found");
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }
    const updatedWorkout = {
      ...DB.workouts[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    DB.workouts[indexForUpdate] = updatedWorkout;
    saveToDatabase(DB);
    return updatedWorkout;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneWorkout = (workoutId) => {
  // Check if the id already exists in the database
  try {
    const index = DB.workouts.findIndex((workout) => workout.id === workoutId);
    if (index !== -1) {
      // Remove the workout from the array
      const deletedWorkout = DB.workouts.splice(index, 1)[0];
      // Write the updated data back to the database.json file
      saveToDatabase(DB);
      // Return the deleted workout object
      return deletedWorkout;
    }
    console.log("ID not Found");
    throw {
      status: 400,
      message: `Can't find workout with the id '${workoutId}'`,
    };
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};


module.exports = { 
  getAllWorkouts,
  createNewWorkout,
  getOneWorkout,
  deleteOneWorkout,
  updateOneWorkout,
 };