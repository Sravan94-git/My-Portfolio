package com.myportfolio.myportfoliobackend.repository;

import com.myportfolio.myportfoliobackend.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
}
