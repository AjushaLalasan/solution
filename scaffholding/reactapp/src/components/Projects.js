import React from 'react';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce solution with React and Node.js',
      technologies: ['React', 'Node.js', 'MongoDB'],
      githubUrl: 'https://github.com/example/ecommerce',
      socialLinks: [
        { name: 'Live Demo', url: 'https://demo.example.com' }
      ]
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application',
      technologies: ['React', 'Redux', 'Firebase'],
      githubUrl: 'https://github.com/example/taskapp'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Real-time weather tracking dashboard',
      technologies: ['React', 'API Integration', 'CSS3']
    }
  ];

  return (
    <div className="projects-page">
      <h1>My Projects</h1>
      <div className="projects-grid">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;