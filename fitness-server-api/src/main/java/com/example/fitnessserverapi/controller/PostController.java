package com.example.fitnessserverapi.controller;

import com.example.fitnessserverapi.model.Comment;
import com.example.fitnessserverapi.model.Post;
import com.example.fitnessserverapi.model.Post;
import com.example.fitnessserverapi.repository.PostRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api")
public class PostController {
    private final Path root = Paths.get("uploads");

    @Autowired
    PostRepository postRepository;

    @GetMapping("/posts")
    public ResponseEntity<List<Post>> getAllPosts(@RequestParam(required = false) String title) {
        try {
            List<Post> posts = new ArrayList<Post>();

            if (title == null)
//                posts.addAll(postRepository.findAll());
                postRepository.findAll().forEach(posts::add);
            else
                postRepository.findByTitleContaining(title).forEach(posts::add);

            if (posts.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(posts, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<Object> getPostById(@PathVariable("id") String id) {
        Optional<Post> postData = postRepository.findById(id);

        if (postData.isPresent()) {
            return new ResponseEntity<>(postData.get(), HttpStatus.OK);
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("errorMessage", true);
            response.put("message", "No post found with ID: " + id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @GetMapping("/posts/published")
    public ResponseEntity<List<Post>> findByPublished() {
        try {
            List<Post> posts = postRepository.findByPublished(true);

            if (posts.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(posts, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/posts")
    public ResponseEntity<Post> createPosts(
            @RequestParam("userId") String userId,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("postImages") MultipartFile[] postImages) {
        try {
            System.out.println(Arrays.toString(postImages));

            List<String> fileNames = new ArrayList<>();
            Arrays.stream(postImages).forEach(file -> {
                try {
                    String extension = "";
                    if (file.getOriginalFilename() != null && file.getOriginalFilename().contains(".")) {
                        extension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
                    }
                    // Use UUID to ensure unique filenames
                    String uniqueFileName = UUID.randomUUID().toString() + extension;
                    Files.copy(file.getInputStream(), this.root.resolve(uniqueFileName));
                    fileNames.add(uniqueFileName);
                } catch (IOException e) {
                    // Log error and skip to the next file
                    System.err.println("Error processing file: " + e.getMessage());
                }
            });
            System.out.println("fileNames: " + fileNames);

            Post post = new Post(userId, title, content,fileNames, false);

            Post _post = postRepository.save(post);
            return new ResponseEntity<>(_post, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            Path imagePath = root.resolve(filename);
            Resource resource = new UrlResource(imagePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                HttpHeaders headers = new HttpHeaders();
                headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"");

                return ResponseEntity.ok()
                        .headers(headers)
                        .contentType(MediaType.IMAGE_JPEG) // Adjust to correct MIME type
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build(); // If the file does not exist
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.status(500).body(null); // Error handling
        }
    }

    @PutMapping("/posts/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable("id") String id, @RequestBody Post post) {
        Optional<Post> postData = postRepository.findById(id);

        if (postData.isPresent()) {
            Post _post = postData.get();
            _post.setTitle(post.getTitle());
            _post.setContent(post.getContent());
//            _post.setDescription(post.getDescription() == null ? _post.getDescription() : post.getDescription());
            _post.setPublished(post.isPublished());
            return new ResponseEntity<>(postRepository.save(_post), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/posts/{id}")
    public ResponseEntity<Object> deletePost(@PathVariable("id") String id) {
        try {
            postRepository.deleteById(id);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "post with ID: "+id+" Deleted successfully!");
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/posts")
    public ResponseEntity<HttpStatus> deleteAllPosts() {
        try {
            postRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    
}
