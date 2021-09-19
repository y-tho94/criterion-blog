import React, {useState} from 'react';
import Head from "next/head";

import ErrorMsg from '../../components/error-msg/error-msg.comp';
import Layout from '../../components/layout/layout.comp';
import PostBlurb from "../../components/post-blurb/post-blurb.comp";

import {
  Box,
  Grid,
  Heading,
  InfiniteScroll,
  ResponsiveContext,
  TextInput
} from "grommet";

export const getPosts = async () => {
  let res
  try{
    const URL = `https://cdn.contentful.com/spaces/${process.env.BLOG_SITE_ID}/entries?access_token=${process.env.ACCESS_TOKEN}&content_type=blogPost`
    const raw = await fetch(URL);
    const rawdata = await raw.json();
    res = rawdata.items;
    //TODO:: Build a POJO that takes the essential data from `res` and associate the images before passing it to props 
  }catch (ex){
    res = {error : ex};
  }
  return res;
}

export const getStaticProps = async () =>{
  let data = await getPosts();
  let assets = await getImages(); //TODO:: Make this irrelevant
  return {
    props : {posts:data, assets:assets}
  }
}

export const getImages = async () => {
  let res
  try{
    const URL = `https://cdn.contentful.com/spaces/${process.env.BLOG_SITE_ID}/environments/master/assets?access_token=${process.env.ACCESS_TOKEN}`
    const raw = await fetch(URL);
    const rawdata = await raw.json();
    res = rawdata;
  }catch (ex){
    res = {error : ex};
  }
  return res;
}

export const getAssocImg = (heroImgId, assets) => {
  for (let i = 0; i < assets.total; i++ ){
    if(assets.items[i].sys.id === heroImgId){
      return assets.items[i].fields;
    }
  }
}

export const filterPosts = (filter, posts) => {
  const retval = posts.filter(post => {
    const inTags = post.fields.tags.filter(tag => (
      tag.toLowerCase().includes(filter.toLowerCase())
    )).length > 0;
    const inTitle = post.fields.title.toLowerCase().includes(filter.toLowerCase())
    
    if(inTitle || inTags){
      return post;
    }
  })
  return retval;
}

export default function Post({posts, assets}) {
  const size = React.useContext(ResponsiveContext);

  let colCount = 3;

  switch(size){
    case 'xxsmall':
    case 'xsmall':
    case 'small':
      colCount = 1;
      break;
    case 'medium':
      colCount = 2;
      break;
    default:
      colCount = 3;
      break;
  }


  if(posts.error && assets.error){
    console.log(posts.error, assets.error);
    return (
      <Layout>
        <ErrorMsg err={posts.error != 'undefined' ? posts.error : assets.error}/>
      </Layout>
    )
  }

  const [filter, setFilter] = useState('');

  const filteredPosts = filter.length > 0 ? filterPosts(filter, posts) : posts;

  return (
    <Layout>
      <Head>
        <title>Criterion Fiberarts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{padding:"3rem"}}>
        <Box
          flex
          direction="row"
          size={size !== 'small' ? 'small' : '100%'}
          align="center"
          justify="center"
        >
            <Box><Heading level="4">Search:&nbsp;</Heading></Box>
            <Box>
              <TextInput 
                id="txtSearch" 
                onChange={e=>setFilter(e.target.value)}
              />
            </Box>
        </Box>
        <br/>
        <Grid
          columns={{
            count: colCount,
            size : size !== 'small' ? 'small' : '100%'
          }}
          gap="small"
        >
          <InfiniteScroll items={filteredPosts}>
              {item => (
                <Box align="center" width="100%">
                  <PostBlurb
                    key={item.sys.id}
                    title={item.fields.title}
                    postId={item.fields.slug}
                    img={getAssocImg(item.fields.heroImage.sys.id, assets)}
                    postedDate={item.fields.publishDate}
                    blurb={item.fields.description}
                    width={{max:"medium", min:"small"}}
                  />
                </Box>
                )
              }
          </InfiniteScroll>
        </Grid>
      </div>
    </Layout>
  );
}