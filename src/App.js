import { useEffect, useRef, useState } from "react";
import Header from "./components/Header/Header";
import TargetBox from "./components/TargetBox/TargetBox";
import AppConfig from "./const/AppConfig";
import requests from './requests/requests';

function App() {
  const [score, setScore] = useState(0);
  const [imgPath, setImgPath] = useState('');
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const [targetBoxDimension, setTargetBoxDimension] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0
  });
  const imgRef = useRef();

  const handleResize = () => {
    setImgWidth(imgRef.current.offsetWidth);
    setImgHeight(imgRef.current.offsetHeight);
    setTargetBoxDimension({
      top: Math.round(imgRef.current.offsetHeight / 4),
      left: Math.round(imgRef.current.offsetWidth / 4),
      width: Math.round(imgRef.current.offsetWidth / 2),
      height: Math.round(imgRef.current.offsetHeight / 2)
    });
  };

  const refresh = () => (
    requests
      .detection({
        top: Math.round(targetBoxDimension.top / imgRef.current.offsetHeight * 100),
        left: Math.round(targetBoxDimension.left / imgRef.current.offsetWidth * 100),
        width: Math.round(targetBoxDimension.width / imgRef.current.offsetWidth * 100),
        height: Math.round(targetBoxDimension.height / imgRef.current.offsetHeight * 100)
      })
      .then(res => res.json())
      .then(({ path, score }) => {
        setScore(score);
        setImgPath(path);
        if (targetBoxDimension.width === 0) {
          setTimeout(handleResize, 100);
        }
      })
  );

  useEffect(() => {
    refresh();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header title="投餵監測系統" />
      <div className="mx-auto px-4 py-4 max-w-3xl">
        <div className="bg-white shadow-2xl rounded-lg mb-6 tracking-wide">
          <div className="md:flex-shrink-0 relative overflow-hidden" style={{paddingBottom: '58%'}}>
            <img
              src={`http://${AppConfig.server.host}:${AppConfig.server.port}/snapshot?path=${imgPath}`}
              alt="snapshot"
              className="absolute w-full h-auto rounded-lg rounded-b-none"
              ref={imgRef}
            />
            <div className="absolute">
              <TargetBox
                containerWidth={imgWidth}
                containerHeight={imgHeight}
                dimension={targetBoxDimension}
                onDimensionChange={setTargetBoxDimension}
              />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl">
              分數：<span className={`text-${['green', 'yellow', 'red'][Math.floor(score / 34)]}-400`}>{score}</span> / 100
            </span>
            {/* <span className="w-1/2 text-center text-gray-500">拍攝時間：2021/02/07 12:35</span> */}
            <span className="w-1/2 text-center text-red-400">請調整紅框大小及位置以鎖定目標區域</span>
            <button
              type="button"
              className="border border-green-500 bg-green-500 text-white rounded-md px-8 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
              onClick={refresh}
            >
              更新
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
