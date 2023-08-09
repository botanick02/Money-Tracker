import React, {CSSProperties, useEffect, useState} from 'react';

interface Props {
  path: string
  styles: CSSProperties
}

const SvgFromPath: React.FC<Props> = ({ path, styles }) => {
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    fetch(path)
      .then(response => response.text())
      .then(setSvg);
  }, [path]);

  return <div style={styles} className={"svg-icon"} dangerouslySetInnerHTML={{ __html: svg || '' }} />;
};

export default SvgFromPath;