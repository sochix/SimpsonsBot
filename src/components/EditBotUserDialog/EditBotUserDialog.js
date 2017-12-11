import React, { Component } from 'react'
import { Spinner, Button, Dialog, Intent } from '@blueprintjs/core'
import { getBotUser, postBotUser } from '../../backend'

import './EditBotUserDialog.css'

class EditUserForm extends Component {
    state = {
        fetching: true,
        name: '',
        avatarUrl: ''
    }

    componentDidMount() {
        const { userId } = this.props

        this.startLoading()

        getBotUser(userId)
            .then(data => {
                this.setState({ ...this.state, name: data.result.name, avatarUrl: data.result.avatarUrl })
                this.stopLoading()
            })
    }

    startLoading() {
        this.setState({ ...this.state, fetching: true })
    }

    stopLoading() {
        this.setState({ ...this.state, fetching: false })
    }

    onSave() {
        const { userId, onSave } = this.props
        const { name, avatarUrl } = this.state
        this.startLoading()

        postBotUser(userId, name, avatarUrl)
            .then(() => {
                this.stopLoading()
                onSave({
                    id: userId,
                    name: name,
                    avatarUrl: avatarUrl
                })
            })
    }

    onNameChange(value) {
        this.setState({ ...this.state, name: value })
    }

    render() {
        const { onCancel } = this.props
        const { name, avatarUrl, fetching } = this.state

        if (fetching) {
            return (<div className='loading'>
                <Spinner className='pt-large' />
            </div>)
        }

        return (
            <div>
                <div className="pt-dialog-body">
                    <label className="pt-label">
                        Имя
                        <input className="pt-input pt-fill" type="text" placeholder="" dir="auto" value={name} onChange={e => this.onNameChange(e.target.value)} />
                    </label>
                    <label className="pt-label">
                        Путь к аватару
                        <input className="pt-input pt-fill" type="text" placeholder="" dir="auto" readOnly value={avatarUrl} />
                    </label>
                </div>
                <div className="pt-dialog-footer">
                    <div className="pt-dialog-footer-actions">
                        <Button intent={Intent.WARNING} text="Отмена" onClick={onCancel} />
                        <Button
                            intent={Intent.SUCCESS}
                            loading={fetching}
                            onClick={() => this.onSave()}
                            text="Сохранить"
                        />
                    </div>
                </div>
            </div>
        )
    }
}

class EditBotUserDialog extends Component {
    render() {
        const { isDialogOpen, onCancel, onSave, userId } = this.props
        return (
            <div>
                <Dialog
                    iconName="user"
                    isOpen={isDialogOpen}
                    onClose={onCancel}
                    title={`Редактирование пользователя #${userId}`}>
                    <EditUserForm userId={userId} onCancel={onCancel} onSave={onSave} />
                </Dialog>
            </div>)
    }
}

export default EditBotUserDialog