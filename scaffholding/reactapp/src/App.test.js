import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './components/Home';
import ProjectCard from './components/ProjectCard';

beforeEach(() => {
  process.env.REACT_APP_NAME = 'John Doe';
  process.env.REACT_APP_EMAIL = 'john.doe@example.com';
});

describe('Portfolio SPA', () => {
  test('displays portfolio name from environment variable', () => {
    render(<Home />);
    expect(screen.getByText("Welcome to John Doe's Portfolio")).toBeInTheDocument();
  });

  test('project card renders with memoization', () => {
    const project = {
      id: 1,
      title: 'Test Project',
      description: 'Test description',
      technologies: ['React']
    };

    render(<ProjectCard project={project} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  test('conditional rendering works for social links', () => {
    const projectWithLinks = {
      id: 1,
      title: 'Project With Links',
      description: 'Test',
      technologies: ['React'],
      socialLinks: [{ name: 'Demo', url: 'https://demo.com' }]
    };

    render(<ProjectCard project={projectWithLinks} />);
    expect(screen.getByText('Demo')).toBeInTheDocument();
  });
});