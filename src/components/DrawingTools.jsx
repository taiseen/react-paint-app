import { Brush, Circle, Eraser, Rectangle, Triangle } from '../assets';
import { useDrawingToolsContext } from '../context/DrawingContext';


const DrawingTools = _ => {

  const { toolsForDrawing, setToolsForDrawing, setIsCheckedForFill, setSliderValue,
    setSelectedColor, selectedColor, setCanvasBackgroundColor, setClearCanvas, canvasObject,
    canvasRef, canvasBackgroundColor } = useDrawingToolsContext();


  const handlerToolsForDrawing = e => setToolsForDrawing(e.target.id);


  const handleClearCanvas = _ => {

    // reset canvas background...
    setCanvasBackgroundColor('#f3f4f6');

    // clear whole canvas...
    setClearCanvas(canvasObject.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height));
    
  }


  const handleSaveDrawingAsImage = _ => {

    // creating <a> element
    const image = document.createElement('a');

    // set current date as downloadable file name
    image.download = `${Date(Date.now()).slice(0, 24)}.jpg`;

    // passing canvas data as link href value
    image.href = canvasRef.current.toDataURL();

    // click link to download image
    image.click();

  }



  return (
    <section className='bg-gray-100 rounded-md p-3 text-gray-700 select-none flex flex-col justify-between'>

      <div className='space-y-4'>


        {/* Shapes */}
        <div>
          <label htmlFor="" className='title text-lg font-bold'>Shapes</label>
          <ul className='pt-2 '>
            <li
              id="rectangle"
              className={`toolsStyle group ${toolsForDrawing === 'rectangle' && 'text-orange-500'}`}
              onClick={handlerToolsForDrawing}
            >
              <Rectangle className='childToolStyle' />
              <span className='childToolStyle'>Rectangle</span>
            </li>

            <li
              id="circle"
              className={`toolsStyle group ${toolsForDrawing === 'circle' && 'text-orange-500'}`}
              onClick={handlerToolsForDrawing}
            >
              <Circle className='childToolStyle' />
              <span className='childToolStyle'>Circle</span>
            </li>

            <li
              id="triangle"
              className={`toolsStyle group ${toolsForDrawing === 'triangle' && 'text-orange-500'}`}
              onClick={handlerToolsForDrawing}
            >
              <Triangle className='childToolStyle' />
              <span className='childToolStyle'>Triangle</span>
            </li>

            {/* ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅ */}
            <li className="toolsStyle group">
              <input
                type="checkbox"
                id="fillColor"
                className='w-4 h-4'
                onChange={e => setIsCheckedForFill(e.target.checked)}
              />
              <label
                htmlFor="fillColor"
                className='cursor-pointer childToolStyle'
              >
                Fill Color
              </label>
            </li>
          </ul>
        </div>


        {/* Options */}
        <div>
          <label htmlFor="" className='title text-lg font-bold'>Options</label>
          <ul className='options pt-2'>
            <li
              id="brush"
              className={`toolsStyle group ${toolsForDrawing === 'brush' && 'text-orange-500'}`}
              onClick={handlerToolsForDrawing}
            >
              <Brush className='childToolStyle' />
              <span className='childToolStyle'>Brush</span>
            </li>

            <li
              id="eraser"
              className={`toolsStyle group ${toolsForDrawing === 'eraser' && 'text-orange-500'}`}
              onClick={handlerToolsForDrawing}
            >
              <Eraser className='childToolStyle' />
              <span className='childToolStyle'>Eraser</span>
            </li>

            <li className="option">
              <input
                type="range"
                min='1'
                defaultValue='5'
                max='30'
                className='w-full h-1.5'
                onChange={e => setSliderValue(e.target.value)}
              />
            </li>
          </ul>
        </div>


        {/* Colors */}
        <div>

          <span className='font-semibold'>Line Colors</span>

          <ul className='options flex gap-2 items-center justify-between px-2 py-2'>

            <li
              className="customColorList border hover:before:border-gray-200"
              style={{ backgroundColor: '#fff' }}
              onClick={e => setSelectedColor(e.target.style.backgroundColor)}>
            </li>

            <li
              className="customColorList bg-black"
              style={{ backgroundColor: '#111' }}
              onClick={e => setSelectedColor(e.target.style.backgroundColor)}>
            </li>

            <li
              className="customColorList"
              style={{ backgroundColor: '#ef4444' }}
              onClick={e => setSelectedColor(e.target.style.backgroundColor)}>
            </li>

            <li
              className="customColorList"
              style={{ backgroundColor: '#fb923c' }}
              onClick={e => setSelectedColor(e.target.style.backgroundColor)}>
            </li>

            <li
              className="customColorList"
              style={{ backgroundColor: '#22c55e' }}
              onClick={e => setSelectedColor(e.target.style.backgroundColor)}>
            </li>

            <input
              type="color"
              defaultValue={selectedColor}
              className='colorSelector'
              onChange={e => setSelectedColor(e.target.value)}
            />
          </ul>
        </div>


        {/* Canvas Color */}
        <div >
          <p className='font-semibold'>Canvas Color</p>
          <input
            type="color"
            value={canvasBackgroundColor}
            className='w-full h-10 rounded-md border-0'
            onChange={e => setCanvasBackgroundColor(e.target.value)}
          />
        </div>


      </div>


      <div className="space-y-2 text-gray-700">

        <button
          className='btn border border-gray-500 hover:bg-red-500 hover:border-white'
          onClick={handleClearCanvas}
        >
          Clear Canvas
        </button>

        <button
          className='btn text-white bg-customBg hover:bg-green-500'
          onClick={handleSaveDrawingAsImage}
        >
          Save as image
        </button>

      </div>

    </section>
  )
}

export default DrawingTools