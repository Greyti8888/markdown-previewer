import React from 'react'
import styled from 'styled-components'

const Editor = React.forwardRef((props, ref) => (
  <TextAreaSC 
    id="editor" 
    value={props.text} 
    onChange={props.handleInput}
    ref={ref}
    /> 
));


const TextAreaSC = styled.textarea`
  box-sizing: border-box;
  width: 50%;
  margin: 0;
  resize: none;
  border: solid 0.5px lightgrey;
  border-radius: 5px;
`
export default Editor