package com.example.fitnessserverapi.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
   
@Document(collection = "mystatus")
public class Workout {
    
    @Id
    private String id;

    private String workoutState;
    private String description;
    private Date date;
    private List<WorkoutStateDetail> state;

    // Constructor
    public Workout() {
        this.state = new ArrayList<>();
    }

    //parameterized constructor
    public Workout(String workoutState,Date date,String description) {
        this.workoutState = workoutState;
        this.date=date;
        this.description=description;
        this.state = new ArrayList<>();
    }


    // Getters and setters

    //getter for id
    public String getId() {
        return id;
    }

    //setter for id
    public void setId(String id) {
        this.id = id;
    }

    //getter for workoutState
    public String getWorkoutState() {
        return workoutState;
    }

    //setter for workoutState
    public void setWorkoutState(String workoutState) {
        this.workoutState = workoutState;
    }

    //getter for description
    public String getDescription() {
        return description;
    }

    //setter for description
    public void setDescription(String description) {
        this.description = description;
    }

    //getter for date
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public List<WorkoutStateDetail> getState() {
        return state;
    }

    public void setState(List<WorkoutStateDetail> state) {
        this.state = state;
    }

    // Inner class for Workout state detail
    public static record WorkoutStateDetail(String name, float completed, float burend_callary) {}
}
