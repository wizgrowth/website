import './styles.css';
import { getPayload } from 'payload';
import config from '@payload-config';
import { getMeta } from '@/app/utils/get-meta';
import { Schema } from '@/components/scripts/schema';
import {
  Audience,
  Compare,
  Curriculum,
  DemoBand,
  Faq,
  FinalCta,
  Founder,
  Founding,
  Hero,
  Locations,
  Outcomes,
  Problem,
  ProgrammeGlance,
  Schedule,
  SpecsStrip,
  Tools,
} from './components';

const payload = await getPayload({ config });

const academyPageData = await payload.findGlobal({
  slug: 'academy',
});

export async function generateMetadata() {
  const metadata = await getMeta({
    meta: academyPageData?.meta,
  });
  return metadata;
}

export default function AcademyPage() {
  const structuredData = academyPageData?.meta?.schema;
  return (
    <>
      <Schema structuredData={structuredData} />
      <div className="antialiased">
        <Hero />
        <SpecsStrip />
        <Problem />
        <Compare />
        <ProgrammeGlance />
        <Curriculum />
        <Tools />
        <Founder />
        <Schedule />
        <Outcomes />
        <Audience />
        <Founding />
        <DemoBand />
        <Locations />
        <Faq />
        <FinalCta />
      </div>
    </>
  );
}
