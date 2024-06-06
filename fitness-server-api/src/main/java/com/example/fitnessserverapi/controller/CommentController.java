package com.example.fitnessserverapi.controller;

import com.example.fitnessserverapi.model.Comment;
import com.example.fitnessserverapi.model.Post;
import com.example.fitnessserverapi.repository.PostRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CommentController {

    @Autowired
    PostRepository postRepository;

    @PostMapping("/{postId}/comments")
    public ResponseEntity<Post> addComment(@PathVariable String postId, @RequestBody Comment comment) {
        Optional<Post> post = postRepository.findById(postId);

        if (post.isPresent()) {
            Post _post = post.get();

            ObjectId objectId = new ObjectId();
            String objectIdString = objectId.toHexString();

            comment.setCommentId(objectIdString);
            comment.setCreatedAt(LocalDateTime.now());
            comment.setModifiedAt(LocalDateTime.now());
            _post.getComments().add(comment);
            Post updatedPost = postRepository.save(_post);

            return ResponseEntity.ok(updatedPost);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{postId}/comments")
    public ResponseEntity<List<Comment>> getCommentsByPost(@PathVariable String postId) {
        Optional<Post> post = postRepository.findById(postId);

        if (post.isPresent()) {
            Post _post = post.get();
            return ResponseEntity.ok(_post.getComments());
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
