import './temp.css'

export default function ResumeTemplate2() {
    return (
      <div className="resume-container">
        <aside className="sidebar">
          <h1>David Paul</h1>
          <p>React Developer</p>
          <div className="contact">
            <p>Email: john@example.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>
          <div className="skills">
            <h3>Skills</h3>
            <ul>
              <li>React</li>
              <li>JavaScript</li>
              <li>Node.js</li>
              <li>HTML/CSS</li>
              <li>JIRA</li>
            </ul>
          </div>
        </aside>
  
        <main className="main-content">
          <section>
            <h2>Summary</h2>
            <p>Frontend developer with a strong background in building scalable React applications and optimizing UI performance.</p>
          </section>
  
          <section>
            <h2>Education</h2>
            <p><strong>MS, Information Systems</strong> – Indiana Tech (2025)</p>
            <p><strong>BE, ECE</strong> – JNTUH (2021)</p>
          </section>
  
          <section>
            <h2>Experience</h2>
            <p><strong>Capgemini – Senior Engineer</strong></p>
            <ul>
              <li>Led frontend testing automation.</li>
              <li>Worked with clients internationally to ensure project success.</li>
            </ul>
          </section>
        </main>
      </div>
    );
  }