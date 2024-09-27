import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const SocialLinks = () => {
  return (
    <div className="flex space-x-4" data-testid="social-links">
      <a
        href="https://www.linkedin.com/in/diegomotadev/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        data-testid="linkedin-link"
      >
        <FaLinkedin
          className="text-lightText dark:text-darkText hover:text-blue-700 dark:hover:text-blue-500 text-xl"
          data-testid="linkedin-icon"
        />
      </a>
      <a
        href="https://github.com/diegomota2374"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        data-testid="github-link"
      >
        <FaGithub
          className="text-lightText dark:text-darkText hover:text-blue-700 dark:hover:text-blue-500 text-xl"
          data-testid="github-icon"
        />
      </a>
    </div>
  );
};

export default SocialLinks;
