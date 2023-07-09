const express = require("express");
// const bodyParser = require("body-parser");
const v1WorkoutRouter = require("./v1/routes/workoutRoutes");

const app = express();

// process.env.PORT: This accesses the value of the PORT environment variable using the process.env object. The process.env object holds all environment variables defined in the current environment.
const PORT = process.env.PORT || 3000; 

// app.use(bodyParser.json()); -> No need for body-parser
app.use(express.json()) // Express Version >= 4.16.0

// Any request made to routes starting with "/api/v1/workouts" will be handled by the v1WorkoutRouter.
app.use("/api/v1/workouts", v1WorkoutRouter);

app.listen(PORT, () => {
-    console.log(`API is listening on port ${PORT}`); 
});