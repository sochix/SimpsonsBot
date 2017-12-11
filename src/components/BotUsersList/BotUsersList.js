import React, { Component } from 'react'
import { Spinner, Button, NonIdealState } from '@blueprintjs/core'
import BotUserCard from '../BotUserCard'
import EditBotUserDialog from '../EditBotUserDialog'
import { getBotUsers } from '../../backend'

import './BotUsersList.css'

class BotUsersList extends Component {
    state = {
        users: [],
        nextPageUrl: null,
        previousPageUrl: null,
        fetching: true,
        isDialogOpen: false,
        editUserId: null
    }

    startLoading() {
        this.setState({ ...this.state, fetching: true })
    }

    stopLoading() {
        this.setState({ ...this.state, fetching: false })
    }

    loadMore() {
        const { nextPageUrl } = this.state
        this.startLoading()
        getBotUsers(nextPageUrl)
            .then(data => {
                this.setState({ ...this.state, users: [...this.state.users, ...data.result], previousPageUrl: data.previousPageUrl, nextPageUrl: data.nextPageUrl })
                this.stopLoading()
            })
    }

    toggleEditUserDialog(id) {
        this.setState({ ...this.state, isDialogOpen: true, editUserId: id })
    }

    closeEditDialog() {
        this.setState({ ...this.state, isDialogOpen: false })
    }

    updateUser(user) {
        const newUsers = [...this.state.users]
        newUsers.forEach(newUser => {
            if (newUser.id === user.id) {
                newUser.name = user.name
                newUser.avatarUrl = user.avatarUrl
            }
        })
                
        this.setState({...this.state, users: newUsers, isDialogOpen: false})  
    }

    componentDidMount() {
        this.startLoading()
        getBotUsers()
            .then(data => {
                this.setState({ ...this.state, users: data.result, previousPageUrl: data.previousPageUrl, nextPageUrl: data.nextPageUrl })
                this.stopLoading()
            })
    }

    render() {
        const { fetching, users, nextPageUrl, isDialogOpen, editUserId } = this.state

        if (fetching && users.length === 0) {
            return <Spinner className='pt-large' />
        }

        return (
            <div className='botUsersContainer'>
                <div className='botUsersList'>
                    {users.length > 0 && users.map((user, idx) => <BotUserCard key={`user_${idx}`} name={user.name} avatarUrl={user.avatarUrl} onClick={() => this.toggleEditUserDialog(user.id)} />)}
                    {users.length === 0 && <NonIdealState title="Нет пользователей" description="Упс, этого бота не используют..." visual='error' />}
                </div>
                {nextPageUrl && <Button className='pt-intent-primary' loading={users.length > 0 && fetching} onClick={() => this.loadMore()}>Загрузить еще</Button>}
                <EditBotUserDialog 
                    isDialogOpen={isDialogOpen}
                    onCancel={() => this.closeEditDialog()}
                    onSave={(user) => this.updateUser(user)} 
                    userId={editUserId}
                />
            </div>
        )
    }
}

export default BotUsersList
