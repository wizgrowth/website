import type {
  SerializedEditorState,
  SerializedLexicalNode,
} from '@payloadcms/richtext-lexical/lexical';
import { RichTextConverterComponent } from '@/payload-components/richtext/richtext-convertor';
import type { ServicePage } from '@/payload-types';

// Method, what's included and the honesty block share one .prose column,
// exactly as in the reference service template.
export function Method({ service }: { service: ServicePage }) {
  const steps = service.steps ?? [];
  const includes = service.includes ?? [];
  const honesty = service.honesty;
  if (steps.length === 0 && includes.length === 0 && !honesty) return null;

  return (
    <section className="shell section-tight prose" aria-label="Method">
      {steps.length > 0 && (
        <>
          <h2>How we run it</h2>
          <ol className="steps">
            {steps.map((step) => (
              <li key={step.id ?? step.label}>
                <b>{step.label}</b>
                {step.text}
              </li>
            ))}
          </ol>
        </>
      )}
      {includes.length > 0 && (
        <>
          <h2>What’s included</h2>
          <ul className="checks">
            {includes.map((entry) => (
              <li key={entry.id ?? entry.item}>{entry.item}</li>
            ))}
          </ul>
        </>
      )}
      {honesty && (
        <>
          <h2>Timelines, pricing, honesty</h2>
          <RichTextConverterComponent
            data={honesty as unknown as SerializedEditorState<SerializedLexicalNode>}
          />
        </>
      )}
    </section>
  );
}
