import { Clock3 } from 'lucide-react';

export default function Schedule({ events }) {
  return (
    <section className="section schedule-section" id="schedule">
      <div className="section-heading reveal">
        <p className="eyebrow">Save a little room for joy</p>
        <h2>Our wedding day</h2>
        <p>A gentle guide to the moments we’ll share.</p>
      </div>
      <div className="schedule-list">
        {events.map((event, index) => (
          <article className="schedule-event reveal" key={event.title}>
            <span className="schedule-event__time">
              <Clock3 size={15} strokeWidth={1.6} />
              {event.time}
            </span>
            <span className="schedule-event__line" aria-hidden="true">
              <span />
            </span>
            <div className="schedule-event__copy">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </div>
            <span className="schedule-event__index">0{index + 1}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
