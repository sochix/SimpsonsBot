const TEST_USERS = [
    { id: 1, name: 'Homer Simpson', avatarUrl: 'http://www.thegreatnugget.com/sc/01.jpg' },
    { id: 2, name: 'Marge Simpson', avatarUrl: 'http://www.thegreatnugget.com/sc/02.jpg' },
    { id: 3, name: 'Bart Simpson', avatarUrl: 'http://www.thegreatnugget.com/sc/03.jpg' },
    { id: 4, name: 'Lisa Simpson', avatarUrl: 'http://www.thegreatnugget.com/sc/04.jpg' },
    { id: 5, name: 'Maggie Simpson', avatarUrl: 'http://www.thegreatnugget.com/sc/05.jpg' },
    { id: 6, name: 'Abraham Simpson', avatarUrl: 'http://www.thegreatnugget.com/sc/06.jpg' },
    { id: 7, name: 'Ned Flanders', avatarUrl: 'http://www.thegreatnugget.com/sc/09.jpg' },
    { id: 8, name: 'Maud Flanders', avatarUrl: 'http://www.thegreatnugget.com/sc/10.jpg' },
    { id: 9, name: 'Rod Flanders', avatarUrl: 'http://www.thegreatnugget.com/sc/11.jpg' },
    { id: 10, name: 'Todd Flanders', avatarUrl: 'http://www.thegreatnugget.com/sc/12.jpg' },
    { id: 11, name: 'Moe Szyslak', avatarUrl: 'http://www.thegreatnugget.com/sc/13.jpg' },
    { id: 12, name: 'Barney Gumble', avatarUrl: 'http://www.thegreatnugget.com/sc/14.jpg' },
    { id: 13, name: 'Sam', avatarUrl: 'http://www.thegreatnugget.com/sc/170.jpg' },
    { id: 14, name: 'Larry', avatarUrl: 'http://www.thegreatnugget.com/sc/171.jpg' }
]

const COUNT = 4

export const getBotUsers = (startIdx = 0) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve({
            result: TEST_USERS.slice(startIdx, startIdx + COUNT),
            nextPageUrl: startIdx + COUNT > TEST_USERS.length ? null : startIdx + COUNT,
            previousPageUrl: null
        }), 500) //emulate network latency
    })
}

export const getBotUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = TEST_USERS.find(u => u.id === id)
        setTimeout(() => resolve({
            result: user
        }), 500) //emulate network latency
    })
}

export const postBotUser = (id, name, avatarUrl) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), 500) //emulate network latency
    })
}