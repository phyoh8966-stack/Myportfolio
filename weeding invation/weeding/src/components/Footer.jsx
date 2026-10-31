export default function Footer({ data }) {
  return (
    <footer className="footer">
      <span className="footer__monogram" aria-hidden="true">
        {data.bride.name[0]} <i>&amp;</i> {data.groom.name[0]}
      </span>
      <p className="footer__thanks">{data.copy.footerThanks}</p>
      <p className="footer__names">
        {data.bride.name} <i>&amp;</i> {data.groom.name}
      </p>
      <p className="footer__date">{data.date.display}</p>
      <span className="footer__rule" />
      <p className="footer__small">Made with love</p>
    </footer>
  );
}
