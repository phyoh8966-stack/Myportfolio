import { useEffect, useState } from 'react';
import { Check, Send, Heart, User, MessageSquare } from 'lucide-react';

// မိမိ ရရှိထားသော Google Apps Script Web App URL ကို ဒီနေရာတွင် ထည့်ပါ
const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";

const initialForm = {
  name: '',
  guests: '1',
  attendance: '',
  message: '',
};

export default function RSVP({ data }) {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Google Sheet ထဲမှ စာရင်းများကို ဖတ်ယူသည့် Function
  const fetchResponses = async () => {
    try {
      setLoading(true);
      const res = await fetch(GOOGLE_SCRIPT_URL);
      const sheetData = await res.json();
      // နောက်ဆုံး ဖြည့်ထားသော စာရင်းကို အပေါ်ဆုံးတွင် ပြသနိုင်ရန် reverse() သုံးထားသည်
      setResponses(sheetData.reverse());
    } catch (err) {
      console.error("Error fetching responses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, [submitted]);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      setSubmitted(true);
      setForm(initialForm);
      fetchResponses(); // Submit လုပ်ပြီးသည်နှင့် စာရင်းအသစ်ကို ပြန်လည်ဆွဲထုတ်မည်
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('မက်ဆေ့ချ် ပို့ရာတွင် အမှားအယွင်း ရှိနေပါသည်။');
    }
  }

  return (
    <section className="section rsvp-section" id="rsvp">
      <div className="rsvp-card reveal">
        <div className="rsvp-card__intro">
          <p className="eyebrow">We saved you a seat</p>
          <h2>Will you join us?</h2>
          <p>It wouldn’t be the same without you. Please let us know if you can make it.</p>
          <span className="rsvp-card__deadline">{data.rsvp.deadline}</span>
        </div>

        {submitted ? (
          <div className="rsvp-success" role="status">
            <span className="rsvp-success__icon">
              <Check size={25} />
            </span>
            <h3>Thank you!</h3>
            <p>Your reply has been noted and added to our guest list.</p>
            <button className="text-button" type="button" onClick={() => setSubmitted(false)}>
              Send another reply
            </button>
          </div>
        ) : (
          <form className="rsvp-form" onSubmit={handleSubmit}>
            <label>
              Your name
              <input
                autoComplete="name"
                name="name"
                onChange={updateField}
                placeholder="How should we address you?"
                required
                value={form.name}
              />
            </label>
            <label>
              Number of guests
              <select name="guests" onChange={updateField} value={form.guests}>
                {Array.from({ length: data.rsvp.maxGuests }, (_, index) => (
                  <option key={index + 1} value={String(index + 1)}>
                    {index + 1} {index === 0 ? 'guest' : 'guests'}
                  </option>
                ))}
              </select>
            </label>
            <fieldset className="rsvp-form__attendance">
              <legend>Will you be joining us?</legend>
              <label>
                <input
                  type="radio"
                  name="attendance"
                  value="yes"
                  onChange={updateField}
                  required
                />
                <span>Joyfully accepts</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="attendance"
                  value="no"
                  onChange={updateField}
                  required
                />
                <span>Regretfully declines</span>
              </label>
            </fieldset>
            <label>
              A little note <span className="rsvp-form__optional">(optional)</span>
              <textarea
                name="message"
                onChange={updateField}
                placeholder="Send us your wishes…"
                rows="3"
                value={form.message}
              />
            </label>
            <button className="button button--sage rsvp-form__submit" type="submit">
              Send your reply <Send size={15} />
            </button>
          </form>
        )}

        {/* ဧည့်သည်များ၏ ဆုတောင်းမက်ဆေ့ချ် ကတ်ပြားများ ပြသသည့် အပိုင်း */}
        <div className="rsvp-wishes" style={{ marginTop: '3rem', textAlign: 'left' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Heart size={20} color="#e56b6f" fill="#e56b6f" /> Warm Wishes from Guests
          </h3>

          {loading ? (
            <p style={{ textAlign: 'center', opacity: 0.7 }}>Loading wishes...</p>
          ) : responses.length === 0 ? (
            <p style={{ textAlign: 'center', opacity: 0.7 }}>Be the first to leave a wish!</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              {responses.map((item, index) => (
                <div
                  key={index}
                  style={{
                    padding: '1.2rem',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.7)',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <strong style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <User size={15} /> {item.name}
                    </strong>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '20px',
                        backgroundColor: item.attendance === 'yes' ? '#e8f5e9' : '#ffebee',
                        color: item.attendance === 'yes' ? '#2e7d32' : '#c62828',
                        fontWeight: 600,
                      }}
                    >
                      {item.attendance === 'yes' ? `Attending (${item.guests})` : 'Declined'}
                    </span>
                  </div>

                  {item.message && (
                    <p style={{ fontSize: '0.9rem', fontStyle: 'italic', marginTop: '0.5rem', color: '#555', display: 'flex', gap: '0.4rem' }}>
                      <MessageSquare size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                      "{item.message}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}