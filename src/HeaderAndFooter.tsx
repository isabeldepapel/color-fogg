import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

function Header(): JSX.Element {
    return (
        <header className="header">
            <div className="header-text">
                <h1>
                    <Link to="/">ColorExplorer</Link>
                </h1>
                <h4>Find art by color</h4>
            </div>
        </header>
    );
}

function Footer(): JSX.Element {
    return (
        <footer className="footer">
            <div className="about">
                <a
                    href="https://www.github.com/isabeldepapel/color-fogg"
                    target="_blank"
                    rel="noreferrer noopener"
                    tabIndex={0}
                >
                    <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
                <a
                    href="https://www.linkedin.com/in/isabelsuchanek"
                    target="_blank"
                    rel="noreferrer noopener"
                    tabIndex={0}
                >
                    <FontAwesomeIcon icon={faLinkedinIn} size="2x" />
                </a>
                <span className="copyright">&#169; 2020</span>
            </div>
            <div className="courtesy">
                All content courtesy of
                <a href="https://www.harvardartmuseums.org/" target="_blank" rel="noreferrer noopener">
                    {' '}
                    Harvard Art Museums
                </a>
            </div>
        </footer>
    );
}

export { Header, Footer };
