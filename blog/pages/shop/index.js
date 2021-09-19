import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Cheerio = require('cheerio');

export const getEtsy =  async () => {
  const options = {
    mode : 'no-cors'
  };

  const raw = await fetch('https://www.etsy.com/shop/CriterionDice', options);
  const text = await raw.text();
  const $ = Cheerio.load(text);
  
  let itemListings = []

  $('body').each((i) => {
    itemListings.push($('.v2-listing-card').html())
  })

  return itemListings;
}

export async function Shop() {
  const etsy = await getEtsy();
  console.log('here', etsy);
  return (
    <div>
      
    </div>
  )
}

export default dynamic(() => Promise.resolve(Shop), {ssr:false});
