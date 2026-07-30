import React from 'react';
import ContentLoader from "react-content-loader"
import { FirstScreen } from 'components/HomeModules/Module1/styles';

const SkeletonHome: React.FC = (props) => {
  return (
    <FirstScreen>
      <ContentLoader
        speed={0.8}
        width={390}
        height={800}
        viewBox="0 0 390 800"
        backgroundColor="#f3f3f3"
        foregroundColor="#e6e6e6"
        style={{ marginTop: '-5rem', position: 'relative' }}
        {...props}
      >
        <circle cx="195" cy="80" r="65" />
        <rect x="81" y="180" rx="8" ry="8" width="221" height="20" />
        <rect x="119" y="215" rx="8" ry="8" width="148" height="20" />

        <rect x="42" y="275" rx="8" ry="8" width="145" height="50" />
        <rect x="42" y="335" rx="8" ry="8" width="145" height="50" />

        <rect x="202" y="275" rx="8" ry="8" width="145" height="50" />
        <rect x="202" y="334" rx="8" ry="8" width="145" height="50" />

        <rect x="155" y="420" rx="8" ry="8" width="78" height="20" />

        <rect x="44" y="454" rx="8" ry="8" width="300" height="50" />
        <rect x="44" y="516" rx="8" ry="8" width="300" height="50" />
        <rect x="44" y="577" rx="8" ry="8" width="300" height="50" />
        <rect x="44" y="638" rx="8" ry="8" width="300" height="50" />
      </ContentLoader>
    </FirstScreen>
  )
}

export default SkeletonHome;

