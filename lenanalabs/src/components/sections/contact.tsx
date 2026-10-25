import React from "react";
import { Section } from "../layout/section";
import { Container } from "../layout/container";
import { ContactCard } from "../cards/contact-card";

export function Contact() {
  return (
    <Section id="contact" variant="paper">
      <Container>
        <ContactCard />
      </Container>
    </Section>
  );
}
