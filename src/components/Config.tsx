/* eslint-disable @typescript-eslint/no-unused-vars */

import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";

interface ConfigProps {
  children: React.ReactNode;
}

export default function Config({ children }: ConfigProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button onClick={open} color="blue">
        Open modal
      </Button>
      <Modal opened={opened} onClose={close} title="Authentication">
        {children}
      </Modal>
    </>
  );
}
