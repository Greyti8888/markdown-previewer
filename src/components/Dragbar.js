import React from 'react'
import styled from 'styled-components'

export default function DragBar(props) {
  return (
  <DragBarSC
    id="dragbar"
    mainColor={props.mainColor}
    dragBarWidth={props.dragBarWidth}
  />
  )
} 

const DragBarSC = styled.div`
  cursor: col-resize;
  min-width: ${props => props.dragBarWidth}px;
  background-color: ${props => props.mainColor};
`