function About() {
    return (
        <div className="max-w-3xl mx-auto mt-10 px-4 pb-16">
            <h1 className="text-3xl font-bold mb-6 text-pink-600 dark:text-pink-400">About Me</h1>

            <p className="mb-4 text-gray-800 dark:text-gray-200 leading-7">
                Hi, I'm Xiaowei (Kaya) Wu, a software developer with a legal background and a growing interest
                in security and systems. Before switching to tech, I spent several years as a practicing lawyer
                and legal advisor, working on data governance and regulatory compliance.
            </p>

            <p className="mb-4 text-gray-800 dark:text-gray-200 leading-7">
                I'm currently completing an MSc in Software Design & Development at the University of Galway,
                expected to graduate in September 2026 with first class honours. My coursework covers data
                structures, operating systems, network security, cryptography, and machine learning.
            </p>

            <p className="mb-4 text-gray-800 dark:text-gray-200 leading-7">
                I'm currently focused on building solid software engineering fundamentals, with a longer-term
                interest in security and systems. My main project is a vulnerability reachability analysis
                framework for Java/Maven projects. It determines whether CVE-reported vulnerabilities are
                actually reachable in application code, with output structured to support regulatory compliance
                workflows. This blog is where I document what I'm learning, building, and figuring out along the way.
            </p>

            <div className="mt-8 flex gap-6">
                <a
                    href="https://github.com/XiaoweiDev2025"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    GitHub
                </a>
                <a
                    href="https://www.linkedin.com/in/xiaowei-wu-34871233a"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM3.56 20.45h3.55V9H3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z"/>
                    </svg>
                    LinkedIn
                </a>
            </div>
        </div>
    );
}

export default About;
