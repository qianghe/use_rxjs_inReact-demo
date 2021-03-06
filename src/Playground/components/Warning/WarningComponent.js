import React, { Component } from 'react'
import style from './index.module.scss'

export class WarningComponent extends Component {
	render() {
		const warning = this.props.warning;
		return (
			<div className={style.WarningComponent} title="Warning">
				⚠️ { warning.toString()}
			</div>
		)
	}
}