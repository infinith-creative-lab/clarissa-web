import { FAQHero } from './FAQHero';
import { FAQAccordion } from './FAQAccordion';
import { FAQContact } from './FAQContact';
import { FeaturesBar } from '@/features/home/components/FeaturesBar';
import { Container } from '@/components/layout/Container';

/**
 * Client component orchestrator for the FAQ page.
 */
export function FAQContent() {
  return (
    <>
      <FAQHero />
      <section className="py-20 md:py-32 bg-white">
        <Container>
          <FAQAccordion />
        </Container>
      </section>
      <FAQContact />
      <FeaturesBar />
    </>
  );
}
