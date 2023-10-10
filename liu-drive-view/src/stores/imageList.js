import {defineStore} from "pinia";
import {id} from "vuetify/locale";

export const useImageListStore = defineStore('image-list', {
    state: () => ({
        list: [{
            "filename": "屏幕截图 2023-09-04 223821.png",
            "userId": "test_id",
            "type": "abc",
            "accessibility": 2,
            "author": "test_id",
            "scale": 1,
            "dateCreated": "2023-09-15T06:30:32.899013Z",
            "mediaType": "image/png",
            "tags": null
        }, {
            "filename": "屏幕截图(7).png",
            "userId": "test_id",
            "type": "abc",
            "accessibility": 2,
            "author": "test_id",
            "scale": 2,
            "dateCreated": "2023-09-15T06:30:39.902276Z",
            "mediaType": "image/png",
            "tags": null
        }, {
            "filename": "Kamisato_Ayaka.jpg",
            "userId": "test_id",
            "type": "abc",
            "accessibility": 2,
            "author": "test_id",
            "scale": 1,
            "dateCreated": "2023-09-18T22:51:57.442866Z",
            "mediaType": "image/jpeg",
            "tags": null
        }],
        size: 0,
    }),
    getters: {
        getList: function (state) {
            return state.list
        }
    },
    actions: {
        setList(fileList) {
            this.list = fileList;
        }
    }
})