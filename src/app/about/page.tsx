import React from 'react';
import './About.css'; // Assurez-vous que le CSS est dans le même dossier

const About: React.FC = () => {
  return (
    <div className="about-page">
      <main className="content">
        {/* Section Hero */}
        <section className="hero-text">
          <p className="ethos">INSTITUTIONAL ETHOS</p>
          <h1>Architecture of Knowledge.</h1>
          <div className="underline"></div>
        </section>

        <section className="main-image">
          <img src="ecole2.gif" alt="Ecole ESTIN" />
        </section>

        {/* Section 1: Simplicity */}
        <section className="section-grid">
          <div className="text-block">
            <i className="fas fa-book-open icon-sep"></i>
            <h2>Empowering Academic Exchange Through Digital Simplicity</h2>
            <p>
              Born within the halls of ESTIN, Dourous.net is an educational extranet platform 
              designed to modernize the connection between students and faculty members. 
              By simplifying homework submission, document sharing, and academic communication, 
              the platform transforms routine educational tasks into a seamless digital experience.
            </p>
            <p>
              Created by students, inspired by academic realities, and dedicated to every 
              learner — Dourous.net stands as a bridge between technology and education.
            </p>
            <button className="btn">Learn more about ESTIN →</button>
          </div>
          <div className="image-block">
            <img 
              src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800" 
              alt="Notes" 
            />
          </div>
        </section>

        {/* Section 2: Dedicated */}
        <section className="section-grid reverse">
          <div className="text-block">
            <h2>Dedicated to Every Student, Designed for Every Teacher</h2>
            <p>
              Dourous.net was built with a clear mission: to offer educational institutions 
              a secure and elegant digital environment where academic interactions become 
              faster, clearer, and more productive.
            </p>
            <p>
              The platform allows students to submit assignments in PDF format, access 
              faculty-specific spaces, and maintain organized academic records, while 
              enabling teachers to receive, review, and manage coursework in one 
              centralized interface.
            </p>
            <div className="stats">
              <div className="stat-item">
                <strong>Accessibility</strong><br />
                <span>EDUCATIONAL REACH</span>
              </div>
              <div className="stat-item">
                <strong>Efficiency</strong><br />
                <span>TECHNOLOGICAL EASE</span>
              </div>
              <div className="stat-item">
                <strong>Modernity</strong><br />
                <span>SMARTER FUTURE</span>
              </div>
            </div>
          </div>
          <div className="image-block">
            <img 
              src="https://img.freepik.com/free-vector/flat-university-students-talking-outside_23-2148201955.jpg" 
              alt="Students" 
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">Dourous-Net</div>
        <div className="copy">© 2024 DOUROUS-NET. CURATED EDUCATIONAL EXCELLENCE.</div>
        <div className="footer-links">
          <a href="#privacy">PRIVACY</a>
          <a href="#terms">TERMS</a>
          <a href="#support">SUPPORT</a>
        </div>
      </footer>
    </div>
  );
};

export default About;
