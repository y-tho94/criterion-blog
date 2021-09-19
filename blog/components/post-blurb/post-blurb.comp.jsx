import React from 'react'
import Link from 'next/link';

import{
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Box,
} from 'grommet';

export default function PostBlurb({postId, postedDate, title, blurb, img}) {
  return (
    <Box
      height="flex"
      width={{max:"medium"}}
    >
      <Link href={`/posts/${postId}`}>
        <Card>
          <CardHeader
            height="xxsmall"
            style={{
              paddingLeft:"10px",
              borderBottom:"1px solid #eee"
            }} 
          >
            <h3>{`${title}`}</h3>
          </CardHeader>
          <CardBody
            flex={false}
            background={`url(${img.file.url})`}
          >
            <Box
              background="rgb(255,255,255, .9)"
              pad="xxsmall"
              wrap
              height={{min:"20vh"}}
            >
              <p>{`${blurb}`}</p>
            </Box>
          </CardBody>
          <CardFooter
            flex
            justify="end"
            pad="xxsmall"
          >
            <h6 style={{color:"#ddd"}}>{`${postedDate}`}</h6>
          </CardFooter>
        </Card>
      </Link>
    </Box>
  )
}
