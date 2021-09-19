import {
  Nav,
  DropButton,
  ResponsiveContext,
  Button
} from 'grommet';

import {
  Menu
} from 'grommet-icons';

import Link from 'next/link';

import React from 'react'

export default function Navbar() {
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
    <>
    {isSmall == false  &&
      <Nav direction="row" justify="end" style={{marginTop:"auto", marginBottom:"auto"}}>
        <Link href="/about">
          <Button default label="About"/>
        </Link>

        <Link href="/posts">
          <Button default label="Posts"/>
        </Link>
{/* 
        <Link href="/shop">
          <Button default label="Shop"/>
        </Link> */}
      </Nav>
    }
    {isSmall == true  &&
      <DropButton
        label={<Menu color="white"/>}
        dropContent = {
          <Nav 
            direction="column" 
            justify="center" 
            align="center"
            background="brand"
          >
            <Link href="/about">
              <Button default label="About"/>
            </Link>

            <Link href="/posts">
              <Button default label="Posts"/>
            </Link>
{/* 
            <Link href="/shop">
              <Button default label="Shop"/>
            </Link> */}
          </Nav>
        }
      />
      
    }
    </>
  )
}
