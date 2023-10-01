import { useState } from "react";
import { Container, Group, Burger, Button, Drawer, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Header.module.css";

type Link = { link: string; label: string };

const links: Array<Link> = [
  { link: "/about", label: "About" },
  { link: "/contact", label: "Contact" },
  { link: "/pricing", label: "Pricing" },
  { link: "/blog", label: "Blog" },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map(({ link, label }) => (
    <a
      href={link}
      key={label}
      className={classes.link}
      data-active={active === link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link);
      }}
    >
      {label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <h2 className={classes.logoText}>3D Planner</h2>

        <Group gap={5} visibleFrom="xs">
          {items}
          <Button variant="default">Log in</Button>
          <Button>Sign up</Button>
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="xs"
          size="sm"
          aria-label="Toggle navigation"
        />

        <Drawer position="right" opened={opened} onClose={toggle}>
          <Stack>
            <Stack>{items}</Stack>

            <Stack>
              <Button variant="default">Log in</Button>
              <Button>Sign up</Button>
            </Stack>
          </Stack>
        </Drawer>
      </Container>
    </header>
  );
}
