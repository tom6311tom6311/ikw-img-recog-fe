import ResizableRect from 'react-resizable-rotatable-draggable'


function TargetBox(props) {
  const {
    containerWidth,
    containerHeight,
    dimension,
    onDimensionChange
  } = props;

  const handleResize = (style) => {
    let { top, left, width, height } = style
    const newTop = Math.max(Math.round(top), 0);
    const newLeft = Math.max(Math.round(left), 0);
    const newWidth = Math.min(Math.round(width), containerWidth - newLeft);
    const newHeight = Math.min(Math.round(height), containerHeight - newTop);
    onDimensionChange({
      top: newTop,
      left: newLeft,
      width: newWidth,
      height: newHeight
    });
  };
 
  const handleDrag = (deltaX, deltaY) => {
    const { top, left } = dimension;
    const newTop = Math.min(Math.max(Math.round(top + deltaY), 0), containerHeight - height);
    const newLeft = Math.min(Math.max(Math.round(left + deltaX), 0), containerWidth - width);
    onDimensionChange({
      ...dimension,
      top: newTop,
      left: newLeft,
    });
  };

  const { top, left, width, height } = dimension;
  return (
    <ResizableRect
      top={top}
      left={left}
      width={width}
      height={height}
      rotateAngle={0}
      minWidth={50}
      minHeight={50}
      zoomable='nw,se'
      rotatable={false}
      onResize={handleResize}
      onDrag={handleDrag}
    />
  );
}

export default TargetBox;
