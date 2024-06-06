package com.example.fitnessserverapi.repository;

import com.example.fitnessserverapi.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PostRepository extends MongoRepository<Post, String> {
    List<Post> findByTitleContaining(String title);
    List<Post> findByPublished(boolean published);
}
