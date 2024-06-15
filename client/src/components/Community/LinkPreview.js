import React from 'react'
import Microlink from '@microlink/react';

const LinkPreview = ({ url }) => {
  return (
    <div className='p-4 w-full'>
      <Microlink
        url={url}
      />
    </div>
  )
}

export default LinkPreview;