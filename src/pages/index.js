import React from 'react'

import Layout from '../components/layout'
import Link from '../components/link'
import Image from '../components/image'
import Head from '../components/head'

const IndexPage = () => (
  <Layout>
    <Head title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2">Go to page 2</Link>
  </Layout>
)

export default IndexPage
