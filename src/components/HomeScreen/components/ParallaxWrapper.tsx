import { throttle } from "lodash";
import React, { useContext } from "react";
import { Parallax } from "react-parallax";
import { DeviceContext } from "../../../App";
interface IProps {
  children: React.ReactNode;
}

const calc = (x: number, y: number) => [
  x - window.innerWidth / 2,
  y - window.innerHeight / 2,
];

const ParallaxWrapper = ({ children }: IProps) => {
  const { isMobile, windowHeight } = useContext(DeviceContext);
  const [mousePosition, setMousePosition] = React.useState<number[]>([0, 0]);
  const [windowWidth, setWindowWidth] = React.useState<number>(window.innerWidth);

  const setMousePositionDebounced = React.useMemo(
    () =>
      throttle((coords: number[]) => {
        setMousePosition(coords);
      }, 20),
    []
  );

  React.useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return isMobile ? (
    <Parallax
      blur={{ min: -15, max: 13 }}
      bgImage={"./assets/mobile/LaptopMobile.svg"}
      bgImageAlt="Laptop"
      bgImageStyle={{
        height: "118px",
        width: "134px",
        left: windowWidth / 2 + 146.5,
        top: "calc(" + windowHeight + "px * 316/655)",
        zIndex: 2,
      }}
    >
      <Parallax
        blur={{ min: -15, max: 15 }}
        bgImage={"./assets/mobile/ClockMobile.svg"}
        bgImageAlt="Clock"
        strength={100}
        bgImageStyle={{
          height: "53px",
          width: "52px",
          left: windowWidth / 2 + 114.5,
          top: "calc(" + windowHeight + "px * 171/655)",
        }}
      >
        <Parallax
          blur={{ min: -15, max: 15 }}
          bgImage={"./assets/mobile/WalletMobile.svg"}
          bgImageAlt="Wallet"
          strength={400}
          bgImageStyle={{
            height: "122px",
            width: "129px",
            left: windowWidth / 2 - 138,
            top: "calc(" + windowHeight + "px * 114/655)",
          }}
        >
          <Parallax
            blur={{ min: -15, max: 15 }}
            bgImage={"./assets/mobile/Laptop2Mobile.svg"}
            bgImageAlt="Lpt"
            strength={100}
            bgImageStyle={{
              height: "87px",
              width: "84px",
              left: windowWidth / 2 - 108.5,
              top: "calc(" + windowHeight + "px * 347/655)",
            }}
          >
            <Parallax
              blur={{ min: -15, max: 15 }}
              bgImage={"./assets/mobile/CardMobile.svg"}
              bgImageAlt="Card"
              strength={50}
              bgImageStyle={{
                height: "27px",
                width: "35px",
                left: windowWidth / 2 + 3.5,
                top: "calc(" + windowHeight + "px * 158/655)",
              }}
            >
              {children}
            </Parallax>
          </Parallax>
        </Parallax>
      </Parallax>
    </Parallax>
  ) : (
    <div
      onMouseMove={({ clientX: x, clientY: y }) =>
        setMousePositionDebounced(calc(x, y))
      }
    >
      <Parallax
        blur={{ min: -15, max: 13 }}
        bgImage={"./assets/Laptop.png"}
        bgImageAlt="Laptop"
        strength={150}
        bgImageStyle={{
          height: "260px",
          width: "260px",
          left: (windowWidth > 1440 ? (windowWidth/ 2 + 410) : (windowWidth - 310)) - mousePosition[0] / 50,
          top: 520 - mousePosition[1] / 50,
        }}
      >
        <Parallax
          blur={{ min: -15, max: 15 }}
          bgImage={"./assets/Clock.png"}
          bgImageAlt="Clock"
          strength={100}
          bgImageStyle={{
            height: "210px",
            width: "190px",
            left: (windowWidth > 1440 ? (windowWidth / 2 + 590) : (windowWidth - 130)) - mousePosition[0] / 100,
            top: 250 - mousePosition[1] / 100,
          }}
        >
          <Parallax
            blur={{ min: -15, max: 15 }}
            bgImage={"./assets/Wallet.png"}
            bgImageAlt="Wallet"
            strength={400}
            bgImageStyle={{
              height: "150px",
              width: "150px",
              left: (windowWidth > 1440 ? (windowWidth / 2 - 610) : (110)) - mousePosition[0] / 120,
              top: 250 - mousePosition[1] / 120,
            }}
          >
            <Parallax
              blur={{ min: -15, max: 15 }}
              bgImage={"./assets/laptop2.png"}
              bgImageAlt="Lpt"
              strength={100}
              bgImageStyle={{
                height: "150px",
                width: "150px",
                left: (windowWidth > 1440 ? (windowWidth / 2 - 610) : (110)) - mousePosition[0] / 120,
                top: 550 - mousePosition[1] / 500,
              }}
            >
              <Parallax
                blur={{ min: -15, max: 15 }}
                bgImage={"./assets/Card.png"}
                bgImageAlt="Card"
                strength={50}
                bgImageStyle={{
                  height: "150px",
                  width: "150px",
                  left: windowWidth / 2 + 90,
                  top: 50,
                }}
              >
                {children}
              </Parallax>
            </Parallax>
          </Parallax>
        </Parallax>
      </Parallax>
    </div>
  );
};

export default ParallaxWrapper;


