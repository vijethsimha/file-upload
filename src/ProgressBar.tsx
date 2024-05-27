import { useEffect, useState } from "react";
import "./ProgressLine.css";

const ProgressLine = ({
    label,
    backgroundColor = "#e5e5e5",
    // expected format for visual parts
    visualParts = [
        {
            percentage: "0%",
            color: "white",
        },
    ],
}: {
    label: string;
    backgroundColor: string;
    visualParts: {
        percentage: string;
        color: string;
    }[];
}) => {
    const [widths, setWidths] = useState<string[]>(
        visualParts.map(() => {
            return "0";
        })
    );

    useEffect(() => {
        requestAnimationFrame(() => {
            setWidths(
                visualParts.map((item) => {
                    return item.percentage;
                })
            );
        });
    }, [visualParts]);

    return (
        <>
            <div className='progressLabel'>{label}</div>
            <div
                className='progressVisualFull'
                // to change the background color dynamically
                style={{
                    backgroundColor,
                }}
            >
                {visualParts.map((item, index) => {
                    return (
                        <div
                            key={index}
                            style={{
                                width: widths[index],
                                // setting the actual color of bar part
                                backgroundColor: item.color,
                            }}
                            className='progressVisualPart'
                        />
                    );
                })}
            </div>
        </>
    );
};

export default ProgressLine;
