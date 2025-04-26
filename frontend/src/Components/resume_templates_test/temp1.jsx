import './temp.css'

export default function ResumeTemplate1() {
  return (
    <div className="resume-container">
      <header>
        <h1>John Doe</h1>
        <p>Frontend Developer | React Enthusiast | UI Designer</p>
      </header>

      <section className="summary">
        <h2>Summary</h2>
        <p>Creative and detail-oriented frontend developer with 3+ years of experience building responsive websites and web apps using React, JavaScript, HTML, and CSS.</p>
      </section>

      <section className="education">
        <h2>Education</h2>
        <p><strong>M.S. in Information Systems</strong> – Purdue Fort Wayne, USA (Expected May 2025)</p>
        <p><strong>B.E. in Electronics & Communication</strong> – JNTUH, India (2021)</p>
      </section>

      <section className="experience">
        <h2>Work Experience</h2>
        <p><strong>Senior Software Engineer – Capgemini</strong> (Sep 2021 – Dec 2023)</p>
        <ul>
          <li>Developed and maintained test automation scripts using Selenium & Java.</li>
          <li>Collaborated with dev teams to resolve front-end issues and improve UI/UX.</li>
          <li>Worked on cross-browser testing and integrated with Jenkins pipelines.</li>
        </ul>
      </section>

      <section className="skills">
        <h2>Skills</h2>
        <ul>
          <li>React</li>
          <li>JavaScript</li>
          <li>HTML/CSS</li>
          <li>Selenium</li>
          <li>Jenkins</li>
          <li>Git</li>
        </ul>
      </section>
    </div>
  );
} 