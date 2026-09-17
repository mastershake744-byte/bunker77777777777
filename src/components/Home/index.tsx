import React from 'react';
import Hero3D from './3d';
import BoilerTable from './table';
import BunkerInfo from './bunker';
import RelatedServices from './related';

export default function HomePage() {
  return (
    <>
      <Hero3D />
      <BoilerTable />
      <BunkerInfo />
      <RelatedServices />
    </>
  );
}
