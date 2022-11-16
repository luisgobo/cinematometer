import React from "react";
import VisibilitySensor from "react-visibility-sensor";
import { Embed } from "semantic-ui-react";


export interface VideoProps{
    id: string
}

const Video : React.FC<VideoProps> = (
    { 
        id 
    }) => {
    const [visible, setVisibile] = React.useState<boolean>(false);
    return (
        <VisibilitySensor
            onChange={(isVisible : boolean) => {
                if (isVisible && !visible) {
                    setVisibile(true);
                }
                if (!isVisible && visible) {
                    setVisibile(false);
                }
            }}
            partialVisibility
        >
            <Embed hd={false} id={id} active={visible} source="youtube" />
        </VisibilitySensor>
    );
};

export default Video;
