import { create, DT } from '@ndjinn/core'
import { define, html } from 'hybrids'
import {Node} from './node-base'

const node = create((h, s, l) => [{h, s, l}], [0, 1, 0.5], {
	in: [
		{type: DT.num, name: 'hue'},
		{type: DT.num, name: 'sat'},
		{type: DT.num, name: 'lum'},
	],
	out: [
		{type: DT.rgb, name: 'color'},
	],
})

const NodeHsl = Node(node, {
	name: 'HSL',
	fields: [
		{name: 'hue', mode: 'EDIT'},
		{name: 'sat', mode: 'EDIT'},
		{name: 'lum', mode: 'EDIT'},
	],
	render: ({fields}) => html`<form>
		${fields.map((f) => html`<div class="field">
			<label>${f.name || 'field'}</label>
			<cam-input type="number" value="${f.value}"
				min="0"
				max="${f.name === 'hue' ? 360 : 1}"
				step="${f.name !== 'hue' ? 0.01 : 1}"
				wrap="${f.name === 'hue'}"
				oninput="${(host, e) => host.set({[f.name]: parseFloat(e.detail)})}"
				disabled="${f.mode !== 'EDIT'}"
			></cam-input>
		</div>`)}
	</form>`,
})

define('node-hsl', NodeHsl)
export default NodeHsl