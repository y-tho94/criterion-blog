import React from 'react';
import { Grommet, grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';

const theme = {
  global : {
    colors: {
      brand: "#85ccb7"
    }
  },
  button:{
    default:{
      color: {
        dark:"#000000",
        light:"white"
      }
    }
  }
}

function MyApp({ Component, pageProps }) {
  return (
    <Grommet theme={deepMerge(grommet, theme)} full>
      <Component {...pageProps} />
    </Grommet>
  );
}

export default MyApp;
