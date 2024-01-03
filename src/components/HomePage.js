// HomePage.js

import React from 'react';
import './HomePage.css';

const HomePage = () => {
  const projects = [
    {
        name: 'Parkour Game',
        description: 'A simple parkour game done in Unity 3D',
        link: 'https://www.youtube.com/watch?v=S-JxKxLS2V4'
      },
      {
          name: 'First Website',
          description: 'My first website assignment from Web & Mobile I',
          link: 'https://github.com/AmalMammadzada/webmobile1/tree/main/assignment'
        },
      {
          name: 'Data Fetching',
          description: 'Website for fetching data from an API and dynamically populating a web page with the loaded data in a user-friendly format',
          link: 'https://github.com/AmalMammadzada/web1-assignment2'
        },
  ];

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to My Flashcard App</h1>
        <p>Amal Mammadzada</p>
      </header>
      <section className="projects-section">
        <h2>My Projects</h2>
        <ul className="projects-list">
          {projects.map((project, index) => (
            <li key={index} className="project-item">
              <strong>{project.name}</strong> - {project.description}
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="view-project-btn">View Project</a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
