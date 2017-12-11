import React, { Component } from 'react'
import { Card } from '@blueprintjs/core'

import './BotUserCard.css'

class BotUserCard extends Component {
    render() {
        const { name, avatarUrl, onClick } = this.props

        return (<Card interactive={true} elevation={Card.ELEVATION_THREE} className='botUserCard' onClick={onClick}>
            <img src={avatarUrl} alt={name} />
            <h5>{name}</h5>
        </Card>)
    }
}

export default BotUserCard