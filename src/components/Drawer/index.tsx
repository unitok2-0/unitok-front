import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import TransformeButton from '../Buttons/TransformeButton';

import { Container, Drawer } from './styles';

export type DrawerComponentProps = {
  visible: boolean,
  setVisible: (visible: boolean) => void,
  children?: any;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({
  children,
  visible,
  setVisible,
}) => {
  const refDrawer = useRef(null)
  const [childrenVisible, setChildrenVisible] = useState(false);

  const handlePressMenu = useCallback(() => {
    const styleDrawer = refDrawer?.current?.style
    if (!styleDrawer) return

    if (styleDrawer.width !== '240px') {
      setTimeout(() => {
        setVisible(true)
        setChildrenVisible(true)
      }, 200)

      styleDrawer.width = '240px'
      return
    }
    setTimeout(() => {
      setVisible(false)
      setChildrenVisible(false)
    }, 50)
    styleDrawer.width = '0px'
  }, [setVisible])

  useEffect(() => {
    if (visible) {
      handlePressMenu()
    } else {
      setTimeout(() => {
        setChildrenVisible(false)
      }, 50)
      const styleDrawer = refDrawer?.current?.style
      styleDrawer.width = '0px'
    }
  }, [handlePressMenu, visible])

  return (
    <Drawer ref={refDrawer}>
      {
        childrenVisible && (
          <TransformeButton onClick={() => handlePressMenu()}>
            <FaAngleRight color="#fff" size={26} />
          </TransformeButton>
        )
      }
      {childrenVisible && children}
    </Drawer>
  )
}

export default DrawerComponent;