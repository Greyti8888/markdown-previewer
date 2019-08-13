import React from 'react'
import styled from 'styled-components'
import marked from 'marked'

marked.setOptions({
  breaks: true,
  renderer: new marked.Renderer(),
})

export default function Previewer (props) {
  return (
    <PreviewerSC
      id='preview'
      dangerouslySetInnerHTML={{ __html: marked(props.text) }}
    />
  )
}

const PreviewerSC = styled.div`
  box-sizing: border-box;
  min-height: 100vh;
  min-width: 0;
  width: 50%;
  flex: 1 0 0;
  padding: 10px;
  border: solid 0.5px lightgrey;
  border-radius: 5px;
  background-color: white;
  code {
    color: green;
    font-weight: bold;
    background-color: #eee;
  }
  pre {
    background-color: #eee;
  }
  blockquote {
    padding-left: 5px;
    border-left: solid 3px;
  }
  table  {
    border-collapse: collapse;
  }
  td, th {
    padding: 5px;
    border: 1px solid;
  }
`