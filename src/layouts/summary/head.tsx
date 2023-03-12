import React from 'react'

type Props = {}

const HeadPart = (props: Props) => {
  return (
    <div className='flex w-full flex-col md:flex-row justify-between items-center'>
        <h1 className='text-[1rem] md:text-[2rem] w-full italic text-blue-500 text-center'>Summary</h1>
        <div className='border-[1px] border-blue-300 rounded-lg p-5 flex gap-[5px] md:flex-nowrap flex-wrap'>
            {[2017,2018,2019,2020].map(item=> <button key={item} className='px-5 py-2 bg-blue-300 rounded-lg' >{item}</button>)}
        </div>
    </div>
  )
}

export default HeadPart