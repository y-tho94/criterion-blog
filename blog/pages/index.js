import Head from "next/head";
import Link from 'next/link';
import React from 'react';

import CustHeader from "../components/cHeader/cHeader.comp";
import CustFooter from "../components/cFooter/cFooter.comp";

import {
  Header,
  Box,
  Grid,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  ResponsiveContext,
  Image
} from "grommet";

import {
  CaretDown,
} from 'grommet-icons';

export const getStaticProps = async () => {
  let res
  try{
    const URL = `https://cdn.contentful.com/spaces/${process.env.BLOG_SITE_ID}/entries?access_token=${process.env.ACCESS_TOKEN}&content_type=siteHero`;
    const raw = await fetch(URL);
    const rawdata = await raw.json();
    res = rawdata.includes.Asset[0];
  }catch (ex){
    res = ex
  }
  return {props: {hero: typeof(res) != 'undefined' ? res.fields.file : null}};
}

export default function Home({ hero }) {
  const size = React.useContext(ResponsiveContext);

  let colCount;
  let isSmall;
  switch(size){
    case 'xxsmall':
    case 'xsmall':
    case 'small':
      colCount = 1;
      isSmall = true;
      break;
    default:
      colCount = 3;
      isSmall = false;
      break;
  }

  return (
    <Grid 
      fill
      columns={['auto']}
      rows={['full', 'full', 'xsmall']}
      gap='none'
      areas={[['hero'], ['content'], ['footer']]}
    >
      <Header
        background={hero != null ? {image:`url(${hero.url})`} : "brand" }
        justify="center"
        gridArea="hero"
      >
        <Head>
          <title>Criterion Fiberarts</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Box 
          style={{
            fontSize:isSmall ? "4rem" : "5rem", 
            lineHeight:"10vh",
            color:"white"
          }} 
          justify="center"
        >
          <p>Criterion Fiberarts</p>
        </Box>
      </Header>

      <Box gridArea="hero"
        fill="horizontal"
        alignSelf="start"
      >
        <CustHeader alignSelf="start"/>
      </Box>

      <Box
        fill="horizontal"
        justify="center"
        alignSelf="end"
        gridArea="hero"
      >
        <CaretDown
          size='medium'
          style={{
            display:"flex",
            alignSelf:"center",
            marginBottom:"1vh"
          }}
          color="white"
        />
      </Box>

      <Grid 
        gridArea="content"
        justify="center"
        align="center"
        columns={{
          count: colCount,
          size : size !== 'small' ? 'small' : '100%'
        }}
        gap="small"
        fill
        pad="large"
      >
        <Box>
          <Link href="/posts">
            <Card 
              height={isSmall ? 'small' : 'medium'}
              width={isSmall ? 'small' : 'medium'}
            >
              <CardHeader>
                <h3 style={{margin:"auto", padding:"3px 6px 3px 6px"}}>Posts</h3>
              </CardHeader>
              <CardBody>
                <Image size="xsmall" fit="cover" src="https://www.crikey.com.au/wp-content/uploads/2019/02/yarncover-768x485.jpg"/>
              </CardBody>
            </Card>
          </Link>
        </Box>

        <Box>
          <Link href="https://www.etsy.com/shop/CriterionDice">
            <Card 
              height={isSmall ? 'small' : 'medium'}
              width={isSmall ? 'small' : 'medium'}
            >
              <CardHeader>
                <h3 style={{margin:"auto", padding:"3px 6px 3px 6px"}}>My Etsy</h3>
              </CardHeader>
              <CardBody>
                <Image size="xsmall" fit="cover" src="https://www.crikey.com.au/wp-content/uploads/2019/02/yarncover-768x485.jpg"/>
              </CardBody>
            </Card>
          </Link>
        </Box>

        <Box>
          <Link href="https://www.ravelry.com/people/criterionfiberart">
            <Card 
              height={isSmall ? 'small' : 'medium'}
              width={isSmall ? 'small' : 'medium'}
            >
              <CardHeader>
                <h3 style={{margin:"auto", padding:"3px 6px 3px 6px"}}>My Ravelry</h3>
              </CardHeader>
              <CardBody>
                <Image size="xsmall" fit="cover" src="https://www.crikey.com.au/wp-content/uploads/2019/02/yarncover-768x485.jpg"/>
              </CardBody>
            </Card>
          </Link>
        </Box>
      </Grid>

      <Box gridArea="footer"
        fill="vertical"
        style={{
          alignSelf:"flex-end"
        }}
      >
        <CustFooter/>
      </Box>
    </Grid>
  );
}
