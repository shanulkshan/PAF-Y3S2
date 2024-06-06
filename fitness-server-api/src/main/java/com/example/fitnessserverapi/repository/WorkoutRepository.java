package com.example.fitnessserverapi.repository;

import org.springframework.stereotype.Repository;

import com.example.fitnessserverapi.model.Workout;

import org.springframework.data.mongodb.repository.MongoRepository;

@Repository
// This interface represents a repository for Workout entities. It extends MongoRepository, which provides basic CRUD operations for MongoDB.
public interface WorkoutRepository extends MongoRepository<Workout, String> {
    // No additional methods are defined here because MongoRepository already provides methods for basic CRUD operations.
}
