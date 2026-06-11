function About() {
  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Over deze app</h1>
      <p>
        Dit is een voorbeeld van een <strong>decoupled architectuur</strong> met een
        .NET backend en een React frontend, verbonden via een Nginx reverse proxy.
      </p>
      <h2>Architectuur</h2>
      <ul>
        <li><strong>Backend:</strong> .NET Web API (REST)</li>
        <li><strong>Frontend:</strong> React + Vite</li>
        <li><strong>Reverse proxy:</strong> Nginx (regelt routing en voorkomt CORS-problemen)</li>
        <li><strong>Containerisatie:</strong> Docker &amp; Docker Compose</li>
      </ul>
    </div>
  )
}

export default About
