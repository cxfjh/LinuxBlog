import { defineStore } from 'pinia';

export const DataStore = defineStore('', {
    state: () => ({
        appraiseInfo: [{ comments: '', commentstime: '', evaluators: '' }],
        essayInfo: [{ title: '', releasetime: '', author: '', content: '', likes: '0', collection: '0', comments: '0' }],
        judgmentInfo: [{ likes: '0', collection: '0', concern: '0' }],
        userInfo: [{ username: '', fan: 0, concern: 0, beliked: 0 }],
        allEssay: [],
        searchInfo: [],
        keywords: '',
        height: '',
        navHeight: '',
        windowHeight: '',
        fullinformation: '',
        refreshNumber: '',
        automaticNumber: ''
    }),
})