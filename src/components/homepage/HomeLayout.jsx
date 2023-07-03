import React from 'react'
import HeroBanner from './HeroBanner'
import FeatureAccounts from './FeatureAccounts'
import FeaturedProducts from './FeaturedProducts'
import Banner from './Banner'
import NewArrival from './NewArrival'
import SmBanner from './SmBanner'
import Banner3 from './Banner3'
import NewsLetter from '../common/NewsLetter'
import Footer from '../common/Footer'

const HomeLayout = () => {
  return (
    <>
      <HeroBanner />
      <FeatureAccounts />
      <FeaturedProducts />
      <Banner />
      <NewArrival />
      <SmBanner />
      <Banner3 />
    </>
  )
}

export default HomeLayout
