import { createContext, useContext, useRef, useState } from "react";


const DrawingTools = createContext();


export const DrawingContext = ({ children }) => {


    const canvasRef = useRef(null);

    const [canvasObject, setCanvasObject] = useState({});
    const [clearCanvas, setClearCanvas] = useState(false);

    const [sliderValue, setSliderValue] = useState(5);
    const [selectedColor, setSelectedColor] = useState('#4A98F7');
    const [toolsForDrawing, setToolsForDrawing] = useState('brush');
    const [isCheckedForFill, setIsCheckedForFill] = useState(false);
    const [canvasBackgroundColor, setCanvasBackgroundColor] = useState('#f3f4f6');


    return (
        <DrawingTools.Provider value={
            {
                canvasRef,
                canvasObject,
                setCanvasObject,
                clearCanvas,
                setClearCanvas,
                sliderValue,
                setSliderValue,
                selectedColor,
                setSelectedColor,
                toolsForDrawing,
                setToolsForDrawing,
                isCheckedForFill,
                setIsCheckedForFill,
                canvasBackgroundColor,
                setCanvasBackgroundColor,
            }
        }>
            {
                children
            }
        </DrawingTools.Provider>
    )
}

export const useDrawingToolsContext = () => useContext(DrawingTools);