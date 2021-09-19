//import React from "react";
import Head from "next/head";

import Layout from '../../components/layout/layout.comp';

import {
  Box,
  Markdown
} from "grommet";



export const getPosts = async () => {
  let jsonData;
  try{
    const URL = `https://cdn.contentful.com/spaces/${process.env.BLOG_SITE_ID}/entries?access_token=${process.env.ACCESS_TOKEN}&content_type=blogPost`;
    const raw = await fetch(URL);
    jsonData = await raw.json();
  } catch (ex){
    console.log(ex);
    jsonData = {error:`${ex}`};
  }
  return jsonData;
}

export const getOnePost = async (slug) =>{
  const URL = `https://cdn.contentful.com/spaces/${process.env.BLOG_SITE_ID}/entries?fields.slug=${slug}&access_token=${process.env.ACCESS_TOKEN}&content_type=blogPost`
  const raw = await fetch(URL);
  return raw.json();
}

export const getStaticPaths = async () => {
  const data = await getPosts();
  let paths = [{params:{id:'0'}}];

  if (typeof(data.error) == 'undefined'){
    paths = data.items.map(post => {
      return ({ 
        params : {id: `${post.fields.slug}`}
      });
    });
  }

  return ({
    paths,
    fallback : false
  })
}


export const getStaticProps = async ({params}) => {
  let retval;
  const data = await getOnePost(params.id);

  if (typeof(data.error) != 'undefined'){
    retval = {error: `${data.error}`};
  }else{
    retval = data.items[0].fields;
    retval.heroImage = data.includes.Asset[0]
  }

  return({ 
    props:{blogpost:retval}
  })
}

export default function Post({blogpost}) {
  return (
    <Layout>
      <Box
        flex
        margin={{ horizontal: "auto" }}
        width={{ max: "xlarge" }}
        height={{ min: "100%" }}
        width={{ max: "xlarge" }}
      >
        <Head>
          <title>Criterion Fiberarts</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <h1 style={{textAlign:"center"}}><Markdown>{blogpost.title}</Markdown></h1>
        <Box
          align="center"
          pad="large"
        >
          <Markdown
            components={{
                          h1:{
                            maxWidth:"90%",
                            margin:"auto"
                          },
                          h2:{
                            maxWidth:"90%",
                            margin:"auto"
                          },
                          h3:{
                            maxWidth:"90%",
                            margin:"auto"
                          },
                          p:{
                            props:{
                              style:{
                                maxWidth:"90%",
                                margin:"auto"
                              }
                            }
                          },
                          ul:{
                            props:{
                              style:{
                                maxWidth:"75%",
                                margin:"auto",
                                marginTop:"1rem",
                                marginBottom:"1rem"
                              }
                            }
                          },
                          img:{
                            props:{
                              style:{
                                maxWidth:"100%",
                                margin:"auto",
                                marginTop:"1rem",
                                marginBottom:"1rem"
                              }
                            }
                          }
                        }
                      }
          >
            {blogpost.body}
          </Markdown>
          <Box
            pad="large"
          >
            &nbsp;
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}