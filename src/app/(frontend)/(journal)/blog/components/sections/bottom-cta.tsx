import { EnquiryButton } from './enquiry-button';

export function BottomCta() {
  return (
    <section className="wg-bottom-cta">
      <div className="shell">
        <div>
          <span className="j-label">FROM A GOOD READ TO A GOOD NEXT STEP</span>
          <h2>
            Your growth story.
            <br />
            What happens next?
          </h2>
          <p>
            Bring us the question you’re working through.
            <br />
            We’ll help you find a clearer direction.
          </p>
        </div>
        <div>
          <EnquiryButton label="Let’s work on my growth" />
          <span>Start with a short brief.</span>
        </div>
      </div>
    </section>
  );
}
