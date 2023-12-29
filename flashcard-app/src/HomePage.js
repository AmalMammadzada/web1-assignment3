import React from 'react';
import projects from './projectsData';

const HomePage = () => {
  return (
    <div className="homepage">
      <section className="introduction">
        <h1>Welcome to My Portfolio</h1>
        <p>This is a general introduction to your portfolio.</p>
      </section>

      <section className="projects">
        <h2>My Projects</h2>
        {projects.map((project) => (
          <div key={project.id} className="project">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              Visit Project
            </a>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;