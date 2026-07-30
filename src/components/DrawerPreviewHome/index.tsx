import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaAngleLeft, FaTimes } from 'react-icons/fa';
import TransformeButton from '../Buttons/TransformeButton';

import { Container, Drawer } from './styles';
import ViewerProfile from '../../containers/home/ViewerProfile';
import light from '../../styles/themes/light';

type DrawerPreviewHomeProps = {
  visible: boolean,
  colorPreview: string,
  setVisible: (visible: boolean) => void,
  children?: React.ReactNode;
}

const DrawerPreviewHome: React.FC<DrawerPreviewHomeProps> = ({
  children,
  visible,
  colorPreview,
  setVisible,
}) => {
  const refDrawer = useRef(null)
  const [childrenVisible, setChildrenVisible] = useState(false);

  const handlePressMenu = useCallback(() => {
    const styleDrawer = refDrawer?.current?.style
    if (!styleDrawer) return

    if (styleDrawer.left !== '8%') {
      setTimeout(() => {
        setVisible(true)
        setChildrenVisible(true)
      }, 100)

      styleDrawer.left = '8%'
      return
    }
    setTimeout(() => {
      setVisible(false)
      setChildrenVisible(false)
    }, 300)
    styleDrawer.left = '-420px'
  }, [setVisible])

  useEffect(() => {
    if (visible) {
      handlePressMenu()
    } else {
      setTimeout(() => {
        setChildrenVisible(false)
      }, 300)
      const styleDrawer = refDrawer?.current?.style
      styleDrawer.left = '-420px'
    }
  }, [handlePressMenu, visible])

  return (
    <Drawer ref={refDrawer}>
      {
        childrenVisible && (
          <TransformeButton onClick={() => handlePressMenu()}>
            <FaAngleLeft color="#000" size={26} />
          </TransformeButton>
        )
      }
      {
        childrenVisible &&
        (
          <ViewerProfile theme={light()} colorPreview={colorPreview} />
        )
      }
    </Drawer>
  )
}

export default DrawerPreviewHome;