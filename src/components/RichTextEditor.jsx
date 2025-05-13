import { useRef } from 'react'
import JoditEditor from 'jodit-react'

export default function RichTextEditor({ value, onChange }) {
  const editor = useRef(null)

  const config = {
    readonly: false,
    style: {
      color: '#212529',
    },
    toolbar: true,
    buttons: [
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'fontsize',
      'brush',
      'paragraph',
      '|',
      'align',
      'undo',
      'redo',
      '|',
      'hr',
      'eraser',
      'copyformat',
      '|',
      'fullsize',
      'print',
      'about',
    ],
    colorPickerDefaultTab: 'color',
  }

  return <JoditEditor ref={editor} value={value} config={config} onBlur={onChange} />
}
