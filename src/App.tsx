import React, {useRef, useState} from 'react';
import './App.css';

function App() {
    const dragItem:  React.MutableRefObject<number | null> = useRef(null);
    const dragOverItem = useRef(null);

    const [list, setList] = useState(['Item 1','Item 2','Item 3','Item 4','Item 5','Item 6']);

    const dragStart = (position: number) => {
        dragItem.current = position
    }
    const dragEnter = (position: any) => {
        dragOverItem.current = position;
    };

    const drop = () => {
        const copyListItems = [...list];
        const dragItemContent = copyListItems[Number(dragItem.current)];
        copyListItems.splice(Number(dragItem.current), 1);
        copyListItems.splice(Number(dragOverItem.current), 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setList(copyListItems);
    };

    return (
        <>
            {
                list &&
                list.map((item, index) => (
                    <div style={{backgroundColor:'lightblue', margin:'20px 25%', textAlign:'center', fontSize:'40px'}}
                         key={index}
                         onDragStart={() => dragStart(index)}
                         onDragEnter={() => dragEnter(index)}
                         onDragEnd={drop}
                         onDragOver={(e) => e.preventDefault()}
                         draggable>
                        {item}
                    </div>
                ))}
        </>
    );
}

export default App;
