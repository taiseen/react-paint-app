import DrawingBoard from './components/DrawingBoard';
import DrawingTools from './components/DrawingTools';


const App = () => {


  return (
    <main className='min-h-screen flex items-center justify-center bg-customBg'>

      <section className='flex gap-3 w-full max-w-7xl h-[600px]' >

        <DrawingTools />

        <DrawingBoard />

      </section>


    </main>
  )
}

export default App