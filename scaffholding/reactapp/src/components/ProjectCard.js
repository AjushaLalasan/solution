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
      {project.socialLinks && project.socialLinks.length > 0 && (
        <div className="social-links">
          {project.socialLinks.map((link, index) => (
            <a key={index} href={link.url} className="social-link" target="_blank" rel="noopener noreferrer">
              {link.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;