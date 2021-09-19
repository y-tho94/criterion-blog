import React from 'react';

import Layout from '../../components/layout/layout.comp';

import{
  Box,
  Heading,
  Avatar,
  ResponsiveContext,
  Markdown
} from 'grommet';

export const getStaticProps = async () => {
  let retval;
  let avatar;
  try{
    const URL = `https://cdn.contentful.com/spaces/${process.env.BLOG_SITE_ID}/entries?access_token=${process.env.ACCESS_TOKEN}&content_type=person`;
    const raw = await fetch(URL);
    const rawdata = await raw.json();
    retval = rawdata.items[0].fields;

    const avatarID = retval.image.sys.id;
    const URL2 = `https://cdn.contentful.com/spaces/${process.env.BLOG_SITE_ID}/assets/${avatarID}?access_token=${process.env.ACCESS_TOKEN}`;
    const avatarPromise = await fetch(URL2);
    const avatarJSON = await avatarPromise.json();
    avatar = avatarJSON.fields.file;
  }catch (ex){
    retval = ex;
    avatar = ex;
  }

  return {
    props : {details: retval, avatar: avatar}
  };
}

export default function About({details, avatar}) {
  return (
    <Layout>
      <Box
        align="center"
      >
        <Heading
          level="1"
        >
          {details.name}
        </Heading>
        <Heading
          level="2"
        >
          {details.title}
        </Heading>
        <Avatar
          src={avatar.url}
          size={{min:"small", max:"medium"}}
        />
        <Markdown fill="horizontal">
          {details.shortBio}
        </Markdown>
        <Box
          direction="row"
          justify="evenly"
          fill="horizontal"
          pad="medium"
        >
          <Heading 
            level="6"
          >
            {details.email}
          </Heading>
          <Heading 
            level="6"
          >
            {details.company}
          </Heading>
          <Heading 
            level="6"
          >
            {details.tiktok}
          </Heading>
        </Box><Box
            pad="large"
          >
            &nbsp;
          </Box>
      </Box>
    </Layout>
  )
}
