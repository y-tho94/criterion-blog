import React from 'react'

import{
  Footer,
  Anchor,
  Nav
} from 'grommet';

import { Instagram, Tictok } from "grommet-icons";

export default function CustFooter() {
  return (
    <Footer
      fill="vertical"
      background="light-2"
      pad={{ vertical: "small", horizontal: "medium" }}
    >
      <h6>
        Powered by FreydoApps  
      </h6> 
      <Nav direction="row" align="center">
        <Anchor
          a11yTitle="Reach out to the Grommet Community on Slack"
          href="https://slack-invite.grommet.io/"
          icon={<Tictok color="plain" />}
          target="_blank"
          rel="noreferrer noopener"
        />
        <Anchor
          a11yTitle="Github repository"
          href="https://github.com/grommet/nextjs-boilerplate"
          icon={<Instagram color="black" />}
          target="_blank"
          rel="noreferrer noopener"
        />
      </Nav>
    </Footer>
  )
}
