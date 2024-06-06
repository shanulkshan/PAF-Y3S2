package com.example.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;



public class WorkoutService {
        
        @Id
        private String id;
    
        private String workoutState;
        private String description;
        private Date date;
        private List<WorkoutStateDetail> state;
    
        // Constructor
        public WorkoutService() {
            this.state = new ArrayList<>();
        }

        public WorkoutService(String workoutState,Date date,String description) {
            this.workoutState = workoutState;
            this.date=date;
            this.description=description;
            this.state = new ArrayList<>();
        }
    
    
        // Getters and setters
        public String getId() {
            return id;
        }
    
        public void setId(String id) {
            this.id = id;
        }
    
        public String getWorkoutState() {
            return workoutState;
        }
    
        public void setWorkoutState(String workoutState) {
            this.workoutState = workoutState;
        }
    
        public String getDescription() {
            return description;
        }
    
        public void setDescription(String description) {
            this.description = description;
        }
    
        public Date getDate() {
            return date;
        }
    
        public void setDate(Date date) {
            this.date = date;
        }
    
        //getter for arraylist    
        public List<WorkoutStateDetail> getState() {
            return state;
        }
        
        //setter for arraylist
        public void setState(List<WorkoutStateDetail> state) {
            this.state = state;
        }
    
        // Inner class for Workout state detail
        public static record WorkoutStateDetail(String name, float completed, float burend_callary) {}
    }
    