import React from 'react'
import styled from 'styled-components'

import Toolbar from './components/Toolbar'
import DragBar from './components/Dragbar'
import Editor from './components/Editor'
import Previewer from './components/Previewer'

export default class App extends React.Component {
  
  state = {
    // eslint-disable-next-line
    input: editorPlaceholder,
    resize: false
  }

  componentDidMount() {
    document.body.style.margin = 0
  }

  editor = React.createRef()
  containerPadding = 25
  mainColor = '#f1f1f1'
  dragBarWidth = 8
  
  handleInput = () => { 
    this.setState({ 
      input: this.editor.current.value,
    })
  }

  toggleResize = (e) => {
    if (e.target.id === 'dragbar') {
      this.setState({
        resize: true
      })
    } 
    if (this.state.resize) {
      this.setState({ 
        resize: false
      })
    }
  }
  
  handleResize = (e) => {
      this.editor.current.style.width = (e.pageX - this.dragBarWidth / 2 - this.containerPadding) + 'px'
  }
  
  render() {
    return (
      <ContainerSC
        containerPadding={this.containerPadding}
        mainColor={this.mainColor}
        turnOffSelection={this.state.resize}
        onMouseDown={this.toggleResize}
        onMouseUp={this.toggleResize}
        onMouseMove={this.state.resize ? this.handleResize : null}
      >
        <Toolbar
          mainColor={this.mainColor}
          editor={this.editor}
          updateInput={this.handleInput}
        />
        <EditorPreviewerSC
          mainColor={this.mainColor}
          >
          <Editor
            text={this.state.input}
            handleInput={this.handleInput}
            ref={this.editor}
          />
          <DragBar
            mainColor={this.mainColor}
            dragBarWidth={this.dragBarWidth}
            handleDragState={this.handleDragState}
            />
          <Previewer
            text={this.state.input}
            />
        </EditorPreviewerSC>
      </ContainerSC>
    )
  }
}

const ContainerSC = styled.div`
  user-select: ${props => props.turnOffSelection ? 'none' : ''};
  padding: ${props => props.containerPadding}px;
  background-color: ${props => props.mainColor};
`

const EditorPreviewerSC = styled.div`
  display: flex;
  overflow: hidden;
  background-color: ${props => props.mainColor};
`

const editorPlaceholder = 
`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

Some cool line

---

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`