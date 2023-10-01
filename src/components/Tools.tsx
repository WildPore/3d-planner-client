import { Tooltip, ActionIcon, rem } from "@mantine/core";
import {
  IconCube,
  IconHandStop,
  IconMessagePlus,
  IconPhoto,
} from "@tabler/icons-react";

export function Tools() {
  return (
    <ActionIcon.Group orientation="vertical" borderWidth={1}>
      <Tool label="New Shape" icon={<IconCube />} />
      <Tool label="Navigate" icon={<IconHandStop />} />
      <Tool label="Annotate" icon={<IconMessagePlus />} />
    </ActionIcon.Group>
  );
}

interface ToolProps {
  label: string;
  icon: React.ReactNode;
}

Tool.defaultProps = {
  label: "Error",
  icon: <IconPhoto style={{ width: rem(20) }} stroke={1.5} />,
};

function Tool({ label, icon }: ToolProps) {
  const Label = () => label;
  const Icon = () => icon;

  return (
    <Tooltip withArrow position="right" label={<Label />}>
      <ActionIcon variant="default" size="lg">
        <Icon />
      </ActionIcon>
    </Tooltip>
  );
}
