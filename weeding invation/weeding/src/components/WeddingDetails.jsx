import { CalendarDays, Clock3, MapPin } from 'lucide-react';

export default function WeddingDetails({ data }) {
  const details = [
    {
      icon: CalendarDays,
      label: 'The day',
      title: data.date.display,
      text: 'We can’t wait to celebrate with you.',
    },
    {
      icon: Clock3,
      label: 'The time',
      title: data.date.venueTime,
      text: data.date.time,
    },
    {
      icon: MapPin,
      label: 'The place',
      title: data.venue.name,
      text: data.venue.address,
    },
  ];

  return (
    <section className="section details-section" id="details">
      <div className="section-heading reveal">
        <p className="eyebrow">A few little details</p>
        <h2>Everything you need to know</h2>
        <p>All the lovely details for our day together.</p>
      </div>
      <div className="details-grid">
        {details.map(({ icon: Icon, label, title, text }, index) => (
          <article className="detail-card reveal" key={label} style={{ '--delay': `${index * 100}ms` }}>
            <span className="detail-card__icon">
              <Icon size={21} strokeWidth={1.5} />
            </span>
            <p className="eyebrow">{label}</p>
            <h3>{title}</h3>
            <p className="detail-card__text">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
