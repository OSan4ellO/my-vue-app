// components/Slide.tsx
import { TextObject } from "./TextObject.tsx";
import { ImageObject } from "./ImageObject.tsx";
import styles from './Slide.module.css';
import { CSSProperties } from "react";

const SLIDE_WIDTH = 935; // Ширина слайда
const SLIDE_HEIGHT = 525; // Высота слайда

type SlideProps = {
    slide: {
        id: string; // slideId
        objects: Array<{ id: string; type: string; x: number; y: number }>;
        background: { type: string; color?: string; src?: string }; // Фон слайда
    };
    scale?: number;
    isSelected: boolean;
    className: string;
    selectedObjectId: string | null; // selectedObjectId передается сюда
};

function Slide({ slide, scale = 1, isSelected, className, selectedObjectId }: SlideProps) {
    // Стили для слайда
    const slideStyles: CSSProperties = {
        position: 'relative',
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
        backgroundColor: slide.background.type === 'solid' ? slide.background.color : 'transparent', // Фон для типа 'solid'
        backgroundImage: slide.background.type === 'image' ? `url(${slide.background.src})` : 'none', // Фон для типа 'image'
        backgroundSize: 'cover', // Чтобы изображение фона покрывало весь слайд
        border: isSelected ? '3px solid #8A2094' : '1px solid #ccc', // Обводка для выделения
    };

    return (
        <div style={slideStyles} className={`${styles.slide} ${className}`}>
            {slide.objects?.map((slideObject) => {
                switch (slideObject.type) {
                    case "text":
                        return (
                            <TextObject
                                key={slideObject.id}
                                textObject={{ ...slideObject, slideId: slide.id }} // Передаем slideId
                                scale={scale}
                                isSelected={slideObject.id === selectedObjectId} // Передаем isSelected
                            />
                        );
                    case "image":
                        return (
                            <ImageObject
                                key={slideObject.id}
                                imageObject={{ ...slideObject, slideId: slide.id }} // Передаем slideId
                                scale={scale}
                                isSelected={slideObject.id === selectedObjectId} // Передаем isSelected
                            />
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
}

export { Slide };