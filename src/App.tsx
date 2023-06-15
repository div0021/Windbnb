import AdvanceSearch from './components/AdvanceSearch'
import Heading from './components/Heading'
import Items from './components/Items'
import Search from './components/Search'

import { useSearchContext } from './provider/searchContext'
import { useRef } from 'react'

function App() {
  const {show} = useSearchContext();
  
  const ref = useRef<HTMLDivElement>(null);
  
  if(show){
    ref.current?.classList.remove('hidden')
    setTimeout(()=>{
      ref.current?.classList.remove('opacity-0')
    },700)
  }else{
    setTimeout(()=>{
      ref.current?.classList.add('hidden');
    },1000);
   
     ref.current?.classList.add('opacity-0')
  }

  return (
    <>
    
    <AdvanceSearch />
    
   <div ref={ref} className='w-[23.5rem] smini:w-[100dvw] h-[75rem] smini:h-[100dvh] bg-slate-50/80 fixed top-0 z-10 hidden opacity-0 transition-opacity duration-[2000ms] ease-in-out'></div>

     <div className='micro:flex flex-col justify-center mini:w-[100dvw]'>
     <div className='p-3 md:p-5 big:p-12 pt-7 space-y-10 big:space-y-20'>

      <div className='space-y-10 big:space-y-0 big:flex justify-between items-center'>
      <Heading  />
    <Search />
      </div>
    
    <div className='font-montserrat'>
   
    <Items />
    </div>
   
    </div>
    <footer className='text-sm font-semibold font-montserrat text-center text-[#828282]'>
      Don't copy built yours!!
    </footer>
    </div>
    </>
  )
}

export default App
