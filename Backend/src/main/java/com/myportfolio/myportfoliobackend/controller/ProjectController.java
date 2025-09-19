package com.myportfolio.myportfoliobackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myportfolio.myportfoliobackend.model.Project;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @GetMapping("/top")
    public List<Project> getTopProjects() {
        return Arrays.asList(
                new Project(1L, "Project Alpha", "A comprehensive and detailed description of this cool project...", "https://github.com/your-username/project-alpha", null),
                new Project(2L, "Project Beta", "This project is a perfect example of modern UI/UX principles...", "https://github.com/your-username/project-beta", null),
                new Project(3L, "Project Gamma", "A personal side project that allowed me to explore a brand new framework...", "https://github.com/your-username/project-gamma", null)
        );
    }

    @GetMapping("/other")
    public List<Project> getOtherProjects() {
        return Arrays.asList(
                new Project(4L, "Project A", null, "https://github.com/your-username/project-a", null),
                new Project(5L, "Project B", null, "https://github.com/your-username/project-b", null),
                new Project(6L, "Project C", null, "https://github.com/your-username/project-c", null)
        );
    }
}