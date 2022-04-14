import { useContext } from "react";

import { DeviceContext } from "../../App";

interface IProps {
    style?: object,
}

const ChevronIcon = ({ style }: IProps) => {
    const { isMobile } = useContext(DeviceContext);
    return (
        <svg fill="none" xmlns="http://www.w3.org/2000/svg" width={isMobile ? 10 : 19} height={isMobile ? 9 : 17} viewBox="0 0 19 17" style={style}>
            <path d="M11.2321 16C10.4623 17.3333 8.53775 17.3333 7.76795 16L0.406736 3.25C-0.363064 1.91667 0.599186 0.249998 2.13879 0.249998L16.8612 0.25C18.4008 0.25 19.3631 1.91667 18.5933 3.25L11.2321 16Z" fill="#626870" />
        </svg>
    );
}

export default ChevronIcon;