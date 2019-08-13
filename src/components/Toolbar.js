import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBold, faItalic, faQuoteLeft, faLink, faImage, faChevronLeft, faChevronRight, faListUl, faListOl} from '@fortawesome/free-solid-svg-icons'


export default class Toolbar extends React.Component {
  
    state = {
      expand: false
    }
    
    addEffect = (button) => {
      let e = this.props.editor.current
      let start = e.selectionStart
      let end = e.selectionEnd
      let selectedText = e.value.slice(start, end)
      let effect = button.currentTarget.id
      let replacementText;
      
      if (!selectedText) {
        selectedText = effect
      }
  
      let selectionStart = '';
      let selectionEnd = '';
      e.focus(); 
      switch (effect) {
        case 'Quote':
        case 'UnorderedListItem':
        case 'OrderedListItem':
          replacementText = toolSet[effect] + selectedText;
          e.setRangeText(replacementText, start, end);
          selectionStart = start + toolSet[effect].length
          selectionEnd = selectionStart + selectedText.length
          e.setSelectionRange(selectionStart, selectionEnd)
          break;
        case 'MultiLineCode':
          replacementText = toolSet[effect] + '\n' + selectedText + '\n' + toolSet[effect];
          e.setRangeText(replacementText, start, end);
          selectionStart = start + toolSet[effect].length
          selectionEnd = selectionStart + selectedText.length + 1
          e.setSelectionRange(selectionStart, selectionEnd)
          break;
        case 'Link':
          replacementText = toolSet[effect].replace('Link', selectedText)
          e.setRangeText(replacementText, start, end);
          selectionStart = start + 1
          selectionEnd = selectionStart + selectedText.length
          e.setSelectionRange(selectionStart, selectionEnd)
          break;
        case 'Image':
          replacementText = toolSet[effect].replace('Alt text', selectedText)
          e.setRangeText(replacementText, start, end);
          selectionStart = start + 5 + selectedText.length
          selectionEnd = selectionStart + 8
          e.setSelectionRange(selectionStart, selectionEnd)
          break;
        default:
          replacementText = toolSet[effect] + selectedText + toolSet[effect];
          e.setRangeText(replacementText, start, end);  
          if(start === end) {
            selectionStart = start + toolSet[effect].length
            selectionEnd = selectionStart + selectedText.length
            e.setSelectionRange(selectionStart, selectionEnd)
          }
      }
      this.props.updateInput()
    }
    
    expandToolbar = () => {
      this.setState({
        expand: !this.state.expand
      })
    }
     
    render() {
      
      return (
        <ToolbarSC
          mainColor={this.props.mainColor}
          >
          <ButtonSC
            id='Bold'
            title='Bold'
            onClick={this.addEffect}
          >
            <FontAwesomeIcon icon={faBold} />
          </ButtonSC>
          <ButtonSC
            id='Italic'
            title='Italic'
            onClick={this.addEffect}
          >
            <FontAwesomeIcon icon={faItalic} />
          </ButtonSC>
          <ButtonSC
            id='Quote'
            title='Quote'
            onClick={this.addEffect}
          >
            <FontAwesomeIcon icon={faQuoteLeft} />
          </ButtonSC>
          <ButtonSC
            id='Link'
            title='Link'
            onClick={this.addEffect}
          >
            <FontAwesomeIcon icon={faLink} />
          </ButtonSC>
          <ButtonSC
            id='Image'
            title='Image'
            onClick={this.addEffect}
          >
            <FontAwesomeIcon icon={faImage} />
          </ButtonSC>
          <ExpandButtonSC
            id='Expand'
            title='More options'
            mainColor={this.props.mainColor}
            onClick={this.expandToolbar}
          >
            <FontAwesomeIcon icon={this.state.expand ? faChevronLeft : faChevronRight} />
          </ExpandButtonSC>
          <HiddenButtonSC
            id='CrossedOut'
            title='Crossed out'
            onClick={this.addEffect}
            expand={this.state.expand}
          ><s>Text</s></HiddenButtonSC>
          <HiddenButtonSC
            id='Code'
            title='Code'
            onClick={this.addEffect}
            expand={this.state.expand}
          >>&lt;/&gt;</HiddenButtonSC>
          <HiddenButtonSC
            id='MultiLineCode'
            title='Multi-line code'
            onClick={this.addEffect}
            expand={this.state.expand}
          >&lt;/Multi-line&gt;</HiddenButtonSC>
          <HiddenButtonSC
            id='UnorderedListItem'
            title='Unordered List Item'
            onClick={this.addEffect}
            expand={this.state.expand}
          >
            <FontAwesomeIcon icon={faListUl} />
          </HiddenButtonSC>
          <HiddenButtonSC
            id='OrderedListItem'
            title='Ordered List Item'
            onClick={this.addEffect}
            expand={this.state.expand}
          >
            <FontAwesomeIcon icon={faListOl} />
          </HiddenButtonSC>
        </ToolbarSC>
      )
    }
  }
  
  const toolSet = {
    Bold: '**',
    Italic: '_',
    CrossedOut: '~~',
    Quote: '> ',
    Code: '`',
    MultiLineCode: '```',
    UnorderedListItem: '- ',
    OrderedListItem: '1. ',
    Link: '[Link] (https://)',
    Image: '![Alt text] (https://)'
  }
  
  const ToolbarSC = styled.div`
    display: flex;
    box-sizing: border-box;
    overflow: auto; 
    width: 100%;
    margin-bottom: 8px;
    padding: 0;
    background-color: ${props => props.mainColor};
  `

  const ButtonSC = styled.button`
    box-sizing: border-box;
    user-select: none;
    flex: none;
    min-width: 30px;
    height: 30px;
    color: dimgrey;
    white-space: nowrap;
    margin: 1px;
    border: 0.5px solid lightgrey;
    border-radius: 5px;
    background-color: white;
  `
  
  const ExpandButtonSC = styled(ButtonSC)`
    background-color: ${props => props.mainColor};
  `
  
  const HiddenButtonSC = styled(ButtonSC)` 
    ${props => props.expand ? '' :
  `width: 0;
  min-width: 0;
  padding: 0;
  border: none;
  overflow: hidden;`
    }
  `