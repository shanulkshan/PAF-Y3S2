package com.example.fitnessserverapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@RestController
public class FitnessServerApiApplication {

    @CrossOrigin(origins = "http://localhost:8080")

    public static void main(String[] args) {
        SpringApplication.run(FitnessServerApiApplication.class, args);
    }

     @Bean
	public WebMvcConfigurer configure() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry reg) {
				reg.addMapping("/**").allowedOrigins("*").allowedMethods("*");;
			}
		};

	}

    @GetMapping("/")
    public String rootEndpoint() {
        return "Hello World!";
    }


}
