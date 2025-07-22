import Footer from "../components/Footer.tsx";

function About() {
    return (
        <div className="max-w-3xl mx-auto mt-10 px-4">
            <h1 className="text-3xl font-bold mb-4 text-pink-600">About Me</h1>
            <p className="mb-4">
                Hello! I'm Xiaowei Wu. I'm currently studying Software Design & Development at the University of Galway.
            </p>
            <p className="mb-4">
                This blog is a space for me to document my technical learning journey, reflections, and side projects.
                It combines my background in law, cybersecurity, and programming, with a strong focus on personal growth and digital autonomy.
            </p>
            <p>
                Thank you for visiting!
            </p>

            <Footer />
        </div>
    );
}

export default About;
