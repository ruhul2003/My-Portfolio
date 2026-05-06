import React from 'react';

const TechStack = () => {
    return (
        <div>
            <h1 className="text-3xl md:text-4xl text-center font-extrabold text-[#C4F000]">TechStack</h1>
            <h2 className="text-xl md:text-2xl text-center font-bold text-white">My Technical Skills</h2>
            <div>
                <ul className="list-disc list-inside text-white mt-4">
                    <li>Programming Languages: JavaScript, Python, Java</li>
                    <li>Frameworks: React, Node.js, Express</li>
                    <li>Databases: MongoDB, MySQL</li>
                    <li>Version Control: Git, GitHub</li>
                    <li>Other Tools: Docker, AWS, VS Code</li>
                </ul>
            </div>
        </div>
    );
};

export default TechStack;