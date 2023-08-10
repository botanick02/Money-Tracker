import React, {CSSProperties, useEffect, useState} from 'react';

interface Props {
  path: string
  styles: CSSProperties
  isActive?: boolean
}

const SvgFromPath: React.FC<Props> = ({path, styles, isActive}) => {
  const [svg, setSvg] = useState<string | null>(null);
  const [fill, setFill] = useState("black")

  const divRef = React.useRef<HTMLDivElement | null>(null)

  const relativeLuminance = (r: number, g: number, b: number) => {
    const res = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
    console.log(res)
    return res
  }

  useEffect(() => {
    fetch(path)
      .then(response => response.text())
      .then(setSvg);
  }, [path]);

  useEffect(() => {
    const bgColor: string = divRef.current?.style.backgroundColor ?? ""
    const rgb = bgColor.match(/\d+/g)?.map(Number) as [number, number, number];

    if (!rgb)
      return
    const luminance = relativeLuminance(...rgb);
    setFill(luminance > 136 ? 'black' : 'white');
  }, [divRef.current?.style.backgroundColor])

  return <div ref={divRef}
              style={styles}
              className={`svg-icon svg-fill-${fill} ${isActive ? "active-icon" : ""}`}
              dangerouslySetInnerHTML={{__html: svg || ''}}/>;
};

export default SvgFromPath;