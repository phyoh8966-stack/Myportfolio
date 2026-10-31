import { useState } from 'react';
import { Check, Send } from 'lucide-react';

const initialForm = {
  name: '',
  guests: '1',
  attendance: '',
  message: '',
};

export default function RSVP({ data }) {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setSubmitted(true);
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
            <h3>Thank you, {form.name}!</h3>
            <p>
              {form.attendance === 'yes'
                ? 'Your reply has been noted. We can’t wait to celebrate with you.'
                : 'We’re sorry you can’t join us, and we’ll be thinking of you on our special day.'}
            </p>
            <button className="text-button" type="button" onClick={() => setSubmitted(false)}>
              Edit your reply
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
            <p className="rsvp-form__privacy">
              This demo confirms your reply in this browser; connect an RSVP service to receive responses.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
