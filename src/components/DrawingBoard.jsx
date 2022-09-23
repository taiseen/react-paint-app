import { useDrawingToolsContext } from '../context/DrawingContext';
import { useState, useEffect } from 'react';


const DrawingBoard = _ => {

    const { toolsForDrawing, isCheckedForFill, sliderValue, selectedColor,
        canvasBackgroundColor, canvasObject, setCanvasObject, canvasRef } = useDrawingToolsContext();

    const [snapShot, setSnapShot] = useState(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [passingCurrentMousePosition, setPassingCurrentMousePosition] = useState({
        x: 0,
        y: 0
    })

    // const set_canvas_bg_color_at_img_download = () => {
    //     canvasObject.fillStyle = canvasBackgroundColor;
    //     canvasObject.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    //     canvasObject.fillStyle = selectedColor;
    // }

    useEffect(() => {

        if (canvasRef.current) {
            setCanvasObject(canvasRef.current.getContext('2d'))
        }

        const resizing_canvas_width_height = _ => {
            canvasRef.current.width = canvasRef.current.offsetWidth;
            canvasRef.current.height = canvasRef.current.offsetHeight;
        }

        // if (canvasRef.current) {
        //     canvasObject.fillStyle = canvasBackgroundColor;
        //     canvasObject.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        //     canvasObject.fillStyle = selectedColor;
        // }

        window.addEventListener('load', resizing_canvas_width_height);
        return _ => document.removeEventListener('load', resizing_canvas_width_height);

    }, [canvasObject, canvasRef, setCanvasObject]);





    // ⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜
    const drawRectangle = ({ nativeEvent: { offsetX, offsetY } }) => {

        isCheckedForFill
            ? canvasObject.fillRect(offsetX, offsetY,
                passingCurrentMousePosition.x - offsetX,
                passingCurrentMousePosition.y - offsetY,
            )
            : canvasObject.strokeRect(offsetX, offsetY,
                passingCurrentMousePosition.x - offsetX,
                passingCurrentMousePosition.y - offsetY,
            )
    }


    // ⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪
    const drawCircle = ({ nativeEvent: { offsetX, offsetY } }) => {

        // create new path to draw a new circle every time...
        canvasObject.beginPath();

        const radius = Math.sqrt(
            Math.pow((passingCurrentMousePosition.x - offsetX), 2) +
            Math.pow((passingCurrentMousePosition.y - offsetY), 2)
        )

        // this method is used to create a circle... // x , y , radius, start-angle, end-angle
        // creating circle according to the mouse pointer...
        canvasObject.arc(passingCurrentMousePosition.x, passingCurrentMousePosition.y, radius, 0, 2 * Math.PI)

        isCheckedForFill ? canvasObject.fill() : canvasObject.stroke();
    }


    // 🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺
    const drawTriangle = ({ nativeEvent: { offsetX, offsetY } }) => {

        // create new path to draw a new circle every time...
        canvasObject.beginPath();

        // moving triangle to the mouse point  
        canvasObject.moveTo(passingCurrentMousePosition.x, passingCurrentMousePosition.y);

        // creating the 1st line according to the mouse point 
        canvasObject.lineTo(offsetX, offsetY);

        // creating bottom line of triangle
        canvasObject.lineTo(passingCurrentMousePosition.x * 2 - offsetX, offsetY);

        // close path of a triangle, so that 3rd line draw automatically...
        canvasObject.closePath();

        isCheckedForFill ? canvasObject.fill() : canvasObject.stroke();
    }


    // ✅✅✅✅✅✅✅✅✅✅✅✅
    const startDrawing = e => {
        setIsDrawing(true);

        // store current mouse position...
        setPassingCurrentMousePosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });

        // this method, create a new path to draw point...
        canvasObject.beginPath();

        // drawing line width...
        canvasObject.lineWidth = sliderValue;

        // set line color 
        canvasObject.strokeStyle = selectedColor;   // set color for stroke
        canvasObject.fillStyle = selectedColor;     // set color for fill


        // this method return an Image Data Object that copies the pixel data.
        // copy canvas data & passing as snapshot value... this avoid dragging the image...
        setSnapShot(canvasObject.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height));
    }


    // 🎨🎨🎨🎨🎨🎨🎨🎨🎨🎨🎨🎨
    const drawingInCanvas = e => {

        if (isDrawing) {

            // this method, puts the image data back ont the canvas.
            // so adding coping canvas data on to this canvas.
            canvasObject.putImageData(snapShot, 0, 0);

            if (toolsForDrawing === 'brush' || toolsForDrawing === 'eraser') {

                // for erasing... 
                canvasObject.strokeStyle = toolsForDrawing === 'eraser'
                    ? canvasBackgroundColor
                    : selectedColor

                // for brush + eraser <==== both need these 2 line of statement to execute()
                // lineTo() method create a new line
                // creating line according to the mouse point...
                canvasObject.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

                // drawing/fill line with color...
                canvasObject.stroke();

            } else if (toolsForDrawing === 'rectangle') {
                drawRectangle(e);
            } else if (toolsForDrawing === 'circle') {
                drawCircle(e);
            } else if (toolsForDrawing === 'triangle') {
                drawTriangle(e);
            }
        }
    }



    // 🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
    const stopDrawing = e => setIsDrawing(false)




    return (
        <section className='flex-1  rounded-md' style={{ backgroundColor: canvasBackgroundColor }}>

            <canvas
                ref={canvasRef}
                className='w-full h-full'
                onMouseDown={startDrawing}
                onMouseMove={drawingInCanvas}
                onMouseUp={stopDrawing}
            >

            </canvas>

        </section>
    )
}

export default DrawingBoard;