import React from 'react'
import Link from 'next/link';

import {
  Header,
  Heading,
  ResponsiveContext,
  Box
} from 'grommet'

import Navbar from '../navbar/navbar.comp';

export default function CustHeader() {
  const size = React.useContext(ResponsiveContext);

  let isSmall;
  switch(size){
    case 'xxsmall':
    case 'xsmall':
    case 'small':
      isSmall = true;
      break;
    default:
      isSmall = false;
      break;
  }
  return (
    <Header
      height={{min: "5vh", max:"5vh"}}
      flex={true}
      style={{
        paddingLeft:"5vw",
        paddingRight:"5vw"
      }}
      align="center"
    >
      <Link href="/">
        <Heading style={{cursor:"pointer", }}
          size={isSmall ? "1rem" : "1.5rem"}
          color="white"
        >
          Criterion Fiberarts
        </Heading>
      </Link>
      <Box
        direction="column"
        height="100%"
        justify="start"

      >
        <Navbar />
      </Box>
    </Header>
  )
}
