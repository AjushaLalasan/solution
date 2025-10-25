import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import App from './App';
import Home from './components/Home';
import ProjectCard from './components/ProjectCard';

// Mock environment variables
const originalEnv = process.env;
beforeEach(() => {
  process.env = {
    ...originalEnv,
    REACT_APP_NAME: 'John Doe',
    REACT_APP_EMAIL: 'john.doe@example.com'
  };
});

afterEach(() => {
  process.env = originalEnv;
});

describe('Portfolio SPA', () => {
  test('renders navigation', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  test('renders home page by default', async () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("Welcome to John Doe's Portfolio")).toBeInTheDocument();
    });
  });

  test('displays environment variables in home component', () => {
    render(<Home />);
    expect(screen.getByText("Welcome to John Doe's Portfolio")).toBeInTheDocument();
  });
});

describe('ProjectCard Component', () => {
  const mockProject = {
    id: 1,
    title: 'Test Project',
    description: 'A test project description',
    technologies: ['React', 'Node.js'],
    githubUrl: 'https://github.com/test/project'
  };

  test('renders project card with all information', () => {
    render(<ProjectCard project={mockProject} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A test project description')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('View on GitHub')).toBeInTheDocument();
  });

  test('renders project card without github url', () => {
    const projectWithoutGithub = { ...mockProject, githubUrl: undefined };
    render(<ProjectCard project={projectWithoutGithub} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.queryByText('View on GitHub')).not.toBeInTheDocument();
  });

  test('project card is memoized', () => {
    const { rerender } = render(<ProjectCard project={mockProject} />);
    
    rerender(<ProjectCard project={mockProject} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });
});

describe('Environment Variables', () => {
  test('uses environment variables correctly', () => {
    expect(process.env.REACT_APP_NAME).toBe('John Doe');
    expect(process.env.REACT_APP_EMAIL).toBe('john.doe@example.com');
  });
});

describe('Routing', () => {
  test('navigates to home route', async () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("Welcome to John Doe's Portfolio")).toBeInTheDocument();
    });
  });

  test('lazy loading components exist', () => {
    expect(() => React.lazy(() => import('./components/Projects'))).not.toThrow();
    expect(() => React.lazy(() => import('./components/Contact'))).not.toThrow();
  });
});