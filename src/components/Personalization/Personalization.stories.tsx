import { Meta, Story } from "@storybook/react/types-6-0";
import { useCallback, useState } from "react";

import Personalization, { PersonalizationState } from ".";

export default {
  title: "Personalization",
  component: Personalization,
} as Meta;

export const Default: Story = (args) => {
  const [
    personalizationState,
    setPersonalizationState,
  ] = useState<PersonalizationState>(null);

  return (
    <div>
      <Personalization {...args} onStateChange={setPersonalizationState} />
      <pre>
        <code>{JSON.stringify(personalizationState, null, 2)}</code>
      </pre>
    </div>
  );
};

export const WithLogoSection: Story = (args) => {
  const [
    personalizationState,
    setPersonalizationState,
  ] = useState<PersonalizationState>(null);

  return (
    <div>
      <Personalization
        {...args}
        shouldShowLogoSection
        onStateChange={setPersonalizationState}
      />
      <pre>
        <code>{JSON.stringify(personalizationState, null, 2)}</code>
      </pre>
    </div>
  );
};

export const WithArtSection: Story = (args) => {
  const [
    personalizationState,
    setPersonalizationState,
  ] = useState<PersonalizationState>(null);

  return (
    <div>
      <Personalization
        {...args}
        shouldShowArtSection
        onStateChange={setPersonalizationState}
      />
      <pre>
        <code>{JSON.stringify(personalizationState, null, 2)}</code>
      </pre>
    </div>
  );
};
