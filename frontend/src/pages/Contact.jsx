function Contact() {
  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Contact</h1>
      <p>Heb je vragen of suggesties? Neem gerust contact op!</p>
      <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="text"
          placeholder="Naam"
          style={{ padding: 8 }}
        />
        <input
          type="email"
          placeholder="E-mail"
          style={{ padding: 8 }}
        />
        <textarea
          placeholder="Bericht"
          rows={5}
          style={{ padding: 8, resize: 'vertical' }}
        />
        <button type="submit" style={{ padding: '8px 16px', alignSelf: 'flex-start' }}>
          Versturen
        </button>
      </form>
      <p style={{ color: '#999', marginTop: 12 }}>
        Let op: dit is een voorbeeld — het bericht wordt nergens naartoe gestuurd.
      </p>
    </div>
  )
}

export default Contact
