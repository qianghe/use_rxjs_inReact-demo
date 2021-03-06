import React from 'react'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'

export function EditorComponent({ value, defaultValue, onChange }) {
	return (
		<AceEditor
			name="AceEditor_EditorComponent"

			mode="javascript"
			theme="monokai"

			defaultValue={defaultValue}
			value={value}

			width="100%"
			maxLines={Infinity}

			showGutter={true}
			tabSize={2}
			wrapEnabled={false}
			showPrintMargin={false}
			setOptions={{ useWorker: false, showFoldWidgets: false }}

			editorProps={{ $blockScrolling: true }}
			debounceChangePeriod={500}

			onChange={onChange}
		/>
	)
}