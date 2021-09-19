import React from 'react';

import{
  Grid,
  Box,
  ResponsiveContext
} from 'grommet';

import CustHeader from '../cHeader/cHeader.comp';
import CustFooter from '../cFooter/cFooter.comp';

export default function Layout(props) {
  const size = React.useContext(ResponsiveContext);
  
  return (
      <Grid
        fill
        rows={['xxsmall', 'flex', 'xxsmall']}
        columns={['75%', '25%']}
        gap="none"
        areas={[
          {name:"heading", start:[0,0], end:[1,0]},
          {name:"content", start:[0,1], end:[1,1]},
          {name:"footer", start:[0,2], end:[1,2]}
        ]}
      >
        <Box gridArea="heading" 
          background="brand"
          height={{max:"10vh"}}
          justify="start"
        >
          <CustHeader/>
        </Box>

        <Box gridArea="content"
          style={{
            overflowY:"auto",
          }}
        >
          {props.children}
        </Box>
        
        <Box gridArea="footer">
          <CustFooter/>
        </Box>
      </Grid>
  )
}
