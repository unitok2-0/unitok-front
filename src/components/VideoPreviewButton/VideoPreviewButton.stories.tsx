import { Meta, Story } from "@storybook/react/types-6-0";

import VideoPreviewButton, { VideoPreviewButtonProps } from ".";

export default {
  title: "VideoPreviewButton",
  component: VideoPreviewButton,
  args: {
    title: "Veja o novo vídeo",
    coverUrl: "https://picsum.photos/1080/720",
    href: "/",
  },
} as Meta<VideoPreviewButtonProps>;

export const Default: Story<VideoPreviewButtonProps> = (args) => {
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}
    >
      <VideoPreviewButton {...args} />
      <VideoPreviewButton {...args} />
    </div>
  );
};
