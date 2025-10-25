import React from 'react';

const ProjectCard = React.memo(({ project }) => {
  return (
    <div className="project-card" data-testid={`project-${project.id}`}>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="project-tech">
        {project.technologies.map((tech, index) => (
          <span key={index} className="tech-tag">{tech}</span>
        ))}
      </div>
      {project.githubUrl && (
        <a href={project.githubUrl} className="project-link" target="_blank" rel="noopener noreferrer">
          View on GitHub
        </a>
      )}
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;