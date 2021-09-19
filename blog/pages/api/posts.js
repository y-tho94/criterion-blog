const data = [
  {
    "postId":"1"
    ,"title":"Post 1"
    ,"blurb":"This is the first post"
    ,"image":"https://i5.walmartimages.com/asr/d4a4838d-4a63-4752-a2e2-4893a4a311f9.f1f63919b29a1b74a94acd29f112710b.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff"
    ,"postedDate":"01/01/2021"
  },
  {
    "postId":"2"
    ,"title":"Post 2"
    ,"blurb":"This is the second post"
    ,"image":"https://i5.walmartimages.com/asr/d4a4838d-4a63-4752-a2e2-4893a4a311f9.f1f63919b29a1b74a94acd29f112710b.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff"
    ,"postedDate":"01/01/2021"
  },
  {
    "postId":"3"
    ,"title":"Post 3"
    ,"blurb":"This is the third post"
    ,"image":"https://i5.walmartimages.com/asr/d4a4838d-4a63-4752-a2e2-4893a4a311f9.f1f63919b29a1b74a94acd29f112710b.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff"
    ,"postedDate":"01/01/2021"
  },
  {
    "postId":"4"
    ,"title":"Post 4"
    ,"blurb":"This is the fourth post"
    ,"image":"https://i5.walmartimages.com/asr/d4a4838d-4a63-4752-a2e2-4893a4a311f9.f1f63919b29a1b74a94acd29f112710b.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff"
    ,"postedDate":"01/01/2021"
  }
]

export default (req, res) => {
  res.status(200).json(data);
}