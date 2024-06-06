package com.example.fitnessserverapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import com.example.fitnessserverapi.model.Workout;
import com.example.fitnessserverapi.repository.WorkoutRepository;
import com.example.service.WorkoutService;

@RestController
public class WorkoutController {

    // Autowire WorkoutRepository
    private final WorkoutRepository workoutRepository;

    @Autowired
    public WorkoutController(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    // Endpoint to retrieve all workouts
    @GetMapping("/Workout")
    public ResponseEntity<List<Workout>> getAllWorkout() {
        return ResponseEntity.ok(this.workoutRepository.findAll());
    }

    // Endpoint to create a new workout
    @PostMapping("/Workout")
    public ResponseEntity<Workout> createWorkout(@RequestBody Workout workout) {
        // Save the new workout and return it with status 201 Created
        return ResponseEntity.status(201).body(this.workoutRepository.save(workout));
    }

    // Endpoint to retrieve a workout by its ID
    @GetMapping("/Workout/{id}")
    public ResponseEntity getWorkoutByID(@PathVariable String id) {
        Optional<Workout> optionalWorkout = this.workoutRepository.findById(id);

        if (optionalWorkout.isPresent()) {
            // If the workout is found, return it
            return ResponseEntity.ok(optionalWorkout.get());
        } else {
            // If the workout is not found, return a message
            return ResponseEntity.ok("The workout with ID " + id + " was not found");
        }
    }

    // Endpoint to delete a workout by its ID
    @DeleteMapping("/Workout/{id}")
    public ResponseEntity deleteWorkoutByID(@PathVariable String id) {
        Optional<Workout> optionalWorkout = this.workoutRepository.findById(id);

        if (optionalWorkout.isPresent()) {
            // If the workout is found, delete it and return a success message
            this.workoutRepository.deleteById(id);
            return ResponseEntity.ok("Workout with ID " + id + " deleted successfully");
        } else {
            // If the workout is not found, return a message
            return ResponseEntity.ok("The workout with ID " + id + " was not found");
        }
    }

    // Endpoint to update a workout by its ID
    @PutMapping("/Workout/{id}")
    public ResponseEntity<?> updateWorkout(@PathVariable String id, @RequestBody Workout updatedWorkout) {
        Optional<Workout> optionalWorkout = this.workoutRepository.findById(id);
        if (optionalWorkout.isPresent()) {
            // If the workout is found, update its values and return the updated workout
            Workout workout = optionalWorkout.get();
            workout.setWorkoutState(updatedWorkout.getWorkoutState());
            workout.setDescription(updatedWorkout.getDescription());
            workout.setDate(updatedWorkout.getDate());
            workout.setState(updatedWorkout.getState());
            return ResponseEntity.ok(this.workoutRepository.save(workout));
        } else {
            // If the workout is not found, return 404 Not Found
            return ResponseEntity.notFound().build();
        }
    }
}
