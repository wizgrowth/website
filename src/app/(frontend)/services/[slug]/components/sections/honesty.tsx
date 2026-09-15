import type {
  SerializedEditorState,
  SerializedLexicalNode,
} from '@payloadcms/richtext-lexical/lexical';
import { RichTextConverterComponent } from '@/payload-components/richtext/richtext-convertor';
import type { ServicePage } from '@/payload-types';
import { Reveal } from '../../../components/shared';

export function Honesty({ service }: { service: ServicePage }) {
  if (!service.honesty) return null;

  return (
    <section className="wg-shell wg-section" aria-labelledby="honesty-h">
      <div className="wg-split">
        <Reveal className="wg-split-aside">
          <p className="wg-microlabel wg-microlabel--green wg-microlabel--dot">
            Before you ask
          </p>
          <h2 id="honesty-h" className="wg-h2">
            Timelines, pricing, <span className="wg-fx">honesty</span>
          </h2>
          <p className="wg-intent">
            What we’d tell you on the call, written down here first.
          </p>
        </Reveal>
        <Reveal>
          <div className="wg-panel wg-prose">
            <RichTextConverterComponent
              data={service.honesty as unknown as SerializedEditorState<SerializedLexicalNode>}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
